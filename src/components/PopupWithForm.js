import { Popup } from "./Popup.js";
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
    _close() {
        super.close();
        document.getElementById('form').reset()
    }
    _formSubmitHandler(evt) {
        evt.preventDefault();
        this._formSubmitCallback(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', this._formSubmitHandler);
        this._popupSelector.addEventListener('submit', () => {
            this._close()
        });
        this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
            this._close()
        });
    }
}