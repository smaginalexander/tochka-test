"use strict";
const editButton = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const photoPopup = document.querySelector('.photo-popup');
const newForm = document.querySelector('#new-card');
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
const imagePopup = document.querySelector('.photo-popup__img')
const imageText = document.querySelector('.photo-popup__text')
const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_invalid',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
}
//открытие попапа
function openWindow(popupWindow) {
    popupWindow.classList.add('popup_opened')
    document.addEventListener('keydown', pushEsc);
}
//функция открытие попапа с фоткой
function openPhotoPopup(event) {
    const cardContainer = event.target.closest('.element');
    const zoomPhoto = cardContainer.querySelector('.element__image');
    const zoomText = cardContainer.querySelector('.element__text');
    imagePopup.src = zoomPhoto.src;
    imagePopup.alt = zoomText.alt;
    imageText.textContent = zoomText.textContent;
    openWindow(photoPopup);
}
//загружаем карточки на страницу  
function createCard(link, name) {
    const cardClone = cardTemplate.cloneNode(true);
    const image = cardClone.querySelector('.element__image')
    const cardName = cardClone.querySelector('.element__text')
    const like = cardClone.querySelector('.element__btn');//находим кнопку лайк  
    const trash = cardClone.querySelector('.element__trash');//кнопка удаления карточки 
    const card = cardClone.querySelector('.element');
    cardName.textContent = name;
    image.src = link;
    image.alt = name;
    like.addEventListener('click', function (event) {
        event.target.closest('.element__btn').classList.toggle('element__btn_active');
    });
    trash.addEventListener('click', function (event) {
        event.target.closest('.element').remove();
    });
    image.addEventListener('click', openPhotoPopup);
    return card
}
// добавление карточки в разметку
function addCard(card, container) {
    container.prepend(card);
}
//добавление изначальных карточек в разметку
function render() {
    initialCards.forEach(item => {
        const cards = createCard(item.link, item.name);
        addCard(cards, elementBlock);
    });
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
enableValidation(validationConfig);
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
    const newCard = createCard(inputLinkCard.value, inputNameCard.value)
    addCard(newCard, elementBlock)
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
//кнопка открытия формы профиля
editButton.addEventListener('click', () => {
    setInputValues();//в инпутах формы всегда текст с профиля
    resetFormState(validationConfig, popup)//при открытии проходит валидация
    openWindow(popup);
});
closePopup.addEventListener('click', () => { closeWindow(popup); });
//кнопка открытия формы добавления фотки
addButton.addEventListener('click', () => {
    resetForm()//форма сбрасывает значения
    resetFormState(validationConfig, newForm)//при открытии проходит валидация
    openWindow(newForm);
});
closeCards.addEventListener('click', () => { closeWindow(newForm); });
closePhoto.addEventListener('click', () => { closeWindow(photoPopup); });//зыкрыть фотку
//закрытие профиля
popup.addEventListener('click', closeOnOverlayClick);
//закрытие нового места
newForm.addEventListener('click', closeOnOverlayClick);
//закрытие попапа с фоткой
photoPopup.addEventListener('click', closeOnOverlayClick);
