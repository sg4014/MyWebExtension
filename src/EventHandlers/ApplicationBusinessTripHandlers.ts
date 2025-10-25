import { ICancelableEventArgs } from "@docsvision/webclient/System/ICancelableEventArgs";
import { ILayout } from "@docsvision/webclient/System/$Layout";
import { ApplicationBusinessTripLogic } from "../Logic/ApplicationBusinessTripLogic";
import { ILayoutBeforeSavingEventArgs } from "@docsvision/webclient/System/ILayoutParams";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { IDataChangedEventArgsEx } from "@docsvision/webclient/System/IDataChangedEventArgs";
import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { IDataChangedEventArgs } from "@docsvision/webclient/System/IDataChangedEventArgs";

/**
 * Событие во время сохранения карточки
 * @param layout разметка
 * @param args аргументы события
 */
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