import { Popup } from "./Popup.js";
import { imagePopup, imageText } from "../utils/constants.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(link, name) {
        imagePopup.src = link;
        imageText.textContent = name;
        super.open();
    }
}