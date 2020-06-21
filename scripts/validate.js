
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
            input.addEventListener('input', e => handleInput(formElement, e.target, options.inputErrorClass))// добавил в аргументы форму
            input.addEventListener('input', () => setButtonState(formElement, submitButton, options.inactiveButtonClass))
        })
    })
}
//включение и выключение кнопки
function setButtonState(formElement, submitButton, inactiveButtonClass) {
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(inactiveButtonClass, hasErrors);

}
//ошибки в инпутах
function handleInput(formElement, e, errorClass) {
    const input = e;
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
    formElements.forEach(formElement => {
        if (formElement.checkValidity()) {
            //нашли инпуты и  кнопку
            const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
            const submitButton = formElement.querySelector('.popup__btn');
            //применяем функции валидности/не валидности инпутов и кнопок
            inputElements.forEach(e => {
                handleInput(formElement, e, options.inputErrorClass);
                setButtonState(formElement, submitButton, options.inactiveButtonClass);
            })
        }
    })
}


