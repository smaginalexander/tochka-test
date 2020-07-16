"use strict";
import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidator.js";
import { photoPopup } from "./utils.js"
const profilePopup = document.querySelector('.profilePopup');
const addCardPopup = document.querySelector('.addCardPopup');
const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_invalid',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
}
const profileValid = new FormValidator(validationConfig, profilePopup);
const addFormValid = new FormValidator(validationConfig, addCardPopup);
const editButton = document.querySelector('.profile-info__edit-button');
const closePopup = document.querySelector('.popup__close')
const nameInfo = document.querySelector('.profile-info__title');
const jobInfo = document.querySelector('.profile-info__text');
const inputName = document.querySelector('#name');
const inputJob = document.querySelector('#job');
// Находим форму в DOM  
const inputNameCard = document.querySelector('#name-card');// нашли поля инпутов
const inputLinkCard = document.querySelector('#link-card');
const formElement = document.querySelector('.popup__container');
const closePhoto = document.querySelector('#close-photo');
const elementBlock = document.querySelector('.elements');
//сделаем новую переменную для кнопки закрытия второго попапа  
const closeCards = document.querySelector('#close');
// добавление второго попапа  
const addButton = document.querySelector('.profile__add-button');
//переменные для содержимого инпутов  
const formCard = document.querySelector('#form');
//открытие попапа
function openWindow(popupWindow) {
    popupWindow.classList.add('popup_opened')
    document.addEventListener('keydown', pushEsc);
}
// добавление карточки в разметку
function addCard(card, container) {
    container.prepend(card);
}
//добавление изначальных карточек в разметку
initialCards.forEach(item => {
    const card = new Card(item.link, item.name, '#card');
    const cardElement = card.generateCard()
    addCard(cardElement, elementBlock);
})
//значения не сохраненных инпутов при открытии
function setInputValues() {
    inputName.value = nameInfo.textContent;
    inputJob.value = jobInfo.textContent;
}
//сброс значений ипутов у формы добавления карточки
function resetForm() {
    formCard.reset();
}
//закрытие формы 
function closeWindow(popupWindow) {
    popupWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', pushEsc);
}
//нажатие на клавишу
function pushEsc(evt) {
    if (evt.key === 'Escape') {
        const windowOpen = document.querySelector('.popup_opened')
        closeWindow(windowOpen);
    };
}
//добавление карточки
function submitCard(event) {
    event.preventDefault();
    const card = new Card(inputLinkCard.value, inputNameCard.value, '#card');
    const cardElement = card.generateCard()
    addCard(cardElement, elementBlock);
    closeWindow(addCardPopup);
}
//сохранение формы  
function submitUserInfo(event) {
    event.preventDefault();
    nameInfo.textContent = inputName.value;
    jobInfo.textContent = inputJob.value;
    closeWindow(profilePopup);
}
//закрытие профиля на клик по оверлею 
function closeOnOverlayClick(item) {
    if (item.target.classList.contains('popup')) {
        const openWindow = document.querySelector('.popup_opened');
        closeWindow(openWindow)
    }
}
//валидация форм
profileValid.enableValidation();
addFormValid.enableValidation();

formCard.addEventListener('submit', submitCard);
formElement.addEventListener('submit', submitUserInfo);
editButton.addEventListener('click', () => {
    setInputValues();//в инпутах формы всегда текст с профиля
    profileValid.resetAllInputError();
    openWindow(profilePopup);
});
closePopup.addEventListener('mousedown', () => { closeWindow(profilePopup); });
//кнопка открытия формы добавления фотки
addButton.addEventListener('click', () => {
    resetForm()
    addFormValid.resetAllInputError();
    openWindow(addCardPopup);
});
closeCards.addEventListener('mousedown', () => { closeWindow(addCardPopup); });
closePhoto.addEventListener('mousedown', () => { closeWindow(photoPopup); });//зыкрыть фотку
//закрытие профиля
profilePopup.addEventListener('mousedown', closeOnOverlayClick);
//закрытие нового места
addCardPopup.addEventListener('mousedown', closeOnOverlayClick);
//закрытие попапа с фоткой
photoPopup.addEventListener('mousedown', closeOnOverlayClick);
