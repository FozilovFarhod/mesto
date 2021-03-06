import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {
    formData,
    popupData,
    openEditProfileButton,
    openAddCardButton,
    elementsListSelector,
    profileFieldsSelectors,
    nameInput,
    jobInput,
    updateAvatar,
    editProfileForm,
    updateAvatarForm,
    addCardForm,
} from '../utils/constants.js';
import '../pages/index.css';
import Api from '../components/Api.js';

const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort-24',
    token: '2a93645c-84c2-4a07-bd54-557c7d0e4ba1',
    groupId: 'cohort-24',
})

let userData = null;

Promise.all([api.getUserData(), api.getCards()])
    .then(([res, initialCards]) => {
        userData = res;
        userInfo.setUserInfo(userData);
        cardList.renderItems(initialCards)
    })
    .catch((res) => {
        console.log(`Ошибка при получении данных пользователя или массива карточек ${res}`);
    })

function addCardSubmitHandler(evt, inputValues) {
    evt.preventDefault();
    addCardPopup.setLoadingSubmitText(true);
    api.postCard(inputValues)
        .then((res) => {
            const cardElement = createCard(res);
            cardList.addUserCard(cardElement);
            addCardPopup.close();

        })
        .catch((errorMessage) => {
            console.log(`Ошибка при добавлении карточки ${errorMessage}`);
        })
        .finally(() => {
            addCardPopup.setLoadingSubmitText(false);
        })
}


function handleLikes(card, cardData) {
    if (card.isLiked()) {
        api.handleRemoveLikes(cardData._id)
            .then((res) => {
                card.likesHandler(res);
            })
            .catch((res) => {
                console.log(`Ошибка при удалении лайка ${res}`);
            })
    } else {
        api.handleAddLikes(cardData._id)
            .then((res) => {
                card.likesHandler(res);
            })
            .catch((res) => {
                console.log(`Ошибка при отправке лайка ${res}`);
            })
    }

}

function handleCardClick(data) {
    popupWithImage.open(data);
}

function createCard(item) {
    const card = new Card(item, '#cardTemplate', handleCardClick, handleLikes, userData._id, handleDeleteCardButton);
    return card.generateCard();
}


const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
    }
}, elementsListSelector);


function editProfileSubmitHandler(evt, inputValues) {
    evt.preventDefault();
    editProfilePopup.setLoadingSubmitText(true);
    api.postUserData(inputValues)
        .then((res => {
            userInfo.setUserInfo(res);
            editProfilePopup.close();
        }))
        .catch((res) => {
            console.log(`Ошибка при редактировании профиля ${res}`);
        })
        .finally(() => {
            editProfilePopup.setLoadingSubmitText(false);
        })


}

function setEditProfilePopupInputValues() {
    const profileData = userInfo.getUserInfo();
    nameInput.value = profileData.name;
    jobInput.value = profileData.job;
}

function updateAvatarHandler(evt, data) {
    evt.preventDefault();
    updateAvatarPopup.setLoadingSubmitText(true);
    api.updateAvatar(data.inputProfileAvatar)
        .then((res) => {
            userInfo.setUserAvatar(res);
            updateAvatarPopup.close();
        })
        .catch((res) => {
            console.log(`Ошибка при обновлении фото пользователя ${res}`)
        })
        .finally(() => {
            updateAvatarPopup.setLoadingSubmitText(false);
        })

}

const editProfileFormValidator = new FormValidator(formData, editProfileForm);
editProfileFormValidator.enableValidation();

const updateAvatarFormValidator = new FormValidator(formData, updateAvatarForm);
updateAvatarFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(formData, addCardForm);
addCardFormValidator.enableValidation();

function deleteCardSubmitHandler(currentElement, card, cardData) {
    api.deleteCard(cardData._id)
        .then((res) => {
            card.removeCard();
            confirmDeletePopup.close()
        })
        .catch((res) => {
            console.log(`Ошибка при удалении карточки ${res}`);
        })

}


function handleDeleteCardButton(currentCardElement, card, cardData) {
    confirmDeletePopup.open(currentCardElement, card, cardData);
}


const userInfo = new UserInfo(profileFieldsSelectors);
const editProfilePopup = new PopupWithForm(popupData.editProfilePopupSelector, editProfileSubmitHandler);
const addCardPopup = new PopupWithForm(popupData.addCardPopupSelector, addCardSubmitHandler);
const confirmDeletePopup = new PopupWithConfirm(popupData.popupDeleteCardSelector, deleteCardSubmitHandler);
const updateAvatarPopup = new PopupWithForm(popupData.updateAvatarSelector, updateAvatarHandler);
const popupWithImage = new PopupWithImage(popupData.popupImgContainerSelector);

updateAvatarPopup.setEventListeners();
editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();
addCardPopup.setEventListeners();
confirmDeletePopup.setEventListeners();

openEditProfileButton.addEventListener('click', () => {
    editProfileFormValidator.clearInputErrors();
    editProfileFormValidator.disableSubmitButton();
    setEditProfilePopupInputValues();
    editProfilePopup.open();
});
openAddCardButton.addEventListener('click', () => {
    addCardFormValidator.clearInputErrors();
    addCardFormValidator.disableSubmitButton();
    addCardPopup.open();
});

updateAvatar.addEventListener('click', () => {
    updateAvatarFormValidator.clearInputErrors();
    updateAvatarFormValidator.disableSubmitButton();
    updateAvatarPopup.open();
});




