import{PopUp} from './PopUp.js';
export class PopupWithImage extends PopUp{
    constructor(popUpElement, escButton){
        super(popUpElement, escButton);
        this.popUpImg = this._popUpElement.querySelector('.modal-window__full-image');
        this.popUpcaption = this._popUpElement.querySelector('.modal-window__image-caption');
    }
    open(item){
        this.popUpcaption.textContent = item.name;
        this.popUpImg.src = item.link;
        this.popUpImg.alt = item.name;
        super.open();
    }
}