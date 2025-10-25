import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { ILayout } from "@docsvision/webclient/System/$Layout";
import { IDataChangedEventArgs } from "@docsvision/webclient/System/IDataChangedEventArgs";
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { TextArea } from "@docsvision/webclient/Platform/TextArea";


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
        // get layout from sender
        const controls = sender.layout.controls;

        // get data from layout
        const nameControl = controls.tryGet<TextBox>("name");
        const creationDateControl = controls.tryGet<DateTimePicker>("creationDate");
        const tripDateStartControl = controls.tryGet<DateTimePicker>("tripDateStart");
        const tripDateEndControl = controls.tryGet<DateTimePicker>("tripDateEnd");
        const tripReasonControl = controls.tryGet<TextArea>("tripReason");

        // display data
        await MessageBox.ShowInfo(`
Название: ${nameControl?.params?.value ?? ''},
Дата создания: ${creationDateControl?.params?.value ?? ''},
Дата начала командировки: ${tripDateStartControl?.params?.value ?? ''},
Дата конца командировки: ${tripDateEndControl?.params?.value ?? ''},
Основание для поездки: ${tripReasonControl?.params?.value ?? ''}
        `);
    }
}