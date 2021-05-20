export class FormValidator {
    constructor(formData, formElement) {
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(formData.inputSelector));
        this._errorClass = formData.errorClass;
        this._inputFieldTypeError = formData.inputFieldTypeError;
        this._submitButtonElement = this._formElement.querySelector(formData.submitButtonSelector);
        this._inactiveButtonClass =formData.inactiveButtonClass;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputFieldTypeError);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputFieldTypeError);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);

    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, errorMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _toggleSubmitBtnState() {
        const hasInvalidInput = this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });
        if (hasInvalidInput) {
            this._submitButtonElement.setAttribute('disabled', true);
            this._submitButtonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._submitButtonElement.removeAttribute('disabled', true);
            this._submitButtonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    _setEventListeners() {

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleSubmitBtnState();
            })
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
}
