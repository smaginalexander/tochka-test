"use strict";
import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
    photoPopup,
    validationConfig,
    profilePopup,
    addCardPopup,
    editButton,
    addButton,
    initialCards,
    inputName,
    inputJob
} from "../utils/constants.js";
const profileValid = new FormValidator(validationConfig, profilePopup);
const addFormValid = new FormValidator(validationConfig, addCardPopup);
const popupWithPhoto = new PopupWithImage(photoPopup);
//загрузка изначальных карточек
const cards = new Section({
    items: initialCards,
    renderer: item => {
        const card = new Card(
            item.link,
            item.name,
            '#card',
            () => popupWithPhoto.open(item.link, item.name));
        popupWithPhoto.setEventListeners()
        const cardElement = card.generateCard();
        cards.addItem(cardElement);
    }
}, '.elements');

//попап редактирования профиля
const userInfo = new UserInfo({
    name: '.profile-info__title',
    info: '.profile-info__text',
});
const userInfoPopup = new PopupWithForm({
    popupSelector: profilePopup,
    formSubmitCallback: (data) => {
        userInfo.setUserInfo(data.userName, data.userJob);
    }
});
//попап добавления карточки
const newCardPopup = new PopupWithForm({
    popupSelector: addCardPopup,
    formSubmitCallback: (data) => {
        const card = new Card(
            data.cardLink,
            data.cardName,
            '#card',
            () => popupWithPhoto.open(data.link, data.name));
        popupWithPhoto.setEventListeners()
        const cardElement = card.generateCard();
        cards.addItem(cardElement);
    }
})
//валидация форм
profileValid.enableValidation();
addFormValid.enableValidation();
//кнопка открытия формы добавления фотки
addButton.addEventListener('click', () => {
    addFormValid.resetAllInputError();
    newCardPopup.open();
    newCardPopup.setEventListeners();
});
//кнопка открытия редадактирования профиля
editButton.addEventListener('click', () => {
    profileValid.resetAllInputError();
    userInfoPopup.open();
    userInfoPopup.setEventListeners();
    //текст в инпуте редактирования профиля
    const profileInfo = userInfo.getUserInfo()
    inputName.value = profileInfo.name
    inputJob.value = profileInfo.info
});
popupWithPhoto.setEventListeners()
userInfoPopup.setEventListeners()
newCardPopup.setEventListeners();
cards.renderElements();
