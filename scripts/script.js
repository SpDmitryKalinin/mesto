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
const popUpPicture = document.querySelector('.modal-window_image');
const popUpPictureImg = document.querySelector('.modal-window__full-image');
const popUpPictureCaption = document.querySelector('.modal-window__image-caption');
const popUpPictureCloseButton = document.querySelector('.modal-window__close-button_image');
const profileName = document.querySelector('.profile__title')
const profileEmployment = document.querySelector('.profile__subtitle');
const formProfileName = document.querySelector('.modal-window__name');
const formProfileEmployment = document.querySelector('.modal-window__employment');
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
    card.querySelector('.element__title').textContent = item.name;
    card.querySelector('.element__image').src = item.link;
    cards.append(card);
});

//Функция открытия окон  
function openWindowHandler(evt){
    if(evt.target.openParameter===undefined){
        return false;
    }
    else{
        evt.target.openParameter.classList.add("modal-window_is-open");
    }
}

//Функция закрытия модальных окон
function closeModalWindow(evt){
    evt.target.closest('.modal-window').classList.remove('modal-window_is-open');
}

//Функция заполнения инпутов при открытии окна
function profileEditOpenHandler(){
    formProfileName.value = profileName.textContent;
    formProfileEmployment.value = profileEmployment.textContent;
}

//Функция сохранения данных в профиль
function saveFormEditDataHandler(evt){
    evt.preventDefault();
    profileName.textContent = formProfileName.value;
    profileEmployment.textContent = formProfileEmployment.value;
    closeModalWindow(evt);
}

//Функция добавления карточек
function saveFormAddDataHandler(evt){
    evt.preventDefault();
    const card = templateCard.cloneNode(true);
    card.querySelector('.element__title').textContent = formPlace.value;
    card.querySelector('.element__image').src = formLink.value;
    cards.prepend(card);
    formPlace.value = "";
    formLink.value ="";
    initialParametersCard();
    closeModalWindow(evt);
}

//функция удаления карточек
function deleteCardHandler(evt){
    const target = evt.target;
    if(target.classList.contains('element__button-delete')){
        target.closest('.elements').removeChild(target.parentElement);
    }
}

//Функция лайк
function likeCardHandler(evt){
    const target = evt.target;
    if(target.classList.contains('element__button-like')){
        target.classList.toggle('element__button-like_active');
    }
}

//Функция инициализация данных картинки и подписи к картинкам
function viewCardHandler(evt){
    if(evt.target.classList.contains('element__image')){
        popUpPictureImg.src = evt.target.src;
        popUpPictureCaption.textContent = evt.target.nextElementSibling.querySelector('.element__title').textContent;
    }
}

//Функция инициализации параметров для картинок
function initialParametersCard(){
    cards.querySelectorAll('.element__image').forEach(item =>{
        item.openParameter = popUpPicture;
    });
}

//Инициализация параметров для открытия модальных окон
profileEdit.openParameter = modalWindowEdit;
addButton.openParameter = modalWindowAdd;
initialParametersCard();

//Слушатели открытия окон
addButton.addEventListener('click', openWindowHandler);
profileEdit.addEventListener('click', openWindowHandler);
cards.addEventListener('click', openWindowHandler);
//Слушатели закрытия окон
popUpPictureCloseButton.addEventListener('click', closeModalWindow);
modalWindowCloseEdit.addEventListener('click', closeModalWindow);
modalWindowCloseAdd.addEventListener('click', closeModalWindow);

//Слушатель инициализации инпутов
profileEdit.addEventListener('click', profileEditOpenHandler);


//Слушатели изменения профиля и добавления карточек
formEdit.addEventListener('submit', saveFormEditDataHandler);
formAdd.addEventListener('submit', saveFormAddDataHandler);

//Слушатель удаления карточки
cards.addEventListener('click', deleteCardHandler);

//Слушатель лайк
cards.addEventListener('click', likeCardHandler);

//Слушатель открытия карточки
cards.addEventListener('click', viewCardHandler);