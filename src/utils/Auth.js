class Auth {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers
    }


    _checkStatus(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error(`Error ${response.status}`);
    }

    register(data) {
        return fetch(`${this.baseUrl}/signup`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(this._checkStatus)
    }

    login(data) {
        return fetch(`${this.baseUrl}/signin`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(this._checkStatus)
    }

    checkToken(jwt) {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }
        })
            .then(this._checkStatus)
    }

}

export const auth = new Auth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json'
    }
})