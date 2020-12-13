import{PopUp} from './PopUp.js';
export class PopupWithForm extends PopUp{
    constructor(popUpElement, submitSelector, handleSubmitForm){
        super(popUpElement);
        super.submitButtonSelector = submitSelector;
        this.handleSubmitForm = handleSubmitForm;
        this._inputList = Array.from(this.popUpElement.querySelectorAll('.modal-window__item'));
        this._inputListForClose = Array.from(this.popUpElement.querySelectorAll('.modal-window__item'));
    }
    setEventListeners(){
        super.setEventListeners();
        this.popUpElement.addEventListener('submit', () => this.handleSubmitForm(this._getInputValues()));
    }
    _getInputValues(){
        let info = {};
        for(let i =0; i<this._inputList.length-1; i++){
            info[i] = this._inputList[i].value;
        }
        return info;
    }
    close(){
        this._inputListForClose.forEach(item =>{
          item.value = "";
        })
        super.close();
    }
}