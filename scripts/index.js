let profileContainer = document.querySelector('.profile');
let editProfileBtn = profileContainer.querySelector('.profile__edit-profile-btn');
let popUp = document.querySelector('.popup');
let popupContainer = popUp.querySelector('.popup__container');
let closePopupBtn = popUp.querySelector('.popup__close-btn');
let nameInput = popupContainer.querySelector('.popup__input_text_username');
let jobInput = popupContainer.querySelector('.popup__input_text_job');
let profileName = profileContainer.querySelector('.profile__name');
let profileJob = profileContainer.querySelector('.profile__job');

function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popUp.classList.add('popup_opened');
}

function closePopup() {
    popUp.classList.remove('popup_opened');
}

function stopImmediatePropagation(event) {
    event.stopImmediatePropagation();
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}
editProfileBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
popupContainer.addEventListener('click', stopImmediatePropagation);
popupContainer.addEventListener('submit', formSubmitHandler);