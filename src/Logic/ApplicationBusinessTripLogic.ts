import { ILayout } from "@docsvision/webclient/System/$Layout";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
// import { $MessageBox } from "@docsvision/webclient/System/$MessageBox";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";

export class ApplicationBusinessTripLogic {

    public async validateThatNameNotEmpty(layout: ILayout): Promise<boolean> {
        const nameControl = layout.controls.tryGet<TextBox>("name");
        if (!nameControl) {
            await MessageBox.ShowError("Элемент управления name отсутствует в разметке!");
            return false;
        }

        const nameControlText = nameControl.params.value;
        if (!nameControlText || nameControlText.trim().length === 0) {
            MessageBox.ShowWarning('Поле "Название" не заполнено!');
            return false;
        }

        return true;
    }
}