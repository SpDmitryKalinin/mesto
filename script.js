let modalWindow;
let modalWindowClose;
let profileEdit;
let profileName;
let profileEmployment;
let formProfileName;
let formProfileEmployment;
let formSave;
let overlay;

modalWindow = document.querySelector('.modal_window');
modalWindowClose = document.querySelector('.modal_window__close_button');
profileEdit = document.querySelector('.profile__edit_button');
profileName = document.querySelector('.profile__title')
profileEmployment = document.querySelector('.profile__subtitle');
formProfileName = document.querySelector('.modal_window__name');
formProfileEmployment = document.querySelector('.modal_window__employment');
formSave = document.querySelector('.modal_window__submit_button');
overlay = document.querySelector('.overlay');

function openWindowHandler(){
    formProfileName.value = "";
    formProfileEmployment.value ="";
    modalWindow.setAttribute("style", 'display:block');
    overlay.setAttribute("style", 'display:block');
    formProfileName.setAttribute('placeholder', profileName.textContent);
    formProfileEmployment.setAttribute('placeholder', profileEmployment.textContent);
}

function closeWindowHandler(){
    console.log(modalWindow.classList);
    modalWindow.setAttribute("style", 'display:none');
    overlay.setAttribute("style", 'display:none');
}  

function formDataSaveHandler(){
    profileName.textContent = formProfileName.value;
    profileEmployment.textContent = formProfileEmployment.value;
    closeWindowHandler();
}

profileEdit.addEventListener('click', openWindowHandler);
modalWindowClose.addEventListener('click', closeWindowHandler);
formSave.addEventListener('click', formDataSaveHandler);




