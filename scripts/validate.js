const showInputError = (formElement, inputElement, errorMessage, errorClass, inputFieldTypeError) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputFieldTypeError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);

}

const hideInputError = (formElement, inputElement, errorClass, inputFieldTypeError) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputFieldTypeError);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);

}
const checkInputValidity = (formElement, inputElement, errorClass, inputFieldTypeError) => {

    const isInvalidInput = !inputElement.validity.valid;
    if (isInvalidInput) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage, errorClass, inputFieldTypeError);
    } else {
        hideInputError(formElement, inputElement, errorClass, inputFieldTypeError);
    }
}
const toggleSubmitBtnState = (inputList, submitButtonElement, inactiveButtonClass) => {
    const hasInvalidInput = inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })

    if (hasInvalidInput) {
        submitButtonElement.setAttribute('disabled', true);
        submitButtonElement.classList.add(inactiveButtonClass)
    } else {
        submitButtonElement.removeAttribute('disabled', true);
        submitButtonElement.classList.remove(inactiveButtonClass);
    }
}
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputFieldTypeError) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButtonElement = formElement.querySelector(submitButtonSelector)

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, errorClass, inputFieldTypeError);
            toggleSubmitBtnState(inputList, submitButtonElement, inactiveButtonClass);
        });
    })

    toggleSubmitBtnState(inputList, submitButtonElement, inactiveButtonClass);
}
const enableValidation = ({
    formSelector,
                              inputSelector, submitButtonSelector, inactiveButtonClass, inputFieldTypeError, errorClass
                          }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputFieldTypeError)


    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    errorClass: 'popup__form-input-error_active',
    inputFieldTypeError: 'popup__input_type_error'
});