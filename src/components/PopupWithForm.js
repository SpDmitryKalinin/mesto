import{PopUp} from './PopUp.js';
export class PopupWithForm extends PopUp{
    constructor(popUpElement, submitSelector, handleSubmitForm){
        super(popUpElement);
        super.submitButtonSelector = submitSelector;
        this.handleSubmitForm = handleSubmitForm;
        this._inputList = Array.from(this._popUpElement.querySelectorAll('.modal-window__item'));
    }
    setEventListeners(){
        super.setEventListeners();
        this._popUpElement.addEventListener('submit', () => this.handleSubmitForm(this._getInputValues()));
    }
    _getInputValues() {
        const info = {};
        this._inputList.forEach((input) => {
            if(input.getAttribute('name')!=null){
                info[input.getAttribute('name')] = input.value;
            }
        });
        return info;
      } 
    close(){
        this._inputList.forEach(item =>{
          item.value = "";
        })
        super.close();
    }
}