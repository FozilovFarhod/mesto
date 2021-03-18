let profileContainer = document.querySelector ('.profile');
let editProfileBtn = profileContainer.querySelector('.profile__edit-profile-btn');
let popUp = document.querySelector('.popup');
let popupContainer = popUp.querySelector('.popup__container');
let closePopupBtn = popUp.querySelector('.popup__close-btn');
let nameInput = popupContainer.querySelector('.popup__username');
let jobInput = popupContainer.querySelector('.popup__job');
let profileName = profileContainer.querySelector('.profile__name');
let profileJob = profileContainer.querySelector('.profile__job');;

function openPopup() {
    nameInput.placeholder = profileName.textContent;
    jobInput.placeholder = profileJob.textContent;
    popUp.classList.add('popup_opened');
}
function closePopup() {
    popUp.classList.remove('popup_opened');
}
function stopImmediatePropagation(event) {
    event.stopImmediatePropagation();
}

editProfileBtn.addEventListener('click', openPopup);
popUp.addEventListener('click', closePopup);
closePopupBtn.addEventListener('click', closePopup);

popupContainer.addEventListener('click', stopImmediatePropagation);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    nameInput.value = ''
    jobInput.value = ''
    closePopup();
}

popupContainer.addEventListener('submit', formSubmitHandler);