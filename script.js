//создал перепенную для кнопкии откытия формы//
let editButton = document.querySelector('.profile-info__edit-button');
console.log(editButton);
//переменная для модификатора( добавим в функцию, когда будем задавать свойство display)
let openPopup = document.querySelector('.popup_opened');
console.log(openPopup);
// в этой функции элемент приобретает свойство display: none
function openForm() {
    openPopup.setAttribute('style', 'display:flex')
}
//в этом событии после клика на элемент editButton начнет действовать ф-я openForm и попап откроется
editButton.addEventListener('click', openForm);

//ЗАКРЫТИЕ ФОРМЫ_____________________________________________________________
// определим переменную для кнопки закрытия
let closePopup = document.querySelector('.popup__close')
console.log(closePopup);
//в этой функции при нажатии на closePopup openPopup лишится атрибута
function closeForm() {
    openPopup.removeAttribute('style')
}
//при клике на элемент активируется функция которая удалает атрибут у openPopup
closePopup.addEventListener('click', closeForm);
//ЗАПОЛНЕНИЕ ФОРМЫ_________________________________________________________________
let nameInfo = document.querySelector('.profile-info__title');//переменная для имени
let jobInfo = document.querySelector('.profile-info__text');//переменная для работы

// Находим поля формы в DOM
let inputName = document.querySelector('#name');
let inputJob = document.querySelector('#job');

// Получаем значение полей из свойства value
inputName.value = nameInfo.textContent;
inputJob.value = jobInfo.textContent;
//СОХРАНЕНИЕ ФОРМЫ__________________________________________________________________
// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInfo.textContent = inputName.value;
    jobInfo.textContent = inputJob.value;
    closeForm();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
//переменная для кнопки "сохранить"
let saveForm = document.querySelector('.popup__btn');
// при клике информация в форме сохраниться
saveForm.addEventListener('click', formSubmitHandler);

