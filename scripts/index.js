let editProfileContainer = document.querySelector('.form-container');
//
console.log(editProfileContainer);
let editProfile = document.querySelector('.profile__edit-profile-btn');
let popUp = document.querySelector('.pop-up');
function addClass(elementEdit, newClass) {
     popUp.classList.add('pop-up_opened');
 }
editProfile.addEventListener('click', addClass);

let closeEditButton = document.querySelector('.form-container__close-btn');
let overlay = document.querySelector('.pop-up__overlay');

function removeClass(elementEdit, newClass) {
    popUp.classList.remove('pop-up_opened');
}
closeEditButton.addEventListener('click', removeClass);
overlay.addEventListener('click', removeClass);

let profileNameNew = document.querySelector('.form-container__username');
let profileName = document.querySelector('.profile__name');
function addName() {
    profileName.textContent = profileNameNew.value;
}
let saveProfileButton = editProfileContainer.querySelector('.form-container__submit-btn');

console.dir(saveProfileButton);
console.log(profileNameNew);
saveProfileButton.addEventListener('click', addName);