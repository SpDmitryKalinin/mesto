import './../pages/index.css'; 

import{Card} from './../components/Card.js';
import{FormValidator} from './../components/FormValidator.js';
import{Section} from './../components/Section.js';
import{PopupWithImage} from './../components/PopupWithImage.js';
import{PopupWithForm} from './../components/PopupWithForm.js';
import{UserInfo} from './../components/UserInfo.js';
export{initPopUpPicture};

const modalWindowEdit = document.querySelector('.modal-window_edit');
const modalWindowAdd = document.querySelector('.modal-window_add');
const profileEdit = document.querySelector('.profile__edit-button');
const formEdit = document.querySelector('.modal-window__form_edit');
const formAdd = document.querySelector('.modal-window__form_add');
const formPlace = document.querySelector('.modal-window__place');
const formLink = document.querySelector('.modal-window__link');
const addButton = document.querySelector('.profile__add-button');
const cards = document.querySelector('.elements');
const templateCard = document.querySelector('.template-element').content;
const popUpPicture = document.querySelector('.modal-window_image');
const formProfileName = document.querySelector('.modal-window__name');
const formProfileEmployment = document.querySelector('.modal-window__employment');
const forms = Array.from(document.querySelectorAll('.modal-window__form'));
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

const object = ({
    formSelector: '.modal-window__form',
    inputSelector: '.modal-window__item',
    submitButtonSelector: '.modal-window__submit-button',
    inactiveButtonClass: 'modal-window__submit-button_disabled',
    inputErrorClass: 'modal-window__item_error',
    errorClass: 'modal-window__type-error_active' 
}); 


const classSection = new Section({
    items: initialCards,
    renderer: (item, containItems) =>{
        const card = new Card(item, templateCard, initPopUpPicture);
        const cardElementClass = card.returnCardElement();
        containItems.prepend(cardElementClass);
    },
}, cards);
classSection.addArray();



const popupWithFormforEdit = new PopupWithForm(modalWindowEdit, '.modal-window__submit-button', saveFormEditData);
popupWithFormforEdit.setEventListeners();

const popupWithFormforAdd = new PopupWithForm(modalWindowAdd, '.modal-window__submit-button', saveFormAddDataHandler);
popupWithFormforAdd.setEventListeners();

const popUpClassImg = new PopupWithImage(popUpPicture);
popUpClassImg.setEventListeners();

const userInfoClass = new UserInfo('.profile__title', '.profile__subtitle');

forms.forEach(form => {
    const classValidation = new FormValidator(object, form);
    classValidation.enableValidation();
});

//Функция создания карточки
function createCard(item){
    const card = new Card(item, templateCard, initPopUpPicture);
    const cardElementClass = card.returnCardElement();
    return cardElementClass;
}

//Функция передачи значений из формы добавления карточек
function saveFormAddDataHandler(data){
    const item = {
        name: data['place'],
        link: data['link']
    }
    formPlace.value = "";
    formLink.value ="";
    classSection.addItem(createCard(item, templateCard, initPopUpPicture));
    const addSubmitButton = formAdd.querySelector('.modal-window__submit-button')
    addSubmitButton.setAttribute('disabled', 'disabled');
    addSubmitButton.classList.add('modal-window__submit-button_disabled');
    popupWithFormforAdd.close();
}

//Функция передачи значения из формы в профиль
function saveFormEditData(data){
    userInfoClass.setUserInfo(data['name'], data['emloyment']);
    popupWithFormforEdit.close();
}

//Инициализация окна pop-up с картинкой 
function initPopUpPicture(item){
    popUpClassImg.open(item);
}

//Слушатели открытия окон

addButton.addEventListener('click', () => popupWithFormforAdd.open());

//Слушатель открытия и заполнения инпутов
profileEdit.addEventListener('click', () =>{
    popupWithFormforEdit.open();
    const info = userInfoClass.getUserInfo();
    
    formProfileName.value = info.user;
    formProfileEmployment.value = info.about;
});

