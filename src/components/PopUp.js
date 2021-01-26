import{escButton} from './../utils/constants.js';

export class PopUp{
    constructor(popUpElement){
        this._popUpElement = popUpElement;
        this._escHandle = this._handleEscClose.bind(this);
    }
    open(){
        this._popUpElement.classList.add('modal-window_is-open');
        document.addEventListener('keydown', this._escHandle);
    }
    close(){
        this._popUpElement.classList.remove('modal-window_is-open');
        document.removeEventListener('keydown', this._escHandle);
    }
    _handleEscClose(evt){
        if(evt.keyCode === escButton){
           this.close();
        }
        else{
            return 0;
        }
    }
    setEventListeners(){
        //Слушатели закрытия окон
        this._popUpElement.querySelector('.modal-window__close-button').addEventListener('click',() => this.close());
        this._popUpElement.addEventListener('click', (evt) => {
            if(evt.target === this._popUpElement){
                this.close();
            }
        });
    }
}