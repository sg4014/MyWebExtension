import { ICancelableEventArgs } from "@docsvision/webclient/System/ICancelableEventArgs";
import { ILayout } from "@docsvision/webclient/System/$Layout";
import { ApplicationBusinessTripLogic } from "../Logic/ApplicationBusinessTripLogic";
import { ILayoutBeforeSavingEventArgs } from "@docsvision/webclient/System/ILayoutParams";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { IDataChangedEventArgs } from "@docsvision/webclient/System/IDataChangedEventArgs";
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import {StaffDirectoryItems} from "@docsvision/webclient/BackOffice/StaffDirectoryItems";

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
}

export async function ddApplicationBusinessTrip_buttonInfo_click(sender: CustomButton) {
    if (!sender) { return; }
    const logic = new ApplicationBusinessTripLogic();
    await logic.displayCardInfo(sender);
}

export async function ddApplicationBusinessTrip_StaffDirectoryItems_onDataChanged(sender: StaffDirectoryItems) {
    const logic = new ApplicationBusinessTripLogic();
    await logic.FillExecutiveAndPhone(sender.layout);
}