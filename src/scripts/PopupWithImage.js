import{PopUp} from './PopUp.js';
export class PopupWithImage extends PopUp{
    open(item){
        const popUpImg = this.popUpSelector.querySelector('.modal-window__full-image');
        this.popUpSelector.querySelector('.modal-window__image-caption').textContent = item.name;
        popUpImg.src = item.link;
        popUpImg.alt = item.name;
        super.open();
    }
}