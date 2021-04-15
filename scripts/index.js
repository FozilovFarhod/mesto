// Элементы попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
const closeEditProfileButton = popupEditProfile.querySelector('.popup__close-btn');
const nameInput = popupEditProfile.querySelector('.popup__input_text_username');
const jobInput = popupEditProfile.querySelector('.popup__input_text_job');
// Элементы попап добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const inputCardName = popupAddCard.querySelector('.popup__input_text_card-name');
const inputCardImg = popupAddCard.querySelector('.popup__input_text_img-link');
const closeAddCardButton = popupAddCard.querySelector('.popup__close-btn');
// Элементы попап увеличения картинки
const popupImgContainer = document.querySelector('.popup_type_img');
const popupImg = popupImgContainer.querySelector('.popup__img-zoom');
const popupImgCaption = popupImgContainer.querySelector('.popup__img-caption');
const closeImgZoomButton = popupImgContainer.querySelector('.popup__close-btn');
// Элементы данных профиля
const openEditProfileButton = document.querySelector('.profile__edit-profile-btn');
const profileContainer = document.querySelector('.profile');
const profileName = profileContainer.querySelector('.profile__name');
const profileJob = profileContainer.querySelector('.profile__job');
const openAddCardButton = profileContainer.querySelector('.profile__add-element-btn');
// Элементы grid карточек
const elementsList = document.querySelector('.elements');
// Шаблон карточки
const cardItemTemplate = document.querySelector('#cardTemplate').content;

function createCard(data) {
    const cardItem = cardItemTemplate.cloneNode(true);
    const cardItemImg = cardItem.querySelector('.element__image');
    const cardItemTitle = cardItem.querySelector('.element__title');
    cardItemImg.src = data.link;
    cardItemTitle.textContent = data.name;
    cardItemImg.addEventListener('click', (evt) => handleOpenZoom(evt, data));
    cardItemImg.alt = `Фото ${data.name}`;
    const likeBtn = cardItem.querySelector('.element__like-btn');
    likeBtn.addEventListener('click', () => {
        handleToggleLike(likeBtn);
    });
    const deleteBtn = cardItem.querySelector('.element__delete-btn');
    deleteBtn.addEventListener('click', handleDeleteElement);
    return cardItem;
}

function renderCard(data, wrap, isPrepend) {
    if (isPrepend) {
        wrap.prepend(createCard(data));
    }
    wrap.append(createCard(data));
}

function addNewCard(evt) {
    evt.preventDefault();
    const popupInputData = {name: inputCardName.value, link: inputCardImg.value};
    renderCard(popupInputData, elementsList, 'isPrepend');
    popupAddCardForm.reset();
    closePopup(popupAddCard);
}

function handleOpenZoom(evt, data) {
    popupImg.src = data.link;
    popupImg.alt = evt.target.alt;
    popupImgCaption.textContent = data.name;
    openPopup(popupImgContainer);
}

function handleDeleteElement(evt) {
    evt.target.closest('.element').remove();
}

function closePopupByOverlayClick(evt) {
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

function closePopup(item) {
    item.classList.remove('popup_opened');
    item.removeEventListener('mousedown', closePopupByOverlayClick);
    document.removeEventListener('keydown', closeByEscapeHandler);
    clearInputErrors(item);
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

function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscapeHandler);
    item.addEventListener('mousedown', closePopupByOverlayClick);
}

function handleToggleLike(item) {
    item.classList.toggle('element__like-btn_active');
}

function formSubmitHandler(evt) {

    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

openEditProfileButton.addEventListener('click', () => {
    addPopupInner();
    openPopup(popupEditProfile);
});

initialCards.forEach((data) => {
    renderCard(data, elementsList);
});

popupAddCard.addEventListener('submit', addNewCard);
openAddCardButton.addEventListener('click', () => openPopup(popupAddCard));
closeEditProfileButton.addEventListener('click', () => closePopup(popupEditProfile));
closeAddCardButton.addEventListener('click', () => closePopup(popupAddCard));
closeImgZoomButton.addEventListener('click', () => closePopup(popupImgContainer));
popupEditProfile.addEventListener('submit', formSubmitHandler);
