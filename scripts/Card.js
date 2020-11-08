export {Card};
import {popUpPictureCaption, popUpPictureImg, popUpPicture, toggleModal} from './index.js';

class Card{
    constructor(item, templateSelector){
        this.item = item;
        this.tmp = templateSelector; 
    }
    
    //Публичный метод возвращающий готовую карточку
    returnCardElement(){
        this._initCard();
        return this.cardElement;
    }

    //Приватный метод копирования разметки темплейт элемента
    _templateClone(){
        return this.tmp.cloneNode(true);
    }

    //Приватный метод инициализации карточек
    _initCard(){
        this.cardElement = this._templateClone();
        this.buttonCardLike = this.cardElement.querySelector('.element__button-like');
        this.buttonCardDelete = this.cardElement.querySelector('.element__button-delete');
        this.image = this.cardElement.querySelector('.element__image');
        this.cardElement.querySelector('.element__title').textContent = this.item.name;
        this.image.src = this.item.link;
        this.image.alt = this.item.name;
        this._setEventListeners(this.image, this.buttonCardLike, this.buttonCardDelete);
    }

    //Приватный метод установки слушателей
    _setEventListeners(buttonImg, buttonLike, buttonDelete){
        buttonImg.addEventListener('click',() => this._initPopUpPicture(this.item));
        buttonLike.addEventListener('click', () => this._likeCardHandler(buttonLike));
        buttonDelete.addEventListener('click',()=> this._deleteCardHandler(buttonDelete));
    }

    //Приватный метод инициализации попапа с картинкой
    _initPopUpPicture(item){
        popUpPictureCaption.textContent = item.name;
        popUpPictureImg.src = item.link;
        popUpPictureImg.alt = item.name;
        toggleModal(popUpPicture);
    }

    //Приватный метод лайка карточки
    _likeCardHandler(buttonLike){
        buttonLike.classList.toggle('element__button-like_active');
    }

    //Приватный метод удаления карточек
    _deleteCardHandler(buttonDelete){
        buttonDelete.closest('.element').remove();
    }
}

