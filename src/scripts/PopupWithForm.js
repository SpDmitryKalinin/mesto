import{PopUp} from './PopUp.js';
import{saveFormAddDataHandler,saveFormEditData} from './index.js';
export class PopupWithForm extends PopUp{
    constructor(popUpSelector, submitSelector){
        super(popUpSelector);
        super.submitButtonSelector = submitSelector;
    }
    setEventListeners(){
        super.setEventListeners();
        if(this.popUpSelector.classList.contains('modal-window_edit')){
            this.popUpSelector.addEventListener('submit', () => saveFormEditData(this._getInputValues()));
        }
        if(this.popUpSelector.classList.contains('modal-window_add')){
            this.popUpSelector.addEventListener('submit',() => saveFormAddDataHandler(this._getInputValues()));
        }
    }
    _getInputValues(){
        const inputList = Array.from(this.popUpSelector.querySelectorAll('.modal-window__item'));
        let info = {};
        for(let i =0; i<inputList.length-1; i++){
            info[i] = inputList[i].value;
        }
        return info;
    }
    _saveFormEditData(){
        const data = this._getInputValues();
        userInfoClass.setUserInfo(data[0], data[1]);
        this.close();
    }
    close(){
        const inputListForClose = Array.from(this.popUpSelector.querySelectorAll('.modal-window__item'));
        inputListForClose.forEach(item =>{
          item.value = "";
        })
        super.close();
    }
}