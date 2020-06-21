const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_invalid',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
}

function enableValidation(options) {
    //нашли форму
    const formElements = Array.from(document.querySelectorAll(options.formSelector));
    formElements.forEach(formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault()
        })
        //нашли инпуты и  кнопку
        const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
        const submitButton = formElement.querySelector('.popup__btn');
        //проверим валидность в каждом инпуте
        inputElements.forEach(input => {
            input.addEventListener('input', e => handleInput(formElement, e, options.inputErrorClass))// добавил в аргументы форму
            input.addEventListener('input', () => setButtonState(formElement, submitButton, options.inactiveButtonClass))
        })
    })
}
// enableValidation(validationConfig);
//включение и выключение кнопки
function setButtonState(formElement, submitButton, inactiveButtonClass) {
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(inactiveButtonClass, hasErrors);

}
//ошибки в инпутах
function handleInput(formElement, item, errorClass) {
    const input = item.target;
    const isInputValid = input.checkValidity();
    formElement = formElement.querySelector(`#${input.id}-error`);
    if (input.checkValidity()) {
        input.classList.remove(errorClass);
        formElement.textContent = '';
    } else {
        input.classList.add(errorClass);
        formElement.textContent = input.validationMessage;
    }
}
function openValid(options) {
    const formElements = Array.from(document.querySelectorAll(options.formSelector));
    formElements.forEach(() => {
        //нашли инпуты и  кнопку
        const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
        const submitButton = formElement.querySelector('.popup__btn');
        //применяем функции валидности/не валидности инпутов и кнопок
        inputElements.forEach(() => {
            handleInput(formElement, e, options.inputErrorClass);
            setButtonState(formElement, submitButton, options.inactiveButtonClass);
        })
    })
}