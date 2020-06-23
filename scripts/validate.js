//ошибки в инпутах
function handleInput(formElement, event, errorClass) {
    const input = event;
    const errorText = formElement.querySelector(`#${input.id}-error`);
    if (input.checkValidity()) {
        input.classList.remove(errorClass);
        errorText.textContent = '';
    } else {
        input.classList.add(errorClass);
        errorText.textContent = input.validationMessage;
    }
}
//включение и выключение кнопки
function setButtonState(formElement, submitButton, inactiveButtonClass) {
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(inactiveButtonClass, hasErrors);
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
            input.addEventListener('input', event => handleInput(formElement, event.target, options.inputErrorClass))// добавил в аргументы форму
            input.addEventListener('input', () => setButtonState(formElement, submitButton, options.inactiveButtonClass))
        })
    })
}
// функция сброса ошибок для формы добавления карточки
function resetInputError(formElement, item, errorClass) {//бросс ошибки инпутов
    const errorText = formElement.querySelector(`#${item.id}-error`);
    item.classList.remove(errorClass);
    errorText.textContent = '';
}
function resetFormState(options, form) {
    const inputElements = Array.from(form.querySelectorAll(options.inputSelector));
    const submitButton = form.querySelector('.popup__btn');
    const formElement = form.querySelector(options.formSelector)
    //применяем функции валидности/не валидности инпутов и кнопок
    inputElements.forEach(item => {
        setButtonState(formElement, submitButton, options.inactiveButtonClass);
        resetInputError(formElement, item, options.inputErrorClass)
    })
}