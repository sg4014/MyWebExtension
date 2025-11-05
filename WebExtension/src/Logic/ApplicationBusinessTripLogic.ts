import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { ILayout } from "@docsvision/webclient/System/$Layout";
import { IDataChangedEventArgs } from "@docsvision/webclient/System/IDataChangedEventArgs";
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { TextArea } from "@docsvision/webclient/Platform/TextArea";
import { DirectoryDesignerRow } from "@docsvision/webclient/BackOffice/DirectoryDesignerRow";
import {StaffDirectoryItems} from "@docsvision/webclient/BackOffice/StaffDirectoryItems";
import {Layout} from "@docsvision/webclient/System/Layout";
import {$BusinessTripAppService} from "../Services/Interfaces/IBusinessTripAppService";
import {$MessageBox} from "@docsvision/webclient/System/$MessageBox";
import { $EmployeeController } from "@docsvision/webclient/Generated/DocsVision.WebClient.Controllers";
import { NumberControl } from "@docsvision/webclient/Platform/Number";


export class ApplicationBusinessTripLogic {

    public async validateThatNameNotEmpty(layout: ILayout): Promise<boolean> {
        const nameControl = layout.controls.tryGet<TextBox>("name");
        if (!nameControl) {
            await MessageBox.ShowError("Элемент управления name отсутствует в разметке!");
            return false;
        }

        const nameControlText = nameControl.params.value;
        if (!nameControlText || nameControlText.trim().length === 0) {

            await MessageBox.ShowWarning('Поле "Название" не заполнено!');
            return false;
        }

        return true;
    }

    public async validateThatTripEndsAfterTripStarts(sender: DateTimePicker, args: IDataChangedEventArgs) {
        const tripDateStartControl = sender.layout.controls.tryGet<DateTimePicker>("tripDateStart");
        if (!tripDateStartControl) {
            await MessageBox.ShowError("Элемент управления tripDateStart отсутствует в разметке!");
            return;
        }

        const tripDateEndControl = sender.layout.controls.tryGet<DateTimePicker>("tripDateEnd");
        if (!tripDateEndControl) {
            await MessageBox.ShowError("Элемент управления tripDateEnd отсутствует в разметке!");
            return;
        }

        if (tripDateEndControl.params.value < tripDateStartControl.params.value) {
            await MessageBox.ShowWarning("Дата начала командировки не может быть позже даты конца командировки!");
            sender.params.value = args.oldValue;
        }
    }

    public async displayCardInfo(sender: CustomButton) {
        const controls = sender.layout.controls;

        const nameControl = controls.tryGet<TextBox>("name");
        const creationDateControl = controls.tryGet<DateTimePicker>("creationDate");
        const tripDateStartControl = controls.tryGet<DateTimePicker>("tripDateStart");
        const tripDateEndControl = controls.tryGet<DateTimePicker>("tripDateEnd");
        const tripReasonControl = controls.tryGet<TextArea>("tripReason");
        const cityControl = controls.tryGet<DirectoryDesignerRow>("city");

        await MessageBox.ShowInfo(`
Название: ${nameControl?.params?.value ?? ''},
Дата создания: ${creationDateControl?.params?.value ?? ''},
Дата начала командировки: ${tripDateStartControl?.params?.value ?? ''},
Дата конца командировки: ${tripDateEndControl?.params?.value ?? ''},
Основание для поездки: ${tripReasonControl?.params?.value ?? ''},
Город: ${cityControl?.params?.value?.name ?? ''}
        `);
    }

    public async fillExecutiveAndPhone(layout: ILayout, args: IDataChangedEventArgs) {

        const travellerModel = await layout.getService($BusinessTripAppService)
            .GetBusinessTripAppTraveller({ travellerId: args.newValue.id });

        if (!travellerModel) {
            console.log("Couldn't extract traveller model");
            console.log(`args: ${args}`);
            return;
        }

        const executiveControl = layout.controls.tryGet<StaffDirectoryItems>("executive");
        const phoneControl = layout.controls.tryGet<TextBox>("phone");

        executiveControl.params.value = await layout.getService($EmployeeController).getEmployee(travellerModel.executiveId);
        phoneControl.params.value = travellerModel.phone;
    }

    public async fillAllowance(layout: ILayout, args: IDataChangedEventArgs) {
        const daysInTripControl = layout.controls.tryGet<NumberControl>("daysInTripCount");
        if (!daysInTripControl) {
            await MessageBox.ShowError("Элемент управления daysInTripControl отсутствует в разметке!");
            return;
        }

        const TotalAllowanceModel = await layout.getService($BusinessTripAppService)
            .GetBusinessTripAppTotalAllowance({
                city: args.newValue.name,
                daysInTrip: daysInTripControl.params.value ?? 0
            });

        const allowanceControl = await layout.controls.tryGet<NumberControl>("allowance");
        allowanceControl.params.value = TotalAllowanceModel.totalAllowance;
    }

    public async fillAllowanceOnDaysChanged(layout: ILayout, args: IDataChangedEventArgs) {
        const cityControl = layout.controls.tryGet<DirectoryDesignerRow>("city");
        const cityName = cityControl?.params?.value?.name;
        if (!cityName) {
            // city is not set yet, so allowance can't be calculated
            return;
        }

        const TotalAllowanceModel = await layout.getService($BusinessTripAppService)
            .GetBusinessTripAppTotalAllowance({
                city: cityName,
                daysInTrip: args.newValue ?? 0
            });

        const allowanceControl = await layout.controls.tryGet<NumberControl>("allowance");
        allowanceControl.params.value = TotalAllowanceModel.totalAllowance;
    }

    public async updateDaysInTripOnDatesChanged(layout: ILayout) {
        const tripDateStartControl = layout.controls.tryGet<DateTimePicker>("tripDateStart");
        const tripDateEndControl = layout.controls.tryGet<DateTimePicker>("tripDateEnd");

        const startDate = new Date(tripDateStartControl.params.value);
        const endDate = new Date(tripDateEndControl.params.value);

        const daysInTripCountControl = layout.controls.tryGet<NumberControl>("daysInTripCount");
        daysInTripCountControl.params.value = this.getDifferenceInDays(startDate, endDate);
    }

    public async updateTripEndDateOnDaysChanged(layout: ILayout, args: IDataChangedEventArgs) {
        const tripDateStartControl = layout.controls.tryGet<DateTimePicker>("tripDateStart");
        if (!tripDateStartControl?.params?.value) {
            MessageBox.ShowWarning("Сначала установите дату начала командировки");
            return;
        }

        const tripDateEndControl = layout.controls.tryGet<DateTimePicker>("tripDateEnd");
        const tripStart: Date = new Date(tripDateStartControl.params.value);

        tripDateEndControl.params.value = new Date(tripStart.setDate(tripStart.getDate() + args.newValue));
    }

    public getDifferenceInDays(date1: Date, date2: Date): number {
        const msInDay = 1000 * 60 * 60 * 24;
        const diffInMs = Math.abs(date2.getTime() - date1.getTime());
        return Math.floor(diffInMs / msInDay);
    }

    public dateToDays(date: Date): number {
        const msInDay = 1000 * 60 * 60 * 24;
        return Math.floor(date.getTime() / msInDay);
    }

    public daysToDate(days: number): Date {
        const msInDay = 1000 * 60 * 60 * 24;
        return new Date(days * msInDay);
    }

}