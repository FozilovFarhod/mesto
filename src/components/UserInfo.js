export default class UserInfo {
    constructor(data) {
        this._nameElement = document.querySelector(data.name);
        this._jobElement = document.querySelector(data.job);
        this._avatarElement = document.querySelector(data.avatar);
        this._profileElement = document.querySelector(data.profileElementSelector);
    }

    getUserInfo() {
        const userInfo = {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
            id: this._profileElement.id
        };
        return userInfo;
    }

    setUserInfo(userData) {
        this._nameElement.textContent = userData.name;
        this._jobElement.textContent = userData.about;
        this._profileElement.id = userData._id;
        this.setUserAvatar(userData);

    }

    setUserAvatar(userData) {
        this._avatarElement.src = userData.avatar;
    }
}