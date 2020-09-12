export class FormValidator {
    constructor(options, formElement) {
        this._formSelector = options.formSelector;
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inactiveButtonClass = options.inactiveButtonClass;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;
        this._formElement = formElement;
    }
    //устоновка ошибок
    _setInputError(inputElement) {//передаю параметром инпут 
        const form = this._formElement.querySelector(this._formSelector);
        inputElement.classList.add(this._inputErrorClass);
        const errorText = form.querySelector(`#${inputElement.id}-error`);
        errorText.textContent = inputElement.validationMessage;
    }
    //сброс ошибок для отдельного инпута
    _resetInputError(inputElement) {
        const form = this._formElement.querySelector(this._formSelector);
        inputElement.classList.remove(this._inputErrorClass);
        const errorText = form.querySelector(`#${inputElement.id}-error`);
        errorText.textContent = '';
    }
    //сброс ошибок для всех инпутов
    resetAllInputError() {
        const form = this._formElement.querySelector(this._formSelector);
        const input = form.querySelectorAll(this._inputSelector);
        input.forEach((element) => {
            this._resetInputError(element);
            this._setButtonState();
        })
    }
    //включение и выключение кнопки
    _setButtonState() {
        const form = this._formElement.querySelector(this._formSelector);
        const submitButton = form.querySelector(this._submitButtonSelector);
        if (form.checkValidity()) {
            submitButton.removeAttribute("disabled");
            submitButton.classList.remove(this._inactiveButtonClass);
        } else {
            submitButton.setAttribute("disabled", true);
            submitButton.classList.add(this._inactiveButtonClass);
        }
    }
    _handleInput(inputElement) {
        if (inputElement.checkValidity()) {
            this._resetInputError(inputElement);
        } else {
            this._setInputError(inputElement);
        }
    }
    //слушатели событий
    _setEventListeners() {
        const form = this._formElement.querySelector(this._formSelector);
        const inputList = form.querySelectorAll(this._inputSelector);
        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._handleInput(input);
                this._setButtonState();
            });
        });
    }
    enableValidation() {
        this._setEventListeners();
    }
}
