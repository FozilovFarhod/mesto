import Popup from './Popup.js';
import {formData} from '../utils/constants.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._formInputs = Array.from(this._form.querySelectorAll(formData.inputSelector));
        this._submitButton = this._form.querySelector(formData.submitButtonSelector);
    }

    _getInputValues() {
        const inputValues = {};
        this._formInputs.forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    _clearInputErrors() {
        this._formInputs.forEach((input) => {
            const inputErrorElement = this._form.querySelector(`#${input.id}-error`)
            input.classList.remove('popup__input_type_error');
            inputErrorElement.textContent = '';

        })
    }

    _disableSubmitButton() {
        this._submitButton.setAttribute('disabled', 'true');
        this._submitButton.classList.add(formData.inactiveButtonClass);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            this._formSubmitHandler(evt, this._getInputValues())
        });
    }

    close() {
        this._clearInputErrors();
        this._disableSubmitButton();
        this._form.reset();
        super.close();
    }

    setLoadingSubmitText(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = 'Сохранить';
        }
    }
}