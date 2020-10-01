let ModalWindow;
let ModalWindowClose;
let ProfileEdit;
let ProfileName;
let ProfileEmployment;
let FormProfileName;
let FormProfileEmployment;
let FormSave;
let Overlay;

ModalWindow = document.querySelector('.modal_window');
ModalWindowClose = document.querySelector('.modal_window__close_button');
ProfileEdit = document.querySelector('.profile__edit_button');
ProfileName = document.querySelector('.profile__title')
ProfileEmployment = document.querySelector('.profile__subtitle');
FormProfileName = document.querySelector('.modal_window__name');
FormProfileEmployment = document.querySelector('.modal_window__employment');
FormSave = document.querySelector('.modal_window__submit_button');
Overlay = document.querySelector('.overlay');

ProfileEdit.addEventListener('click', OpenWindow);
ModalWindowClose.addEventListener('click', CloseWindow);
FormSave.addEventListener('click', DataSave);

function OpenWindow(){
    FormProfileName.value = "";
    FormProfileEmployment.value ="";
    ModalWindow.classList.add('modal_window_is_open');
    Overlay.setAttribute("style", 'display:block');
    FormProfileName.setAttribute('placeholder', ProfileName.textContent);
    FormProfileEmployment.setAttribute('placeholder', ProfileEmployment.textContent);

}
function CloseWindow(){
    console.log(ModalWindow.classList);
    Overlay.setAttribute("style", 'display:none');
    ModalWindow.classList.remove('modal_window_is_open');
}

function DataSave(){
    ProfileName.textContent = FormProfileName.value;
    ProfileEmployment.textContent = FormProfileEmployment.value;
    CloseWindow();
}


