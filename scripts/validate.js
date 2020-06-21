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
// функция сброса ошибок для формы добавления карточки
function handleInputFormCard(formElement, e, errorClass) {//бросс ошибки инпутов
    formElement = formElement.querySelector(`#${e.id}-error`);
    e.classList.remove(errorClass);
    formElement.textContent = '';
}
//проверка валидности при открытии формы(добавлена в функцию openForm в файле script.js)
function openValid(options) {
    const formElements = Array.from(document.querySelectorAll(options.formSelector));
    formElements.forEach(formElement => {
        const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
        const submitButton = formElement.querySelector('.popup__btn');
        //применяем функции валидности/не валидности инпутов и кнопок
        inputElements.forEach(e => {
            setButtonState(formElement, submitButton, options.inactiveButtonClass);
            handleInputFormCard(formElement, e, options.inputErrorClass)
        })
    })
}
