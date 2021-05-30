export default class Card {
    static selectors = {
        template: '#cardTemplate',
        cardImage: '.element__image',
        cardTitle: '.element__title',
        cardLikeBtn: '.element__like-btn',
        cardDeleteBtn: '.element__delete-btn',
        cardElement: '.element',
        likeBtnActive: 'element__like-btn_active',
        likeCounterSelector: '.like-elements__counter'
    }

    constructor(data, cardSelector, handleCardClick, likesHandler, currentUserId, handleDeleteCardButton) {
        this._data = data;
        this._card = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._handleCardClick = handleCardClick;
        this._owner = data.owner;
        this._currentUserId = currentUserId;
        this._likesHandler = likesHandler;
        this._handleDeleteCardButton = handleDeleteCardButton;
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
        this._cardLikeElement = this._cardItem.querySelector(Card.selectors.likeCounterSelector);
        this._cardElement = this._cardItem.querySelector(Card.selectors.cardElement);
        this._cardItemImg.src = this._link;
        this._cardItemTitle.textContent = this._name;
        this._cardItemImg.alt = `Фото ${this._name}`;
        this._cardElement.id = this._cardId;
        this.likesHandler(this._data);
        this._handleViewDeleteButton()
        this._setEventListener();
        return this._cardItem;
    }

    _setEventListener() {
        this._cardItemImg.addEventListener('click', () => {
            this._handleCardClick(this._data);
        });
        this._cardItemLikeBtn.addEventListener('click', () => {
            this._likesHandler(this, this._data);
        });
        this._cardDeleteBtn.addEventListener('click', (evt) => {
            this._handleDeleteCardButton(evt, this, this._data);
        });

    }

    likesHandler(data) {
        this._isLiked = data.likes.some((like) => {
            return like._id === this._currentUserId
        })
        if (this._isLiked) {
            this._cardItemLikeBtn.classList.add(Card.selectors.likeBtnActive);
            this._cardLikeElement.textContent = data.likes.length;
        } else {
            this._cardItemLikeBtn.classList.remove(Card.selectors.likeBtnActive)
            this._cardLikeElement.textContent = data.likes.length;
        }
    }

    isLiked() {
        return this._isLiked
    }

    _handleViewDeleteButton() {
        if (this._owner._id === this._currentUserId) {
            this._showDeleteButton()
        }
    }

    _showDeleteButton() {
        this._cardDeleteBtn.removeAttribute('hidden');
    }
}




