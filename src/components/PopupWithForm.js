import { Popup } from "./Popup.js";
import {
    closePopup,
    closeCards
} from "../utils/constants.js";

export class PopupWithForm extends Popup {
    constructor({ popupSelector, formSubmitCallback }) {
        super(popupSelector)
        this._formSubmitCallback = formSubmitCallback;
        this._formSubmitHandler = this._formSubmitHandler.bind(this);
    }
    _getInputValues() {
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value
        });
        return this._formValues;
    }
    _formSubmitHandler(evt) {
        evt.preventDefault();
        this._formSubmitCallback(this._getInputValues());
        super.close();
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', this._formSubmitHandler);
        closePopup.addEventListener('click', () => {
            this.close();
        })
        closeCards.addEventListener('click', () => {
            super.close();
            document.getElementById('form').reset()
        })
    }
}