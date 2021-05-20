export default class Card {
    static selectors = {
        template: '#cardTemplate',
        cardImage: '.element__image',
        cardTitle: '.element__title',
        cardLikeBtn: '.element__like-btn',
        cardDeleteBtn: '.element__delete-btn',
        cardElement: '.element',
        likeBtnActive: 'element__like-btn_active',
    }

    constructor(data, cardSelector, handleCardClick) {
        this._data = data;
        this._card = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardItem = document.querySelector(this._card).content.cloneNode(true);
        return cardItem;
    }

    generateCard() {
        this._cardItem = this._getTemplate();
        this._cardItemImg = this._cardItem.querySelector(Card.selectors.cardImage);
        this._cardItemTitle = this._cardItem.querySelector(Card.selectors.cardTitle);
        this._cardItemLikeBtn = this._cardItem.querySelector(Card.selectors.cardLikeBtn);
        this._cardDeleteBtn = this._cardItem.querySelector(Card.selectors.cardDeleteBtn);
        this._cardItemImg.src = this._link;
        this._cardItemTitle.textContent = this._name;
        this._cardItemImg.alt = `Фото ${this._name}`;
        this._setEventListener();
        return this._cardItem;
    }

    _setEventListener() {
        this._cardItemImg.addEventListener('click', () => {
            this._handleCardClick(this._data);
        });
        this._cardItemLikeBtn.addEventListener('click', () => {
            this._handleToggleLike();
        });
        this._cardDeleteBtn.addEventListener('click', (evt) => {
            this._handleDeleteElement(evt);
        });

    }

    // _handleOpenZoom() {
    //     popupImg.src = this._link;
    //     popupImg.alt = `Фото ${this._name}`;
    //     popupImgCaption.textContent = this._name;
    //     openPopup(popupImgContainer);
    // }

    _handleDeleteElement(evt) {
        evt.target.closest(Card.selectors.cardElement).remove();
    }

    _handleToggleLike() {
        this._cardItemLikeBtn.classList.toggle(Card.selectors.likeBtnActive);
    }
}




