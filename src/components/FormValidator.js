export class FormValidator {
    constructor(options, formElement) {
        this._formSelector = options.formSelector;
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inactiveButtonClass = options.inactiveButtonClass;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;
        this._formElement = formElement;
        this._form = this._formElement.querySelector(this._formSelector);
    }
    //устоновка ошибок 
    _setInputError(inputElement) {//передаю параметром инпут  
        inputElement.classList.add(this._inputErrorClass);
        const errorText = this._form.querySelector(`#${inputElement.id}-error`);
        errorText.textContent = inputElement.validationMessage;
    }
    //сброс ошибок для отдельного инпута 
    _resetInputError(inputElement) {
        inputElement.classList.remove(this._inputErrorClass);
        const errorText = this._form.querySelector(`#${inputElement.id}-error`);
        errorText.textContent = '';
    }
    //сброс ошибок для всех инпутов 
    resetAllInputError() {
        const input = this._form.querySelectorAll(this._inputSelector);
        input.forEach((element) => {
            this._resetInputError(element);
            this._setButtonState();
        })
    }
    //включение и выключение кнопки 
    _setButtonState() {
        const submitButton = this._form.querySelector(this._submitButtonSelector);
        if (this._form.checkValidity()) {
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
        const inputList = this._form.querySelectorAll(this._inputSelector);
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