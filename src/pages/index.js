import './../pages/index.css'; 

import{Card} from './../components/Card.js';
import{FormValidator} from './../components/FormValidator.js';
import{Section} from './../components/Section.js';
import{PopupWithImage} from './../components/PopupWithImage.js';
import{PopupWithForm} from './../components/PopupWithForm.js';
import{UserInfo} from './../components/UserInfo.js';
import{Api} from './../components/Api.js';
export{initPopUpPicture, openDeletePopUp};

const modalWindowEdit = document.querySelector('.modal-window_edit');
const modalWindowAdd = document.querySelector('.modal-window_add');
const modalWindowDelete = document.querySelector('.modal-window_confirm');
const profileEdit = document.querySelector('.profile__edit-button');
const formAdd = document.querySelector('.modal-window__form_add');
const formPlace = document.querySelector('.modal-window__place');
const formLink = document.querySelector('.modal-window__link');
const addButton = document.querySelector('.profile__add-button');
const cards = document.querySelector('.elements');
const templateCard = document.querySelector('.template-element').content;
const templateDeleteButton = document.querySelector('.template-delete-button').content;
const popUpPicture = document.querySelector('.modal-window_image');
const formProfileName = document.querySelector('.modal-window__name');
const formProfileEmployment = document.querySelector('.modal-window__employment');
const forms = Array.from(document.querySelectorAll('.modal-window__form'));
const deleteFormButton = document.querySelector('.modal-window__delete-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const modalWindowAvatar = document.querySelector('.modal-window_edit-avatar');
const submitButtonAvatar = document.querySelector('.modal-window__submit-button-edit-avatar');
const submitButtonEditInfo = document.querySelector('.modal-window__submit-button-edit-info');
const submitButtonAddCard = document.querySelector('.modal-window__submit-button-add-card');



const object = ({
    formSelector: '.modal-window__form',
    inputSelector: '.modal-window__item',
    submitButtonSelector: '.modal-window__submit-button',
    inactiveButtonClass: 'modal-window__submit-button_disabled',
    inputErrorClass: 'modal-window__item_error',
    errorClass: 'modal-window__type-error_active' 
}); 

const popupWithFormforAvatar = new PopupWithForm(modalWindowAvatar, '.modal-window__submit-button', saveFormAvatar)
popupWithFormforAvatar.setEventListeners();

const popupWithFormforEdit = new PopupWithForm(modalWindowEdit, '.modal-window__submit-button', saveFormEditData);
popupWithFormforEdit.setEventListeners();

const popupWithFormforAdd = new PopupWithForm(modalWindowAdd, '.modal-window__submit-button', saveFormAddDataHandler);
popupWithFormforAdd.setEventListeners();

const popUpClassImg = new PopupWithImage(popUpPicture);
popUpClassImg.setEventListeners();

const popUpWithFormForDelete = new PopupWithForm(modalWindowDelete);
popUpWithFormForDelete.setEventListeners();

const userInfoClass = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');


//Вызов класса Api для получения массива с карточками и их добавление в dom
const apiForCards = new Api('https://mesto.nomoreparties.co/v1/cohort-19/cards', '99cf486b-e575-4fd7-a9fa-cafa2239ffe6');
apiForCards.getCards()
    .then(result =>{
        const classSection = new Section({
            items: result,
            renderer: (item, containItems) =>{
                const card = new Card(item, templateCard, initPopUpPicture, templateDeleteButton, item.likes.length);
                const cardElementClass = card.returnCardElement();
                containItems.prepend(cardElementClass);
            },
        }, cards);
        
        classSection.addArray();
});

//Вызов класса Api для получения информации о пользователе и подставить результаты в dom
const apiForUserInfo = new Api('https://mesto.nomoreparties.co/v1/cohort-19/users/me', '99cf486b-e575-4fd7-a9fa-cafa2239ffe6');
apiForUserInfo.getProfileInfo()
    .then(result =>{
        userInfoClass.setUserInfo(result.name, result.about);
        userInfoClass.setUserAvatar(result.avatar);
});

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
    submitButtonAddCard.textContent = 'Сохранить...';
    const item = {
        name: data['place'],
        link: data['link']
    }
    formPlace.value = "";
    formLink.value ="";
    apiForCards.postCards(`${item.name}`, `${item.link}`);
    const addSubmitButton = formAdd.querySelector('.modal-window__submit-button')
    addSubmitButton.setAttribute('disabled', 'disabled');
    addSubmitButton.classList.add('modal-window__submit-button_disabled');
    popupWithFormforAdd.close();
    submitButtonAddCard.textContent = 'Сохранить';
}

//Функция сохранения данных из формы редактирования аватара
function saveFormAvatar(data){
    submitButtonAvatar.textContent = 'Сохранить...';
    userInfoClass.setUserAvatar(data.link);
    apiForUserInfo.patchProfileAvatar(data.link);
    popupWithFormforAvatar.close();
    submitButtonAvatar.textContent = 'Сохранить';
}

//Функция передачи значения из формы в профиль
function saveFormEditData(data){
    submitButtonEditInfo.textContent = 'Сохранить...';
    apiForUserInfo.patchProfileInfo(`${data.name}`, `${data.emloyment}`);
    userInfoClass.setUserInfo(data.name, data.emloyment);
    popupWithFormforEdit.close();
    submitButtonEditInfo.textContent = 'Сохранить';
}

//Инициализация окна pop-up с картинкой 
function initPopUpPicture(item){
    popUpClassImg.open(item);
}

//Открытие окна удаления карточки
function openDeletePopUp(id){
    popUpWithFormForDelete.open();
    deleteFormButton.addEventListener('click',() => deleteCardFunctionForListener(id));
}

const deleteCardFunctionForListener = function (id){
    apiForCards.deleteCard(id);
    deleteRemoveCardListener();
    popUpWithFormForDelete.close();    
}

function deleteRemoveCardListener(){
    deleteFormButton.addEventListener('click', deleteCardFunctionForListener);
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

//Слушатель открытия попапа редактирования аватарки
avatarEditButton.addEventListener('click', () =>{
    popupWithFormforAvatar.open();
});

//Вызов класса Api для редактирования информации о пользователе
apiForUserInfo.getProfileInfo()
    .then(result =>{
        userInfoClass.setUserInfo(result.name, result.about);
        userInfoClass.setUserAvatar(result.avatar);
});
