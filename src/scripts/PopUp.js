export class PopUp{
    constructor(popUpElement){
        this.popUpElement = popUpElement;
        this.EscHandle = this._handleEscClose.bind(this);
    }
    open(){
        this.popUpElement.classList.add('modal-window_is-open');
        document.addEventListener('keydown', this.EscHandle);
    }
    close(){
        this.popUpElement.classList.remove('modal-window_is-open');
        document.removeEventListener('keydown', this.EscHandle);
    }
    _handleEscClose(evt){
        const escButton = 27;
        if(evt.keyCode === escButton){
           this.close();
        }
        else{
            return 0;
        }
    }
    setEventListeners(){
        //Слушатели закрытия окон
        this.popUpElement.querySelector('.modal-window__close-button').addEventListener('click',() => this.close());
    }
}