export default class Api {
    constructor({address, token}) {
        this._address = address;
        this._token = token;
        this._responseHandler = this._responseHandler.bind(this);
    }

    getCards() {
        return fetch(`${this._address}/cards`, {
            headers: {
                authorization: this._token,
            }
        })
            .then((res) => {
                return this._responseHandler(res);
            });
    }

    postCard(data) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })

        })
            .then((res) => {
                return this._responseHandler(res);
            })
    }

    updateAvatar(avatarLink) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                avatar: avatarLink,
            })
        })
            .then((res) => {
                return this._responseHandler(res);
            })
    }

    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then((res) => {
                return this._responseHandler(res);
            })

    }

    getUserData() {
        return fetch(`${this._address}/users/me`, {
            headers: {
                authorization: this._token,
                'Content-type': 'application/json',
            },
        })
            .then((res) => {
                return this._responseHandler(res);
            })
    }

    postUserData(userData) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json',

            },
            body: JSON.stringify({
                name: userData.inputProfileName,
                about: userData.inputProfileJob,
            }),
        })
            .then((res) => {
                return this._responseHandler(res);
            })
    }

    handleAddLikes(cardId) {
        return fetch(`${this._address}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            },
        })
            .then((res) => {
                return this._responseHandler(res);
            })
    }

    handleRemoveLikes(cardId) {
        return fetch(`${this._address}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            },
        })
            .then((res) => {
                return this._responseHandler(res);
            })
    }
    _responseHandler(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(res.status);
        }
    }
}