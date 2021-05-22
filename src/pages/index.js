import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {
    formData,
    popupData,
    initialCards,
    formList,
    openEditProfileButton,
    openAddCardButton,
    elementsListSelector,
    profileFieldsSelectors,
    nameInput,
    jobInput,
} from '../utils/constants.js';
import '../pages/index.css';

function handleCardClick(data) {
    popupWithImage.open(data);
}

function addCardSubmitHandler(evt, inputValues) {
    evt.preventDefault();
    const cardData = {
        name: inputValues.name,
        link: inputValues.link,
    }
    const card = new Card(cardData, '#cardTemplate', handleCardClick);
    const cardElement = card.generateCard();
    cardList.addUserCard(cardElement);
    addCardPopup.close();
}

function editProfileSubmitHandler(evt, inputValues) {
    evt.preventDefault();
    userInfo.setUserInfo(inputValues);
    editProfilePopup.close();
}

function setEditProfilePopupInputValues() {
    const profileData = userInfo.getUserInfo();
    nameInput.value = profileData.name;
    jobInput.value = profileData.job;
}

formList.forEach((formElement) => {
    const newFormValidator = new FormValidator(formData, formElement);
    newFormValidator.enableValidation();
});
const cardList = new Section({
    items: initialCards, renderer: (item) => {
        const card = new Card(item, '#cardTemplate', handleCardClick);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, elementsListSelector);
cardList.renderItems();

const userInfo = new UserInfo(profileFieldsSelectors);
const editProfilePopup = new PopupWithForm(popupData.editProfilePopupSelector, editProfileSubmitHandler);
const addCardPopup = new PopupWithForm(popupData.addCardPopupSelector, addCardSubmitHandler);
const popupWithImage = new PopupWithImage(popupData.popupImgContainerSelector);
editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();
addCardPopup.setEventListeners();

openEditProfileButton.addEventListener('click', () => {
    setEditProfilePopupInputValues();
    editProfilePopup.open();
});
openAddCardButton.addEventListener('click', () => {
    addCardPopup.open();
})


