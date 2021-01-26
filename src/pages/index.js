import '../pages/index.css';

import{Card} from './../components/Card.js';
import{FormValidator} from './../components/FormValidator.js';
import{Section} from './../components/Section.js';
import{PopupWithImage} from './../components/PopupWithImage.js';
import{PopupWithForm} from './../components/PopupWithForm.js';
import{UserInfo} from './../components/UserInfo.js';
import{Api} from './../components/Api.js';
import{addressInfo, addressCard, token, object, modalWindowEdit, modalWindowAdd, modalWindowDelete, modalWindowAvatar, submitButtonAvatar, submitButtonEditInfo, submitButtonAddCard, profileEdit, formPlace, formLink, formEdit, formAdd, formAvatar, addButton, cards, templateCard, popUpPicture, formProfileName, formProfileEmployment, deleteFormButton, avatarEditButton} from './../utils/constants.js';

const classValidationEdit = new FormValidator(object, formEdit);
classValidationEdit.enableValidation();

const classValidationAdd = new FormValidator(object, formAdd);
classValidationAdd.enableValidation();

const classValidationEditAvatar = new FormValidator(object, formAvatar);
classValidationEditAvatar.enableValidation();

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

const classSection = new Section({
    renderer: (item, userName, userId) =>{
        const card = createCard(item, userName, userId);
        classSection.addItem(card, cards);
    },
},cards);


const userInfoClass = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

const apiClass = new Api(token, addressCard, addressInfo);

//Проверка промисов для получения массива с карточками и информации профиля
Promise.all([apiClass.getCards(), apiClass.getProfileInfo()])
    .then(values => {
        classSection.addArray(values[0].reverse(), values[1].name, values[1]._id);
        userInfoClass.setUserInfo(values[1].name, values[1].about);
        userInfoClass.setUserAvatar(values[1].avatar);
    })
    .catch((err) => {
        console.log(err); 
});

//Функция создания карточки
function createCard(item, userName, userId){
    const card = new Card(item, templateCard, initPopUpPicture, item.likes.length, openDeletePopUp, setLike, deleteLike, userId);
    const cardElementClass = card.returnCardElement(userName);
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
            const card = createCard(res, res.owner.name, res.owner._id);
            classSection.addItem(card, cards);
            addSubmitButton.setAttribute('disabled', 'disabled');
            addSubmitButton.classList.add('modal-window__submit-button_disabled');
            popupWithFormforAdd.close();
        })
        .catch((err) => {
            console.log(err); 
        })
        .finally(() =>{
            submitButtonAddCard.textContent = 'Сохранить';
        }) 
}

//Функция сохранения данных из формы редактирования аватара
function saveFormAvatar(data){
    submitButtonAvatar.textContent = 'Сохранить...';
    apiClass.patchProfileAvatar(data.link)
        .then(() =>{
            userInfoClass.setUserAvatar(data.link);
            popupWithFormforAvatar.close();
        })
        .catch((err) => {
            console.log(err); 
        })
        .finally(() =>{
            submitButtonAvatar.textContent = 'Сохранить';
    }); 
}

//Функция передачи значения из формы в профиль
function saveFormEditData(data){
    submitButtonEditInfo.textContent = 'Сохранить...';
    apiClass.patchProfileInfo(`${data.name}`, `${data.emloyment}`)
        .then(() =>{
            userInfoClass.setUserInfo(data.name, data.emloyment);
            popupWithFormforEdit.close();
        })
        .catch((err) => {
            console.log(err); 
        })
        .finally(() =>{
            submitButtonEditInfo.textContent = 'Сохранить';
    });
}

//Инициализация окна pop-up с картинкой 
function initPopUpPicture(item){
    popUpClassImg.open(item);
}

//Функция постановки лайка
function setLike(id, likeButton, likeCounter){
    apiClass.putLike(id)
        .then(() =>{
            likeButton.classList.add('element__button-like_active');
            likeCounter.textContent = Number(likeCounter.textContent) + 1;
        })
        .catch((err) => {
            console.log(err); 
    });
}

//Функция удаления лайка
function deleteLike(id, likeButton, likeCounter){
    apiClass.deleteLike(id)
        .then(() =>{
            likeButton.classList.remove('element__button-like_active');
            likeCounter.textContent = Number(likeCounter.textContent) - 1;
        })
    .catch((err) => {
        console.log(err); 
    });
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
    .then(() =>{{
            document.getElementById(id).remove();
            deleteRemoveCardListener();
            popUpWithFormForDelete.close();   
        }
    })
    .catch((err) => {
        console.log(err); 
    })
    .finally(()=>{
        deleteFormButton.textContent = 'Да'; 
    });
}

//Функция удаления слушателя удаления карточки
function deleteRemoveCardListener(){
    deleteFormButton.removeEventListener('click', deleteCardFunctionForListener);
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