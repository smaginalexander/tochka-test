const obj = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_invalid',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
}
enableValidation(obj);
function enableValidation(options) {
    formElement.addEventListener('submit', evt => {
        evt.preventDefault()
    })
    //нашли форму
    const formElements = Array.from(document.querySelectorAll(options.formSelector));
    formElements.forEach(formElement => {
        //нашли инпуты и  кнопку
        const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
        const submitButton = formElement.querySelector('.popup__btn');
        //проверим валидность в каждом инпуте
        inputElements.forEach(input => {
            input.addEventListener('input', e => handleInput(e, options.inputErrorClass))
        })

        formElement.addEventListener('input', () => handleFormInput(formElement, submitButton, options.inactiveButtonClass))

    })
}
//включение и выключение кнопки
function handleFormInput(formElement, submitButton, inactiveButtonClass) {
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(inactiveButtonClass, hasErrors);

}
//ошибки в инпутах
function handleInput(evt, ercls) {
    const input = evt.target;
    const isInputValid = input.checkValidity();
    const error = document.querySelector(`#${input.id}-error`);
    if (input.checkValidity()) {
        input.classList.remove(ercls);
        error.textContent = '';
    } else {
        input.classList.add(ercls);
        error.textContent = input.validationMessage;
    }
}

