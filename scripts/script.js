const modalWindowEdit = document.querySelector('.modal-window_edit');
const modalWindowAdd = document.querySelector('.modal-window_add') 
const modalWindow = document.querySelectorAll('.modal-window');
const modalWindowCloseEdit = document.querySelector('.modal-window__close-button_edit');
const modalWindowCloseAdd = document.querySelector('.modal-window__close-button_add');
const profileEdit = document.querySelector('.profile__edit-button');
const formEdit = document.querySelector('.modal-window__form_edit');
const formAdd = document.querySelector('.modal-window__form_add');
const formPlace = document.querySelector('.modal-window__place');
const formLink = document.querySelector('.modal-window__link');
const addButton = document.querySelector('.profile__add-button');
const cards = document.querySelector('.elements');
const templateCard = document.querySelector('.template-element').content;
const popUpPicture = document.querySelector('.pop-up');
const popUpPictureImg = document.querySelector('.pop-up__image');
const popUpPictureCaption = document.querySelector('.pop-up__caption');
const popUpPictureCloseButton = document.querySelector('.pop-up__close-button');

let profileName = document.querySelector('.profile__title')
let profileEmployment = document.querySelector('.profile__subtitle');
let formProfileName = document.querySelector('.modal-window__name');
let formProfileEmployment = document.querySelector('.modal-window__employment');



const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(item =>{
    const card = templateCard.cloneNode(true);
    const cardTitle = card.querySelector('.element__title').textContent = item.name;
    const cardImage = card.querySelector('.element__image').src = item.link;
    cards.append(card);
});


function openWindowHandler(evt){
    if(evt.target.classList.contains('profile__edit-button')){
        formProfileName.value = profileName.textContent;
        formProfileEmployment.value = profileEmployment.textContent;
        modalWindowEdit.classList.add("modal-window_is-open");
    }
    else if(evt.target.classList.contains('profile__add-button')){
        modalWindowAdd.classList.add("modal-window_is-open");
    }
    
}

function closeEditWindowHandler(){
    modalWindowEdit.classList.remove("modal-window_is-open");
}  
function closeAddWindowHandler(){
    modalWindowAdd.classList.remove("modal-window_is-open");
}
function saveFormEditDataHandler(evt){
    evt.preventDefault();
    profileName.textContent = formProfileName.value;
    profileEmployment.textContent = formProfileEmployment.value;
    closeEditWindowHandler();
}

function saveFormAddDataHandler(evt){
    evt.preventDefault();
    const card = templateCard.cloneNode(true);
    formPlace.value = "";
    formLink.value ="";
    const cardTitle = card.querySelector('.element__title').textContent = formPlace.value;
    const cardImage = card.querySelector('.element__image').src = formLink.value;
    cards.append(card);
    closeAddWindowHandler();
}

function deleteCardHandler(evt){
    let target = evt.target;
    if(target.classList.contains('element__button-delete')){
        target.parentElement.parentElement.removeChild(target.parentElement);
        return false;
    }
    else{
        return false;
    }
}

function likeCardHandler(evt){
    let target = evt.target;
    if(target.classList.contains('element__button-like')){
        target.classList.toggle('element__button-like_active');
        return false;
    }
    else{
        return false;
    }
}

function viewCardHandler(evt){
    let target = evt.target;
    if(target.classList.contains('element__image')){
        popUpPictureImg.src = evt.target.src;
        popUpPictureCaption.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
        popUpPicture.classList.add('pop-up_is-open');
    }
    else{
        return false;
    }
}

function closePopUpPicture(){
    popUpPicture.classList.remove('pop-up_is-open');
}

addButton.addEventListener('click', openWindowHandler);
profileEdit.addEventListener('click', openWindowHandler);
modalWindowCloseEdit.addEventListener('click', closeEditWindowHandler);
modalWindowCloseAdd.addEventListener('click', closeAddWindowHandler);
formEdit.addEventListener('submit', saveFormEditDataHandler);
formAdd.addEventListener('submit', saveFormAddDataHandler);
cards.addEventListener('click', deleteCardHandler);
cards.addEventListener('click', likeCardHandler);
cards.addEventListener('click', viewCardHandler);
popUpPictureCloseButton.addEventListener('click', closePopUpPicture);