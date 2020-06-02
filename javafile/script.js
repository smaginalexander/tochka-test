const editButton = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
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
const photoPopup = document.querySelector('.photo-popup');
const closePhoto = document.querySelector('.photo-popup__close');
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
const newForm = document.querySelector('#new-card');
const addButton = document.querySelector('.profile__add-button');
//поля формы 
const inputNameCard = document.querySelector('#name-card');
const inputLinkCard = document.querySelector('#link-card');
//переменные для содержимого инпутов 

const cardImage = document.querySelector('.element__image');
const cardName = document.querySelector('.element__text');
const formCard = document.querySelector('#form');

function openForm() {
    popup.classList.add('popup_opened');
    inputName.value = nameInfo.textContent;
    inputJob.value = jobInfo.textContent;
}
//закрытие формы 

function closeForm() {
    popup.classList.remove('popup_opened')
}
//сохранение формы 
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInfo.textContent = inputName.value;
    jobInfo.textContent = inputJob.value;
    closeForm();
}
//загружаем карточки на страницу 
function renderTemplateItem(item) {
    const cardClone = cardTemplate.cloneNode(true);
    cardClone.querySelector('.element__image').src = item.link;
    cardClone.querySelector('.element__text').textContent = item.name;
    Like = cardClone.querySelector('.element__btn');//находим кнопку лайк 
    trash = cardClone.querySelector('.element__trash');//кнопка удаления карточки
    photoImg = cardClone.querySelector('.element__image');//найдем фото
    photo.src = item.link;
    photoText.textContent = item.name;

    Like.addEventListener('click', function (event) {
        event.target.closest('.element__btn').classList.toggle('element__btn_active');
    });
    trash.addEventListener('click', function (itm) {
        itm.target.closest('.element').remove();
    });
    photoImg.addEventListener('click', function () {
        photoPopup.classList.add('popup_opened');

    });
    elementBlock.prepend(cardClone);
}

closePhoto.addEventListener('click', openPhoto);
//открытие фотки 
function openPhoto() {
    photoPopup.classList.toggle('popup_opened');
}

function render() {
    initialCards.forEach(renderTemplateItem);
}

render();

function openFormCard() {
    newForm.classList.add('popup_opened');
    // Получаем значение полей из свойства value 
    inputName.value = nameInfo.textContent;
    inputJob.value = jobInfo.textContent;
}

function closeFormCard() {
    newForm.classList.remove('popup_opened')
}

function formSubmitCard(evt) {
    evt.preventDefault();
    const cardName = inputNameCard.value;
    const cardImage = inputLinkCard.value;
    const card = { name: cardName, link: cardImage };

    initialCards.unshift(card);
    renderTemplateItem(card);
    closeFormCard();
}


formCard.addEventListener('submit', formSubmitCard);
closePhoto.addEventListener('click', openPhoto);
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openForm);
closePopup.addEventListener('click', closeForm);
//в этом событии после клика на элемент editButton начнет действовать ф-я openForm и попап откроется 
addButton.addEventListener('click', openFormCard);
closeCards.addEventListener('click', closeFormCard);

