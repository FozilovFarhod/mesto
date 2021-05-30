import Popup from './Popup.js';
import {formData} from '../utils/constants.js'

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector(formData.submitButtonSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', () => {
            this._formSubmitHandler(this._cardElement, this._cardInstance, this._currentCardData);
        })

    }
    open(currentCardElement, card, cardData) {
        this._cardElement= currentCardElement;
        this._cardInstance = card;
        this._currentCardData = cardData;
        super.open();
    }

}