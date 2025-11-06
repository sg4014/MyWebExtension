import { ICancelableEventArgs } from "@docsvision/webclient/System/ICancelableEventArgs";
import { ILayout } from "@docsvision/webclient/System/$Layout";
import { ApplicationBusinessTripLogic } from "../Logic/ApplicationBusinessTripLogic";
import { ILayoutBeforeSavingEventArgs } from "@docsvision/webclient/System/ILayoutParams";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { IDataChangedEventArgs } from "@docsvision/webclient/System/IDataChangedEventArgs";
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import {StaffDirectoryItems} from "@docsvision/webclient/BackOffice/StaffDirectoryItems";
import { DirectoryDesignerRow } from "@docsvision/webclient/BackOffice/DirectoryDesignerRow";
import { NumberControl } from "@docsvision/webclient/Platform/Number";
import { $MessageBox } from "@docsvision/webclient/System/$MessageBox";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";

export async function ddApplicationBusinessTrip_beforeCardSaving(
    layout: ILayout,
    args: ICancelableEventArgs<ILayoutBeforeSavingEventArgs>
) {
    if (!layout) { return; }

    const logic = new ApplicationBusinessTripLogic();
    args.wait();

    return await logic.validateThatNameNotEmpty(layout)
        ? args.accept()
        : args.cancel();
}


export async function ddApplicationBusinessTrip_tripDateChange(
    sender: DateTimePicker,
    args: IDataChangedEventArgs
) {
    if (!sender) { return; }
    const logic = new ApplicationBusinessTripLogic();
    await logic.validateThatTripEndsAfterTripStarts(sender, args);
    await logic.updateDaysInTripOnDatesChanged(sender.layout);
}

export async function ddApplicationBusinessTrip_buttonInfo_click(sender: CustomButton) {
    if (!sender) { return; }
    const logic = new ApplicationBusinessTripLogic();
    await logic.displayCardInfo(sender);
}

export async function ddApplicationBusinessTrip_traveller_onDataChanged(
    sender: StaffDirectoryItems,
    args: IDataChangedEventArgs
) {
    if (!sender) { return; }
    await new ApplicationBusinessTripLogic().fillExecutiveAndPhone(sender.layout, args);
}

export async function ddApplicationBusinessTrip_city_onDataChanged(
    sender: DirectoryDesignerRow,
    args: IDataChangedEventArgs
) {
    if (!sender) { return; }
    await new ApplicationBusinessTripLogic().fillAllowance(sender.layout, args);
}

export async function ddApplicationBusinessTrip_daysInTripCount_onDataChanged(
    sender: NumberControl,
    args: IDataChangedEventArgs
) {
    if (!sender) { return; }
    const logic = new ApplicationBusinessTripLogic();
    await logic.fillAllowanceOnDaysChanged(sender.layout, args);
    await logic.updateTripEndDateOnDaysChanged(sender.layout, args);
}

export async function getAppCount_onClick(sender: CustomButton, args: IEventArgs) {
    const services = sender.layout.getService<$MessageBox>();
    const count = await new ApplicationBusinessTripLogic().getAppCount(sender.layout);
    services.messageBox.showInfo(`Found ${count} applications`);
}