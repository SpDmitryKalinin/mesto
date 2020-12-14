export{FormValidator};

class FormValidator{
    constructor(data, form){
        this.data = data;
        this.form = form;
        this._inputList = Array.from(form.querySelectorAll(this.data.inputSelector));
        this._submitButton = this.form.querySelector(this.data.submitButtonSelector);
    }
    //Функция запускающая валидацию
    enableValidation(){
        this._setAddEventListeners(this.form);
    }
    //Функция добавляет слушаетели на все инпуты
    _setAddEventListeners(){
        this._inputList.forEach(input =>{
            input.addEventListener('input', (evt) => {
                this._validateInputs(evt, this.form);
            });
        });
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
          });
    }
    //Функция валидации инпутов на ошибки
    _validateInputs(evt){
        const ErrorElement = evt.target.closest('label').querySelector('.modal-window__type-error');
        if(!evt.target.validity.valid){
            evt.target.classList.add(this.data.inputErrorClass);
<<<<<<< HEAD:src/components/FormValidator.js
            ErrorElement.classList.add(this.data.errorClass);
            ErrorElement.textContent = evt.target.validationMessage;
        }
        if(evt.target.validity.valid){
            evt.target.classList.remove(this.data.inputErrorClass);
            ErrorElement.classList.remove(this.data.errorClass);
            ErrorElement.textContent = "";
=======
            evt.target.closest('label').querySelector('.modal-window__type-error').classList.add(this.data.errorClass);
            evt.target.closest('label').querySelector('.modal-window__type-error').textContent = evt.target.validationMessage;
        }
        if(evt.target.validity.valid){
            evt.target.classList.remove(this.data.inputErrorClass);
            evt.target.closest('label').querySelector('.modal-window__type-error').classList.remove(this.data.errorClass);
            evt.target.closest('label').querySelector('.modal-window__type-error').textContent = "";
>>>>>>> 42d44548c2d41892dec430b85ae0a482eb22b019:src/scripts/FormValidator.js
        }
        const check = this._validateForm();
        this._activeOrDisabledSubmit(check);
    }
    
    //Функция валидации всей формы
    _validateForm(){
        const isValid = this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
        return !isValid;
    }
    //Функция включения и выключения кнопки сабмит
    _activeOrDisabledSubmit(check){
        if(check){
            this._submitButton.classList.remove(this.data.inactiveButtonClass);
            this._submitButton.removeAttribute("disabled");
        }
        else{
            this._submitButton.classList.add(this.data.inactiveButtonClass);
            this._submitButton.setAttribute("disabled", "disabled");
        }
    }
}
