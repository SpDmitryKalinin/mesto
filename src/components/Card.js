export {Card};
import {openDeletePopUp} from '../pages/index.js';
class Card{
    constructor(item, template, initPopUpPicture, templateDeleteButton, countLike){
        this.item = item;
        this._template = template;
        this._initPopUpPicture = initPopUpPicture; 
        this._templateDeleteButton = templateDeleteButton;
        this._countLike = countLike;
    }
    
    //Публичный метод возвращающий готовую карточку
    returnCardElement(){
        this._initCard();
        return this.cardElement;
    }

    //Приватный метод копирования разметки темплейт элемента
    _templateClone(){
        return this._template.cloneNode(true);
    }

    //Приватный метод копирования разметки темплейт элемента кнопки
    _templateCloneButton(){
        return this._templateDeleteButton.cloneNode(true);
    }
    
    //Приватный метод инициализации карточек
    _initCard(){
        this.cardElement = this._templateClone();
        this._addDeleteButton(this.item.owner._id)
        this.buttonCardLike = this.cardElement.querySelector('.element__button-like');
        this.buttonCardDelete = this.cardElement.querySelector('.element__button-delete');
        this.image = this.cardElement.querySelector('.element__image');
        this.cardElement.querySelector('.element__title').textContent = this.item.name;
        this.image.src = this.item.link;
        this.image.alt = this.item.name;
        this.cardElement.querySelector('.element__counter-like').textContent = this._countLike;
        this._setEventListeners(this.image, this.buttonCardLike, this.buttonCardDelete);

    }

    //Добавление кнопки удалить
    _addDeleteButton(id){
        this.cardElement.querySelector('.element').setAttribute('id',`${this.item._id}`);
        if(id==='65b4995cafcff08912af118d'){
            this.cardElement.querySelector('.element').append(this._templateCloneButton());
        }
    }

    //Приватный метод установки слушателей
    _setEventListeners(buttonImg, buttonLike){
        buttonImg.addEventListener('click',() => this._initPopUpPicture(this.item));
        buttonLike.addEventListener('click', (evt) => this._likeCardHandler(buttonLike, evt.target.closest('.element').id));
        if(this.cardElement.querySelector('.element__button-delete')){
            this.cardElement.querySelector('.element__button-delete').addEventListener('click',(evt)=> {
                openDeletePopUp(evt.target.closest('.element').id);
            });
        }
    }

    //Приватный метод лайка карточки
    _likeCardHandler(buttonLike, id){
        buttonLike.classList.toggle('element__button-like_active');
        if(buttonLike.classList.contains('element__button-like_active')){
            fetch(`https://mesto.nomoreparties.co/v1/cohort-19/cards/likes/${id}`,{
                    method: 'PUT',
                    headers:{
                        authorization: `99cf486b-e575-4fd7-a9fa-cafa2239ffe6`
                    }
                });
                
        }
        else{
            fetch(`https://mesto.nomoreparties.co/v1/cohort-19/cards/likes/${id}`,{
                    method: 'DELETE',
                    headers:{
                        authorization: `99cf486b-e575-4fd7-a9fa-cafa2239ffe6`
                    }
                });
        }
    }

    //Приватный метод удаления карточек
    _deleteCardHandler(id){
        fetch(`https://mesto.nomoreparties.co/v1/cohort-19/cards/likes/${id}`,{
                    method: 'DELETE',
                    headers:{
                        authorization: `99cf486b-e575-4fd7-a9fa-cafa2239ffe6`
                    }
                });
        if(document.getElementById(id)){
            document.getElementById(id).remove();
        }
    }
}

