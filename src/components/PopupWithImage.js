import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImgElement = this._popup.querySelector('.popup__img-zoom');
        this._popupImgCaptionElement = this._popup.querySelector('.popup__img-caption');
    }

    open(data) {
        this._popupImgElement.src = data.link;
        this._popupImgElement.alt = `Фото ${data.name}`;
        this._popupImgCaptionElement.textContent = data.name;
        super.open();
    }
}
