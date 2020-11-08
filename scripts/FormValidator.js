export{FormValidator};

class FormValidator{
    constructor(data){
        this.data = data;
    }
    //Функция запускающая валидацию
    enableValidation(){
        const forms = Array.from(document.querySelectorAll(this.data.formSelector));
        this._setAddEventListeners(forms);
    }
    //Функция добавляет слушаетели на все инпуты
    _setAddEventListeners(forms){
        forms.forEach(form => {
            const inputList = Array.from(form.querySelectorAll(this.data.inputSelector));
            inputList.forEach(input =>{
                input.addEventListener('input', (evt) => {
                    this._validateInputs(evt, form);
                });
            });
        });
    }
    //Функция валидации инпутов на ошибки
    _validateInputs(evt, form){
        if(!evt.target.validity.valid){
            evt.target.classList.add(this.data.inputErrorClass);
            evt.target.nextElementSibling.classList.add(this.data.errorClass);
            evt.target.nextElementSibling.textContent = evt.target.validationMessage;
        }
        if(evt.target.validity.valid){
            evt.target.classList.remove(this.data.inputErrorClass);
            evt.target.nextElementSibling.classList.remove(this.data.errorClass);
            evt.target.nextElementSibling.textContent = "";
        }
        const inputListThisForm = Array.from(form.querySelectorAll('.modal-window__item'));
        const check = this._validateForm(inputListThisForm);
        this._activeOrDisabledSubmit(check, form);
    }
    
    //Функция валидации всей формы
    _validateForm(inputListThisForm){
        const isValid = inputListThisForm.some((inputElement) => {
            return !inputElement.validity.valid;
        })
        return !isValid;
    }
    //Функция включения и выключения кнопки сабмит
    _activeOrDisabledSubmit(check, form){
        const submitButton = form.querySelector(this.data.submitButtonSelector);
        if(check){
            submitButton.classList.remove(this.data.inactiveButtonClass);
            submitButton.removeAttribute("disabled");
        }
        else{
            submitButton.classList.add(this.data.inactiveButtonClass);
            submitButton.setAttribute("disabled", "disabled");
        }
    }
}
