//создал перепенную для кнопкии откытия формы//
const editButton = document.querySelector('.profile-info__edit-button');
//переменная для модификатора( добавим в функцию, когда будем задавать свойство display)
const popup = document.querySelector('.popup');
// определим переменную для кнопки закрытия
const closePopup = document.querySelector('.popup__close')
const nameInfo = document.querySelector('.profile-info__title');//переменная для имени
const jobInfo = document.querySelector('.profile-info__text');//переменная для работы
const inputName = document.querySelector('#name');//поля формы 
const inputJob = document.querySelector('#job');
// Находим форму в DOM
const formElement = document.querySelector('.popup__container');
// в этой функции popup включает в класс модификатор popup_opened(display:flex)
function openForm() {
    popup.classList.add('popup_opened');
    // Получаем значение полей из свойства value
    inputName.value = nameInfo.textContent;
    inputJob.value = jobInfo.textContent;
}
//ЗАКРЫТИЕ ФОРМЫ_____________________________________________________________
//в этой функции при нажатии на closePopup openPopup лишится атрибута
function closeForm() {
    popup.classList.remove('popup_opened')
}
//СОХРАНЕНИЕ ФОРМЫ__________________________________________________________________
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInfo.textContent = inputName.value;
    jobInfo.textContent = inputJob.value;
    closeForm();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
//в этом событии после клика на элемент editButton начнет действовать ф-я openForm и попап откроется
editButton.addEventListener('click', openForm);
//при клике на элемент активируется функция которая удалает атрибут у openPopup
closePopup.addEventListener('click', closeForm);


