import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {
    formData,
    initialCards,
    formList,
    popupEditProfile,
    closeEditProfileButton,
    nameInput,
    jobInput,
    popupAddCard,
    popupAddCardForm,
    inputCardName,
    inputCardImg,
    closeAddCardButton,
    formAddCardSubmitButton,
    popupImgContainer,
    popupImg,
    popupImgCaption,
    closeImgZoomButton,
    openEditProfileButton,
    profileName,
    profileJob,
    openAddCardButton,
    elementsList,

} from './constants.js';



function renderCard(wrap, cardItem, isPrepend) {
    if (isPrepend) {
        wrap.prepend(cardItem);
    } else {
        wrap.append(cardItem);
    }
}

function addNewCard(evt) {
    evt.preventDefault();
    const popupInputData = {name: inputCardName.value, link: inputCardImg.value};
    const card = new Card(popupInputData, '#cardTemplate');
    const cardItem = card.generateCard();
    renderCard(elementsList, cardItem, 'isPrepend');
    popupAddCardForm.reset();
    formAddCardSubmitButtonDisable();
    closePopup(popupAddCard);
}

export function closePopupByOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        const currentPopup = evt.target
        closePopup(currentPopup);
    }
}

function clearInputErrors(formElement) {
    const inputElements = Array.from(formElement.querySelectorAll('.popup__input'));

    inputElements.forEach((inputElement) => {
        const inputErrorElement = inputElement.closest('.popup__form').querySelector(`#${inputElement.id}-error`);
        inputErrorElement.textContent = '';
        inputElement.classList.remove('popup__input_type_error');
    });
}

export function closePopup(item) {
    item.classList.remove('popup_opened');
    item.removeEventListener('mousedown', closePopupByOverlayClick);
    document.removeEventListener('keydown', closeByEscapeHandler);
    clearInputErrors(item);
    clearImagePopupInner();
}

const closeByEscapeHandler = (evt) => {

    if (evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup' && '.popup_opened');
        closePopup(currentPopup);
    }
}

function addPopupInner() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

export function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscapeHandler);
    item.addEventListener('mousedown', closePopupByOverlayClick);
}

function formSubmitHandler(evt) {

    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

function clearImagePopupInner() {
    popupImg.src = '';
    popupImg.alt = '';
    popupImgCaption.textContent = '';
}

function formAddCardSubmitButtonDisable() {
    formAddCardSubmitButton.setAttribute('disabled', 'true');
    formAddCardSubmitButton.classList.add(formData.inactiveButtonClass);
}

initialCards.forEach((data) => {
    const card = new Card(data, '#cardTemplate');
    const cardItem = card.generateCard();
    renderCard(elementsList, cardItem);
});

openEditProfileButton.addEventListener('click', () => {
    addPopupInner();
    openPopup(popupEditProfile);
});
formList.forEach((formElement) => {
    const newFormValidator = new FormValidator(formData, formElement);
    newFormValidator.enableValidation();
});

popupAddCard.addEventListener('submit', addNewCard);
openAddCardButton.addEventListener('click', () => openPopup(popupAddCard));
closeEditProfileButton.addEventListener('click', () => closePopup(popupEditProfile));
closeAddCardButton.addEventListener('click', () => closePopup(popupAddCard));
closeImgZoomButton.addEventListener('click', () => closePopup(popupImgContainer));
popupEditProfile.addEventListener('submit', formSubmitHandler);
