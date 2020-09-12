import { closePhoto } from "../utils/constants.js";
export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popupSelector.classList.add('popup_opened');
    }
    close() {
        this._popupSelector.classList.remove('popup_opened');
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }
    setEventListeners() {
        closePhoto.addEventListener('mousedown', () => {
            this.close();
        });
        //нажатие на клавишу еск
        document.addEventListener('keydown', this._handleEscClose)
        //клик на оверлей
        document.addEventListener('click', evt => {
            if (evt.target.classList.contains('popup')) this.close();
        });

    }
}
