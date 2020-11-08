import{Card} from './Card.js';
import{FormValidator} from './FormValidator.js';
export{popUpPictureCaption, popUpPictureImg, popUpPicture, toggleModal};
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
const profileName = document.querySelector('.profile__title');
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

const object = ({
    formSelector: '.modal-window__form',
    inputSelector: '.modal-window__item',
    submitButtonSelector: '.modal-window__submit-button',
    inactiveButtonClass: 'modal-window__submit-button_disabled',
    inputErrorClass: 'modal-window__item_error',
    errorClass: 'modal-window__type-error_active' 
}); 

const classValidation = new FormValidator(object);
const enableclassValidation = classValidation.enableValidation();

//Инициализация массива
initialCards.forEach(item =>{
    const card = new Card(item, templateCard);
    const cardElementClass = card.returnCardElement();
    cards.prepend(cardElementClass);
});

//Функция открытия окон и закрытия окон
function toggleModal(thisWindow){
    thisWindow.classList.toggle('modal-window_is-open');
    if(thisWindow.classList.contains('modal-window_is-open')){
        document.addEventListener('keydown', checkButton);
    }
    else{
        document.removeEventListener('keydown', checkButton);
    }
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
    toggleModal(modalWindowEdit);
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
    const card = new Card(item, templateCard);
    const cardElementClass = card.returnCardElement();
    cards.prepend(cardElementClass);
    const addSubmitButton = formAdd.querySelector('.modal-window__submit-button')
    addSubmitButton.setAttribute('disabled', 'disabled');
    addSubmitButton.classList.add('modal-window__submit-button_disabled');
    toggleModal(modalWindowAdd);
}

//Слушатели открытия окон
addButton.addEventListener('click', () => toggleModal(modalWindowAdd));

//Слушатель открытия и заполнения инпутов
profileEdit.addEventListener('click', () =>{
    toggleModal(modalWindowEdit);
    profileEditOpenHandler();
});

//Проверка слушателей
function checkButton(evt){
    const activeWindows = document.querySelector('.modal-window_is-open');
    if(activeWindows === null){
        return 0;
    }
    if(evt.keyCode === 27){
        toggleModal(activeWindows);
    }
}

//Создание слушателей закрытия окон по оверлею
overlays.forEach(overlay =>{
    overlay.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('modal-window')){
            toggleModal(overlay);
        }
    });
});

//Слушатели закрытия окон
modalWindowCloseEdit.addEventListener('click',() =>  toggleModal(modalWindowEdit));
modalWindowCloseAdd.addEventListener('click', () => toggleModal(modalWindowAdd));
popUpPictureCloseButton.addEventListener('click',() => toggleModal(popUpPicture));
//Слушатели изменения профиля и добавления карточек
formEdit.addEventListener('submit', saveFormEditDataHandler);
formAdd.addEventListener('submit', saveFormAddDataHandler);

