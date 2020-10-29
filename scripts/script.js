const modalWindowEdit = document.querySelector('.modal-window_edit');
const modalWindowAdd = document.querySelector('.modal-window_add');
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
const overlay = document.querySelector('.modal-window__container-full-image');
const overlays = Array.from(document.querySelectorAll('.modal-window'));
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

//Инициализация массива
initialCards.forEach(item =>{
    cards.append(initCard(item));
});

//Функция клонирования template элемента
function templateElement(){
    return templateCard.cloneNode(true);
}

//Функция открытия окон и закрытия окон
function openAndCloseWindowHandler(thisWindow){
    thisWindow.classList.toggle('modal-window_is-open');
    document.removeEventListener('keydown', (evt) =>checkButton(evt, overlay));
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
    openAndCloseWindowHandler(modalWindowEdit);
}

//Функция передачи значений из формы добавления карточек
function saveFormAddDataHandler(evt){
    evt.preventDefault();
    const item = {
        name: formPlace.value,
        link: formLink.value
    };
    formPlace.value = "";
    formLink.value ="";
    cards.prepend(initCard(item));
    openAndCloseWindowHandler(modalWindowAdd);
}

//Функция инициализации карточек
function initCard(item){
    const card = templateElement();
    const buttonCardLike = card.querySelector('.element__button-like');
    const buttonCardDelete = card.querySelector('.element__button-delete');
    const cardImg = card.querySelector('.element__image');
    card.querySelector('.element__title').textContent = item.name;
    cardImg.src = item.link;
    cardImg.addEventListener('click',() => initPopUpPicture(item));
    buttonCardLike.addEventListener('click', () => likeCardHandler(buttonCardLike));
    buttonCardDelete.addEventListener('click',()=> deleteCardHandler(buttonCardDelete));
    return card;
}

//Инициализация модального окна с картинкой
function initPopUpPicture(item){
    popUpPictureCaption.textContent = item.name;
    popUpPictureImg.src = item.link;
    openAndCloseWindowHandler(popUpPicture);
}

//функция удаления карточек
function deleteCardHandler(buttonCardDelete){
    buttonCardDelete.closest('.element').remove();
}

//Функция лайк
function likeCardHandler(buttonCardLike){
    buttonCardLike.classList.toggle('element__button-like_active')
}

//Слушатели открытия окон
addButton.addEventListener('click', () => openAndCloseWindowHandler(modalWindowAdd));

//Слушатель открытия и заполнения инпутов
profileEdit.addEventListener('click', () =>{
    openAndCloseWindowHandler(modalWindowEdit);
    profileEditOpenHandler();
});

//Функция включения и выключения кнопки сабмит
function activeOrDisabledSubmit(check, form, submitButtonSelector, inactiveButtonClass){
    if(check){
        form.querySelector(submitButtonSelector).classList.remove(inactiveButtonClass);
        form.querySelector(submitButtonSelector).removeAttribute("disabled");
    }
    else{
        form.querySelector(submitButtonSelector).classList.add(inactiveButtonClass);
        form.querySelector(submitButtonSelector).setAttribute("disabled", "disabled");
    }
}

//Проверка слушателей
function checkButton(evt){
    thisWindows = document.querySelector('.modal-window_is-open');
    if(thisWindows === null){
        return 0;
    }
    if(evt.keyCode === 27){
        openAndCloseWindowHandler(thisWindows);
    }
}

//Создание слушателей закрытия окон по оверлею
overlays.forEach(overlay =>{
    overlay.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('modal-window')){
            openAndCloseWindowHandler(overlay);
        }
    });
});

//Слушатели закрытия окон
document.addEventListener('keydown', (evt) =>checkButton(evt));
modalWindowCloseEdit.addEventListener('click',() =>  openAndCloseWindowHandler(modalWindowEdit));
modalWindowCloseAdd.addEventListener('click', () => openAndCloseWindowHandler(modalWindowAdd));
popUpPictureCloseButton.addEventListener('click',() => openAndCloseWindowHandler(popUpPicture));
//Слушатели изменения профиля и добавления карточек
formEdit.addEventListener('submit', saveFormEditDataHandler);
formAdd.addEventListener('submit', saveFormAddDataHandler);