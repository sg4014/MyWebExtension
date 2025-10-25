import { ICancelableEventArgs } from "@docsvision/webclient/System/ICancelableEventArgs";
import { ICardSavingEventArgs } from "@docsvision/webclient/System/ICardSavingEventArgs";
import { ILayout } from "@docsvision/webclient/System/$Layout";
import { ApplicationBusinessTripLogic } from "../Logic/ApplicationBusinessTripLogic";
import { ILayoutBeforeSavingEventArgs } from "@docsvision/webclient/System/ILayoutParams";

// TODO: rename ddApplicationBusinessTrip_name_cardSaving to ddApplicationBusinessTrip_cardSaving
// (since the contrl is not name, but layout)

/**
 * Событие во время сохранения карточки
 * @param layout разметка
 * @param args аргументы события
 */
export async function ddApplicationBusinessTrip_name_cardSaving(
    layout: ILayout,
    args: ICancelableEventArgs<ICardSavingEventArgs>
) {
    if (!layout) { return; }

    const logic = new ApplicationBusinessTripLogic();
    args.wait();

    if (!await logic.validateThatNameNotEmpty(layout)) {
        args.cancel();
        return;
    } 

    args.accept();

    // return await logic.validateThatNameNotEmpty(layout)
    //     ? args.accept()
    //     : args.cancel();
}