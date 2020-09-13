export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    //добавить элемент в разметку
    addItem(element) {
        this._container.prepend(element);
    }
    //отрисовка всех елементов массива
    renderElements() {
        this._initialArray.forEach(item => {
            this._renderer(item);
        });
    }
}