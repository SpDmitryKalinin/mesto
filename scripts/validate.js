const object = ({
    formSelector: '.modal-window__form',
    inputSelector: '.modal-window__item',
    submitButtonSelector: '.modal-window__submit-button',
    inactiveButtonClass: 'modal-window__submit-button_disabled',
    inputErrorClass: 'modal-window__item_error',
    errorClass: 'modal-window__type-error_active' 
}); 

//Функция запускающая валидацию
enableValidation(object);
function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}){
    const forms = Array.from(document.querySelectorAll(formSelector));
    setAddEventListeners(forms, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass);
}

//Функция добавляет слушаетели на все инпуты
function setAddEventListeners(forms, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass){
    forms.forEach(form => {
        const inputList = Array.from(form.querySelectorAll(inputSelector));
        inputList.forEach(input =>{
            input.addEventListener('input', (evt) => {
                validateInputs(evt, form, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass);
            });
        });
    });
}

//Функция валидации инпутов на ошибки
function validateInputs(evt, form, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass){
    if(!evt.target.validity.valid){
        evt.target.classList.add(inputErrorClass);
        evt.target.nextElementSibling.classList.add(errorClass);
        evt.target.nextElementSibling.textContent = evt.target.validationMessage;
    }
    if(evt.target.validity.valid){
        evt.target.classList.remove(inputErrorClass);
        evt.target.nextElementSibling.classList.remove(errorClass);
        evt.target.nextElementSibling.textContent = "";
    }
    const check = validateForm(inputListThisForm = Array.from(form.querySelectorAll('.modal-window__item')));
    activeOrDisabledSubmit(check, form, submitButtonSelector, inactiveButtonClass);
}

//Функция валидации всей формы
function validateForm(inputListThisForm){
    const isValid = inputListThisForm.some((inputElement) => {
        return !inputElement.validity.valid;
    })
    return !isValid;
} 