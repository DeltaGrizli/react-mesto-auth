class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl
        this.headers = headers;
    }

    setToken(jwt) {
        this.headers = {
            authorization: jwt,
            'Content-Type': 'application/json'
        }
        console.log(this.headers)
    }

    _checkStatus(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error(`Error ${response.status}`);
    }

    getInitialCards() {
        return fetch(this.baseUrl + '/cards', {
            method: 'GET',
            headers: this.headers
        })
            .then(this._checkStatus)
    }
    getUserInfo() {
        return fetch(this.baseUrl + '/users/me', {
            method: 'GET',
            headers: this.headers
        })
            .then(this._checkStatus)
    }

    postNewCard({ name, link }) {
        return fetch(this.baseUrl + '/cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkStatus)
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        })
            .then(this._checkStatus)
    }

    patchUserInfo({ name, about }) {
        return fetch(this.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkStatus)
    }

    patchAvatarInfo({ avatar }) {
        return fetch(this.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(this._checkStatus)
    }

    putLike(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.headers
        })
            .then(this._checkStatus)
    }

    deleteLike(cardId) {
        return fetch((`${this.baseUrl}/cards/${cardId}/likes`), {
            method: "DELETE",
            headers: this.headers
        })
            .then(this._checkStatus)
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: 'fef5ea78-b931-498d-bcf8-69e7812850f6',
        'Content-Type': 'application/json'
    }
})