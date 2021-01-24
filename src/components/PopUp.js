export class PopUp{
    constructor(popUpElement, escButton){
        this._popUpElement = popUpElement;
        this._escHandle = this._handleEscClose.bind(this);
        this._escButton = escButton;
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
        if(evt.keyCode === this._escButton){
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
            if(evt.target === this.popUpElement) {
                this.close();
            }
        });
    }
}