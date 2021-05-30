import Popup from './Popup.js';
import {formData} from '../utils/constants.js'

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._submitButton = this._popup.querySelector(formData.submitButtonSelector);
    }

    setEventListeners(evt, card, cardData) {
        super.setEventListeners();
        this._submitButton.addEventListener('click', () => {
            this._formSubmitHandler(evt, card, cardData);
        })

    }

}