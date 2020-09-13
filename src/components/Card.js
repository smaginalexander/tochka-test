export class Card {
    constructor({ link, name }, templateSelector, handleCardClick) {
        this._link = link;
        this._name = name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    //Получаем разметку карточки
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }
    // Вставляем данные в разметку
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._link
        this._element.querySelector('.element__text').textContent = this._name;
        return this._element;
    }
    //лайк
    _pressLike() {
        this._element.querySelector('.element__btn').classList.toggle('element__btn_active');
    }
    //удаление карточки
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
    //Слушатель событий
    _setEventListeners() {
        this._element.querySelector('.element__btn').addEventListener('click', () => {
            this._pressLike();
        });
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick({ link: this.link, name: this._name });
        });
    }
}
