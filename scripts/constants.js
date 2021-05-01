export const formData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    errorClass: 'popup__form-input-error_active',
    inputFieldTypeError: 'popup__input_type_error',
}

//Список форм на странице
export const formList = Array.from(document.querySelectorAll('.popup__form'));
// Элементы попап редактирования профиля
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const closeEditProfileButton = popupEditProfile.querySelector('.popup__close-btn');
export const nameInput = popupEditProfile.querySelector('.popup__input_text_username');
export const jobInput = popupEditProfile.querySelector('.popup__input_text_job');
// Элементы попап добавления карточки
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupAddCardForm = popupAddCard.querySelector('.popup__form');
export const inputCardName = popupAddCard.querySelector('.popup__input_text_card-name');
export const inputCardImg = popupAddCard.querySelector('.popup__input_text_img-link');
export const closeAddCardButton = popupAddCard.querySelector('.popup__close-btn');
export const formAddCardSubmitButton = popupAddCard.querySelector('.popup__submit-btn');
// Элементы попап увеличения картинки
export const popupImgContainer = document.querySelector('.popup_type_img');
export const popupImg = popupImgContainer.querySelector('.popup__img-zoom');
export const popupImgCaption = popupImgContainer.querySelector('.popup__img-caption');
export const closeImgZoomButton = popupImgContainer.querySelector('.popup__close-btn');
// Элементы данных профиля
export const openEditProfileButton = document.querySelector('.profile__edit-profile-btn');
const profileContainer = document.querySelector('.profile');
export const profileName = profileContainer.querySelector('.profile__name');
export const profileJob = profileContainer.querySelector('.profile__job');
export const openAddCardButton = profileContainer.querySelector('.profile__add-element-btn');
// Элементы grid карточек
export const elementsList = document.querySelector('.elements');

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];