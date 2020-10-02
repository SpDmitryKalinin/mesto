let modalWindow = document.querySelector('.modal-window');
let modalWindowClose = document.querySelector('.modal-window__close-button');
let profileEdit = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__title')
let profileEmployment = document.querySelector('.profile__subtitle');
let formProfileName = document.querySelector('.modal-window__name');
let formProfileEmployment = document.querySelector('.modal-window__employment');
let form = document.querySelector('.modal-window__form');

function openWindowHandler(){
    formProfileName.setAttribute('value', profileName.textContent);
    formProfileEmployment.setAttribute('value', profileEmployment.textContent);
    modalWindow.classList.add("modal-window_is-open");
    
}

function closeWindowHandler(){
    console.log(modalWindow.classList);
    modalWindow.classList.remove("modal-window_is-open");
}  

function formDataSaveHandler(evt){
    evt.preventDefault();
    profileName.textContent = formProfileName.value;
    profileEmployment.textContent = formProfileEmployment.value;
    closeWindowHandler();
}

profileEdit.addEventListener('click', openWindowHandler);
modalWindowClose.addEventListener('click', closeWindowHandler);
form.addEventListener('submit', formDataSaveHandler);





