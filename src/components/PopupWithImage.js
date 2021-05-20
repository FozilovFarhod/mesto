import Popup from './Popup.js';
import {
    popupImg, popupImgCaption,
}
    from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
    }
    open (data) {
        popupImg.src = data.link;
        popupImg.alt = `Фото ${data.name}`;
        popupImgCaption.textContent = data.name;
        super.open();
    }
}
