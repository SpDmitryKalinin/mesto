import{PopUp} from './PopUp.js';
export class PopupWithImage extends PopUp{
    constructor(popUpElement){
        super(popUpElement);
        this.popUpImg = this.popUpElement.querySelector('.modal-window__full-image');
    }
    open(item){
        this.popUpElement.querySelector('.modal-window__image-caption').textContent = item.name;
        this.popUpImg.src = item.link;
        this.popUpImg.alt = item.name;
        super.open();
    }
}