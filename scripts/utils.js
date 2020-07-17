export const photoPopup = document.querySelector('.photo-popup');
export const imagePopup = document.querySelector('.photo-popup__img');
export const imageText = document.querySelector('.photo-popup__text');
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