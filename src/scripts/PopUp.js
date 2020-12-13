export class PopUp{
    constructor(popUpSelector){
        this.popUpSelector = popUpSelector;
    }
    open(){
        this.popUpSelector.classList.add('modal-window_is-open');
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }
    close(){
        this.popUpSelector.classList.remove('modal-window_is-open');
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    }
    _handleEscClose(evt){
        if(evt.keyCode === 27){
           this.close();
        }
        else{
            return 0;
        }
    }
    setEventListeners(){
        //Слушатели закрытия окон
        this.popUpSelector.querySelector('.modal-window__close-button').addEventListener('click',() => this.close());
    }
}