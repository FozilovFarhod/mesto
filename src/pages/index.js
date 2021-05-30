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
    formList,
    openEditProfileButton,
    openAddCardButton,
    elementsListSelector,
    profileFieldsSelectors,
    nameInput,
    jobInput,
    updateAvatar,
} from '../utils/constants.js';
import '../pages/index.css';
import Api from '../components/Api.js';

const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort-24',
    token: '2a93645c-84c2-4a07-bd54-557c7d0e4ba1',
    groupId: 'cohort-24',
})

api.getUserData()
    .then((res) => {
        userData = res;
        userInfo.setUserInfo(userData);
    })
    .catch((res) => {
        console.log(`Ошибка получения данных пользователя${res}`);
    })


api.getCards()
    .then((cards) => {
        cardList.renderItems(cards)
    })
    .catch((res) => {
        console.log(`Ошибка получения массива карточек ${res}`);
    })

function addCardSubmitHandler(evt, inputValues) {
    evt.preventDefault();
    addCardPopup.setLoadingSubmitText(true);
    api.postCard(inputValues)
        .then((res) => {
            const card = new Card(res, '#cardTemplate', handleCardClick, handleLikes, userData._id, handleDeleteCardButton);
            const cardElement = card.generateCard();
            cardList.addUserCard(cardElement);

        })
        .catch((errorMessage) => {
            console.log(`Ошибка при добавлении карточки ${errorMessage}`);
        })
        .finally(() => {
            addCardPopup.close();
            addCardPopup.setLoadingSubmitText(false);
        })
}

let userData = null;

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


const cardList = new Section({
    renderer: (item) => {

        const card = new Card(item, '#cardTemplate', handleCardClick, handleLikes, userData._id, handleDeleteCardButton);
        const cardElement = card.generateCard()
        cardList.addItem(cardElement);

    }
}, elementsListSelector);


function editProfileSubmitHandler(evt, inputValues) {
    evt.preventDefault();
    editProfilePopup.setLoadingSubmitText(true);
    api.postUserData(inputValues)
        .then((res => {
            userInfo.setUserInfo(res);
        }))
        .catch((res) => {
            console.log(`Ошибка при редактировании профиля ${res}`);
        })
        .finally(() => {
            editProfilePopup.close();
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

        })
        .catch((res) => {
            console.log(`Ошибка при обновлении фото пользователя ${res}`)
        })
        .finally(() => {
            updateAvatarPopup.close();
            updateAvatarPopup.setLoadingSubmitText(false);
        })

}

formList.forEach((formElement) => {
    const newFormValidator = new FormValidator(formData, formElement);
    newFormValidator.enableValidation();
});

function deleteCardSubmitHandler(evt, card, cardData) {
    api.deleteCard(cardData._id)
        .then((res) => {
            const currentElement = evt.target.closest('.element');
            cardList.deleteElement(currentElement);
        })
        .catch((res) => {
            console.log(`Ошибка при удалении карточки ${res}`);
        })
        .finally(() => {
            confirmDeletePopup.close();
        })

}

function handleDeleteCardButton(evt, card, carddata) {
    confirmDeletePopup.open();
    confirmDeletePopup.setEventListeners(evt, card, carddata);
}


const userInfo = new UserInfo(profileFieldsSelectors);
const editProfilePopup = new PopupWithForm(popupData.editProfilePopupSelector, editProfileSubmitHandler);
const addCardPopup = new PopupWithForm(popupData.addCardPopupSelector, addCardSubmitHandler);
const updateAvatarPopup = new PopupWithForm(popupData.updateAvatarSelector, updateAvatarHandler);
const confirmDeletePopup = new PopupWithConfirm(popupData.popupDeleteCardSelector, deleteCardSubmitHandler);
const popupWithImage = new PopupWithImage(popupData.popupImgContainerSelector);

updateAvatarPopup.setEventListeners();
editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();
addCardPopup.setEventListeners();

openEditProfileButton.addEventListener('click', () => {
    setEditProfilePopupInputValues();
    editProfilePopup.open();
});
openAddCardButton.addEventListener('click', () => {
    addCardPopup.open();
});

updateAvatar.addEventListener('click', () => {
    updateAvatarPopup.open();
});




