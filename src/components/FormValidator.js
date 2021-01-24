export{FormValidator};

class FormValidator{
    constructor(data, form){
        this._data = data;
        this._form = form;
        this._inputList = Array.from(form.querySelectorAll(this._data.inputSelector));
        this._submitButton = this._form.querySelector(this._data.submitButtonSelector);
    }
    //Функция запускающая валидацию
    enableValidation(){
        this._setAddEventListeners(this._form);
    }
    //Функция добавляет слушаетели на все инпуты
    _setAddEventListeners(){
        this._inputList.forEach(input =>{
            input.addEventListener('input', (evt) => {
                this._validateInputs(evt, this._form);
            });
        });
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
          });
    }
    //Функция валидации инпутов на ошибки
    _validateInputs(evt){
        const errorElement = this._form.querySelector((`.${evt.target.classList[1]}`)).nextSibling;
        if(!evt.target.validity.valid){
            evt.target.classList.add(this._data.inputErrorClass);
            errorElement.classList.add(this._data.errorClass);
            errorElement.textContent = evt.target.validationMessage;
        }
        if(evt.target.validity.valid){
            evt.target.classList.remove(this._data.inputErrorClass);
            errorElement.classList.remove(this._data.errorClass);
            errorElement.textContent = "";
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
            this._submitButton.classList.remove(this._data.inactiveButtonClass);
            this._submitButton.removeAttribute("disabled");
        }
        else{
            this._submitButton.classList.add(this._data.inactiveButtonClass);
            this._submitButton.setAttribute("disabled", "disabled");
        }
    }
}
