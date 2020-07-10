"use strict";
import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js";
const popup = document.querySelector('.popup');
const newForm = document.querySelector('#new-card');
const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_invalid',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
}
const profileValid = new FormValidator(validationConfig, popup)
const addFormValid = new FormValidator(validationConfig, newForm)
const editButton = document.querySelector('.profile-info__edit-button');

export const photoPopup = document.querySelector('.photo-popup');

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
//загрузка карточек на страницу  
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const cardTemplate = document.querySelector('#card').content;
const elementBlock = document.querySelector('.elements');
//сделаем новую переменную для кнопки закрытия второго попапа  
const closeCards = document.querySelector('#close');
// добавление второго попапа  
const addButton = document.querySelector('.profile__add-button');
//переменные для содержимого инпутов  
const formCard = document.querySelector('#form');
export const imagePopup = document.querySelector('.photo-popup__img')
export const imageText = document.querySelector('.photo-popup__text')

//открытие попапа
function openWindow(popupWindiw) {
    popupWindiw.classList.add('popup_opened')
    document.addEventListener('keydown', pushEsc);
}
// добавление карточки в разметку
function addCard(card, container) {
    container.prepend(card);
}
//добавление изначальных карточек в разметку
function render() {
    initialCards.forEach(item => {
        const card = new Card(item.link, item.name);
        const cardElement = card.generateCard()
        addCard(cardElement, elementBlock);
    })
}
render()
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
function closeWindow(popupWindiw) {
    popupWindiw.classList.remove('popup_opened');
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
    const card = new Card(inputLinkCard.value, inputNameCard.value);
    const cardElement = card.generateCard()
    addCard(cardElement, elementBlock);
    closeWindow(newForm);
}
//сохранение формы  
function submitUserInfo(event) {
    event.preventDefault();
    nameInfo.textContent = inputName.value;
    jobInfo.textContent = inputJob.value;
    closeWindow(popup);
}
//закрытие профиля на клик по оверлею 
function closeOnOverlayClick(item) {
    if (item.target.classList.contains('popup')) {
        const openWindow = document.querySelector('.popup_opened');
        closeWindow(openWindow)
    }
}
formCard.addEventListener('submit', submitCard);
formElement.addEventListener('submit', submitUserInfo);
editButton.addEventListener('click', () => {
    setInputValues();//в инпутах формы всегда текст с профиля
    profileValid.enableValidation(popup);
    profileValid.resetAllInputError();
    openWindow(popup);
});
closePopup.addEventListener('mousedown', () => { closeWindow(popup); });
//кнопка открытия формы добавления фотки
addButton.addEventListener('click', () => {
    resetForm()
    addFormValid.enableValidation();
    addFormValid.resetAllInputError();
    openWindow(newForm);
});
closeCards.addEventListener('mousedown', () => { closeWindow(newForm); });
closePhoto.addEventListener('mousedown', () => { closeWindow(photoPopup); });//зыкрыть фотку
//закрытие профиля
popup.addEventListener('mousedown', closeOnOverlayClick);
//закрытие нового места
newForm.addEventListener('mousedown', closeOnOverlayClick);
//закрытие попапа с фоткой
photoPopup.addEventListener('mousedown', closeOnOverlayClick);
