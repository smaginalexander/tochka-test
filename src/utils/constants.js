export const photoPopup = document.querySelector('.photo-popup');
export const imagePopup = document.querySelector('.photo-popup__img');
export const imageText = document.querySelector('.photo-popup__text');
export const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_invalid',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
}
export const initialCards = [
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
//закрытие формы 
export function closeWindow(popupWindow) {
    popupWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', pushEsc);
}
//нажатие на клавишу
export function pushEsc(evt) {
    if (evt.key === 'Escape') {
        const windowOpen = document.querySelector('.popup_opened');
        closeWindow(windowOpen);
    };
}
export const closePhoto = document.querySelector('#close-photo');
export const profilePopup = document.querySelector('.profilePopup');
export const addCardPopup = document.querySelector('.addCardPopup');
export const editButton = document.querySelector('.profile-info__edit-button');
export const closePopup = document.querySelector('.popup__close');
export const elementBlock = document.querySelector('.elements');
//сделаем новую переменную для кнопки закрытия второго попапа  
export const closeCards = document.querySelector('#close');
// добавление второго попапа  
export const addButton = document.querySelector('.profile__add-button');
//переменные для содержимого инпутов  
export const formCard = document.querySelector('#form');
// добавление карточки в разметку
export function addCard(card, container) {
    container.prepend(card);
}
export const nameInfo = document.querySelector('.profile-info__title');
export const jobInfo = document.querySelector('.profile-info__text');
export const inputName = document.querySelector('#name');
export const inputJob = document.querySelector('#job');
