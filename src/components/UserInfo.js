export default class UserInfo {
    constructor(data) {
        this._nameElement = document.querySelector(data.name);
        this._jobElement = document.querySelector(data.job);
    }

    getUserInfo() {
        const userInfo = {name: this._nameElement.textContent, job: this._jobElement.textContent};
        return userInfo;
    }

    setUserInfo(userData) {
        this._nameElement.textContent = userData.inputProfileName;
        this._jobElement.textContent = userData.inputProfileJob;
    }

}