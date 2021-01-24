import '../pages/index.css';
import{Card} from './../components/Card.js';
import{FormValidator} from './../components/FormValidator.js';
import{Section} from './../components/Section.js';
import{PopupWithImage} from './../components/PopupWithImage.js';
import{PopupWithForm} from './../components/PopupWithForm.js';
import{UserInfo} from './../components/UserInfo.js';
import{Api} from './../components/Api.js';
import{EscButton, addressInfo, addressCard, token, object} from './../utils/constants.js';
const modalWindowEdit = document.querySelector('.modal-window_edit');
const modalWindowAdd = document.querySelector('.modal-window_add');
const modalWindowDelete = document.querySelector('.modal-window_confirm');
const profileEdit = document.querySelector('.profile__edit-button');
const formPlace = document.querySelector('.modal-window__place');
const formLink = document.querySelector('.modal-window__link');
const addButton = document.querySelector('.profile__add-button');
const cards = document.querySelector('.elements');
const templateCard = document.querySelector('.template-element').content;
const popUpPicture = document.querySelector('.modal-window_image');
const formProfileName = document.querySelector('.modal-window__name');
const formProfileEmployment = document.querySelector('.modal-window__employment');
const deleteFormButton = document.querySelector('.modal-window__delete-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const modalWindowAvatar = document.querySelector('.modal-window_edit-avatar');
const submitButtonAvatar = document.querySelector('.modal-window__submit-button-edit-avatar');
const submitButtonEditInfo = document.querySelector('.modal-window__submit-button-edit-info');
const submitButtonAddCard = document.querySelector('.modal-window__submit-button-add-card');

const formEdit = document.querySelector('.modal-window__form_edit');
const formAdd = document.querySelector('.modal-window__form_add');
const formAvatar = document.querySelector('.modal-window__form_edit-avatar');

const classValidationEdit = new FormValidator(object, formEdit);
classValidationEdit.enableValidation();

const classValidationAdd = new FormValidator(object, formAdd);
classValidationAdd.enableValidation();

const classValidationEditAvatar = new FormValidator(object, formAvatar);
classValidationEditAvatar.enableValidation();


const popupWithFormforAvatar = new PopupWithForm(modalWindowAvatar, EscButton, '.modal-window__submit-button', saveFormAvatar)
popupWithFormforAvatar.setEventListeners();

const popupWithFormforEdit = new PopupWithForm(modalWindowEdit, EscButton, '.modal-window__submit-button', saveFormEditData);
popupWithFormforEdit.setEventListeners();

const popupWithFormforAdd = new PopupWithForm(modalWindowAdd, EscButton, '.modal-window__submit-button', saveFormAddDataHandler);
popupWithFormforAdd.setEventListeners();

const popUpClassImg = new PopupWithImage(popUpPicture, EscButton);
popUpClassImg.setEventListeners();

const popUpWithFormForDelete = new PopupWithForm(modalWindowDelete, EscButton);
popUpWithFormForDelete.setEventListeners();

const classSection = new Section({
    renderer: (item) =>{
        const card = createCard(item);
        classSection.addItem(card, cards);
    },
}, cards);


const userInfoClass = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

const apiClass = new Api(token, addressCard, addressInfo);

//Проверка промисов для получения массива с карточками и информации профиля
Promise.all([apiClass.getCards(), apiClass.getProfileInfo()])
    .then(values => {
        classSection.addArray(values[0]);
        userInfoClass.setUserInfo(values[1].name, values[1].about);
        userInfoClass.setUserAvatar(values[1].avatar);
})
.catch((err) => {
    console.log(err); 
}); 
   
//Функция создания карточки
function createCard(item){
    const card = new Card(item, templateCard, initPopUpPicture, item.likes.length, openDeletePopUp, setLike, deleteLike);
    const cardElementClass = card.returnCardElement();
    return cardElementClass;
}

//Функция передачи значений из формы добавления карточек
function saveFormAddDataHandler(data){
    submitButtonAddCard.textContent = 'Сохранить...';
    const addSubmitButton = formAdd.querySelector('.modal-window__submit-button');
    const item = {
        name: data['place'],
        link: data['link'],
    }
    formPlace.value = "";
    formLink.value ="";
    apiClass.postCards(`${item.name}`, `${item.link}`)
        .then(res =>{
            const card = createCard(res);
            classSection.addItem(card, cards);
            addSubmitButton.setAttribute('disabled', 'disabled');
            addSubmitButton.classList.add('modal-window__submit-button_disabled');
            popupWithFormforAdd.close();
        })
        .catch((err) => {
            console.log(err); 
    }); 
}

//Функция сохранения данных из формы редактирования аватара
function saveFormAvatar(data){
    submitButtonAvatar.textContent = 'Сохранить...';
    apiClass.patchProfileAvatar(data.link)
        .then(res =>{
            userInfoClass.setUserAvatar(data.link);
            popupWithFormforAvatar.close();
            submitButtonAvatar.textContent = 'Сохранить';
        })
        .catch((err) => {
            console.log(err); 
    }); 
}

//Функция передачи значения из формы в профиль
function saveFormEditData(data){
    submitButtonEditInfo.textContent = 'Сохранить...';
    apiClass.patchProfileInfo(`${data.name}`, `${data.emloyment}`)
        .then(res =>{
            userInfoClass.setUserInfo(data.name, data.emloyment);
            popupWithFormforEdit.close();
            submitButtonEditInfo.textContent = 'Сохранить';
        })
        .catch((err) => {
            console.log(err); 
    }); 
}

//Инициализация окна pop-up с картинкой 
function initPopUpPicture(item){
    popUpClassImg.open(item);
}

//Функция постановки лайка
function setLike(id){
    apiClass.putLike(id);
}

//Функция удаления лайка
function deleteLike(id){
    apiClass.deleteLike(id);
}

//Открытие окна удаления карточки
function openDeletePopUp(id){
    popUpWithFormForDelete.open();
    deleteFormButton.addEventListener('click',() => {
        deleteCardFunctionForListener(id);
    });
}

const deleteCardFunctionForListener = function (id){
    deleteFormButton.textContent = 'Да...';
    apiClass.deleteCard(id)
    .then(result =>{
        if(result.ok){
            document.getElementById(id).remove();
            deleteRemoveCardListener();
            popUpWithFormForDelete.close();   
        }
    })
    .catch((err) => {
        console.log(err); 
    }); 
    deleteFormButton.textContent = 'Да'; 
}

//Функция удаления слушателя удаления карточки
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
apiClass.getProfileInfo()
    .then(result =>{
        userInfoClass.setUserInfo(result.name, result.about);
        userInfoClass.setUserAvatar(result.avatar);
})
    .catch((err) => {
        console.log(err); 
}); 





