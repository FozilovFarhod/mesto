const initialCards = [
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
// Элементы попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
const closeEditProfileButton = popupEditProfile.querySelector('.popup__close-btn');
const nameInput = popupEditProfile.querySelector('.popup__input_text_username');
const jobInput = popupEditProfile.querySelector('.popup__input_text_job');
// Элементы попап добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card');
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


function createCard(name, link) {
    const cardItemTemplate = document.querySelector('#cardTemplate').content;
    const cardItem = cardItemTemplate.cloneNode(true);
    const cardItemImg = cardItem.querySelector('.element__image');
    const cardItemTitle = cardItem.querySelector('.element__title');
    cardItemImg.src = link;
    cardItemTitle.textContent = name;
    cardItemImg.addEventListener('click', generateZoom);
    const likeBtn = cardItem.querySelector('.element__like-btn');
    likeBtn.addEventListener('click', () => {
        toggleLike(likeBtn);
    });
    const deleteBtn = cardItem.querySelector('.element__delete-btn');
    deleteBtn.addEventListener('click', deleteElement);
    return cardItem;
}

function generateZoom(evt) {
    popupImg.src = evt.target.src;
    popupImgCaption.textContent = evt.target.parentElement.querySelector('.element__title').textContent;
    togglePopup(popupImgContainer);
}
function deleteElement(evt) {
    const currentElement = evt.target.parentElement;
    currentElement.remove();

}

function addNewCard(evt) {
    evt.preventDefault();
    const cardItem = createCard(inputCardName.value, inputCardImg.value);
    inputCardName.value = '';
    inputCardImg.value = '';
    elementsList.prepend(cardItem);
    togglePopup(popupAddCard);
}

function togglePopup(item) {
    item.classList.toggle('popup_opened');
}
function toggleLike(item) {
    item.classList.toggle('element__like-btn_active');
}

function addPopupInner() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function formSubmitHandler(evt) {

    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(popupEditProfile);
}
openEditProfileButton.addEventListener('click', () => {
    addPopupInner();
    togglePopup(popupEditProfile);
});

initialCards.forEach(function (item) {
    const cardItem = createCard(item.name, item.link);
    elementsList.append(cardItem);
});


popupAddCard.addEventListener('submit', addNewCard);
openAddCardButton.addEventListener('click', () => togglePopup(popupAddCard));
closeEditProfileButton.addEventListener('click', () => togglePopup(popupEditProfile));
closeAddCardButton.addEventListener('click', () => togglePopup(popupAddCard));
closeImgZoomButton.addEventListener('click', () => togglePopup(popupImgContainer));
popupEditProfile.addEventListener('submit', formSubmitHandler);
