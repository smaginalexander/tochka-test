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
//Открытие фотографий_______________  
const photo = document.querySelector('.photo-popup__img');
const photoText = document.querySelector('.photo-popup__text');
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

const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_invalid',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
}

inputName.value = nameInfo.textContent;
inputJob.value = jobInfo.textContent;
//загружаем карточки на страницу  
function renderTemplateItem(link, name) {
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
    trash.addEventListener('click', function (itm) {
        itm.target.closest('.element').remove();
    });
    image.addEventListener('click', openPhotoPopup);
    return card
}
//добавление изначальных карточек в разметку
function render() {
    initialCards.forEach(item => {
        const cards = renderTemplateItem(item.link, item.name);
        addCard(cards, elementBlock);
    });
}
render()
//функция открытие попапа с фоткой
const imagePopup = document.querySelector('.photo-popup__img')
const imageText = document.querySelector('.photo-popup__text')
function openPhotoPopup(card) {
    const cardContainer = card.target.closest('.element'),
        photo = cardContainer.querySelector('.element__image'),
        text = cardContainer.querySelector('.element__text');
    imagePopup.src = photo.src;
    imagePopup.alt = text.alt;
    imageText.textContent = text.textContent;
    openForm(photoPopup);
}
//значения не сохраненных инпутов при открытии
function trueInfo() {
    inputName.value = nameInfo.textContent;
    inputJob.value = jobInfo.textContent;
}
//сброс значений ипутов у формы добавления карточки
function reset(form) {
    form.reset();
}
enableValidation(validationConfig);
function openForm(popupWindow) {
    popupWindow.classList.add('popup_opened')
    document.addEventListener('keydown', pushEsc);
    trueInfo()
    reset(formCard)
    openValid(validationConfig)
}
//закрытие формы 
function closeForm(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', pushEsc);
}
//нажатие на клавишу
function pushEsc(evt) {
    const windowOpen = document.querySelector('.popup_opened')
    if (evt.keyCode === 27) {
        closeForm(windowOpen);
    };
}
// добавление карточки в разметку
function addCard(card, container) {
    container.prepend(card);
}
//добавление карточки
function formSubmitCard(evt) {
    evt.preventDefault();
    newCard = renderTemplateItem(inputLinkCard.value, inputNameCard.value)
    addCard(newCard, elementBlock)
    closeForm(newForm);
}
//сохранение формы  
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInfo.textContent = inputName.value;
    jobInfo.textContent = inputJob.value;
    closeForm(popup);
}
//закрытие профиля на клик по оверлею 
function clickOver(item) {
    if (item.target.classList.contains('popup')) {
        const openWindow = document.querySelector('.popup_opened');
        closeForm(openWindow)
    }
}
formCard.addEventListener('submit', formSubmitCard);
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', () => { openForm(popup); });//кнопка открытия формы профиля
closePopup.addEventListener('click', () => { closeForm(popup); });
addButton.addEventListener('click', () => { openForm(newForm); });//кнопка открытия формы добавления фотки
closeCards.addEventListener('click', () => { closeForm(newForm); });
closePhoto.addEventListener('click', () => { closeForm(photoPopup); });//зыкрыть фотку
//закрытие профиля
popup.addEventListener('click', clickOver);
//закрытие нового места
newForm.addEventListener('click', clickOver);
//закрытие попапа с фоткой
photoPopup.addEventListener('click', clickOver);
