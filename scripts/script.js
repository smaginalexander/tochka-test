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
//поля формы 
const inputNameCard = document.querySelector('#name-card');
const inputLinkCard = document.querySelector('#link-card');
//переменные для содержимого инпутов 
const formCard = document.querySelector('#form');
inputName.value = nameInfo.textContent;
inputJob.value = jobInfo.textContent;

//появление и скрытие модального окна
function popupToggle(popupWindow) {
    popupWindow.classList.toggle('popup_opened');
}
//загружаем карточки на страницу 
function renderTemplateItem(item) {
    const cardClone = cardTemplate.cloneNode(true);
    cardClone.querySelector('.element__image').src = item.link;
    cardClone.querySelector('.element__image').alt = item.name;
    cardClone.querySelector('.element__text').textContent = item.name;
    const like = cardClone.querySelector('.element__btn');//находим кнопку лайк 
    const trash = cardClone.querySelector('.element__trash');//кнопка удаления карточки
    const photoImg = cardClone.querySelector('.element__image');//найдем фото
    photo.src = item.link;
    photoText.textContent = item.name;
    photo.alt = item.name;
    console.log(photo)
    like.addEventListener('click', function (event) {
        event.target.closest('.element__btn').classList.toggle('element__btn_active');
    });
    trash.addEventListener('click', function (itm) {
        itm.target.closest('.element').remove();
    });
    photoImg.addEventListener('click', () => { popupToggle(photoPopup); });
    elementBlock.prepend(cardClone);
}

function render() {
    initialCards.forEach(renderTemplateItem);
}

render();

function formSubmitCard(evt) {
    evt.preventDefault();
    const cardName = inputNameCard.value;
    const cardImage = inputLinkCard.value;
    const card = { name: cardName, link: cardImage };
    renderTemplateItem(card);
    popupToggle(newForm);
}
//сохранение формы 
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInfo.textContent = inputName.value;
    jobInfo.textContent = inputJob.value;
    popupToggle(popup);
}
formCard.addEventListener('submit', formSubmitCard);
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', () => { popupToggle(popup); });//кнопка открытия формы профиля
closePopup.addEventListener('click', () => { popupToggle(popup); });
addButton.addEventListener('click', () => { popupToggle(newForm); });//кнопка открытия формы добавления фотки
closeCards.addEventListener('click', () => { popupToggle(newForm); });
closePhoto.addEventListener('click', () => { popupToggle(photoPopup); });//зыкрыть фотку
