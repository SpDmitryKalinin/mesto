export {Card};
class Card{
    constructor(item, template, initPopUpPicture, countLike, openDeletePopUp, setLike, deleteLike,){
        this._item = item;
        this._template = template;
        this._initPopUpPicture = initPopUpPicture; 
        this._countLike = countLike;
        this.openDeletePopUp = openDeletePopUp;
        this._setLike = setLike;
        this._deleteLike = deleteLike;
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
        this._addDeleteButton(this._item.owner._id)
        this.buttonCardLike = this.cardElement.querySelector('.element__button-like');
        this.buttonCardDelete = this.cardElement.querySelector('.element__button-delete');
        this.image = this.cardElement.querySelector('.element__image');
        this.cardElement.querySelector('.element__title').textContent = this._item.name;
        this.image.src = this._item.link;
        this.image.alt = this._item.name;
        this.counterLike = this.cardElement.querySelector('.element__counter-like');
        this.counterLike.textContent = this._countLike;
        this._setEventListeners(this.image, this.buttonCardLike, this.buttonCardDelete, this.counterLike);
    }

    //Добавление кнопки удалить
    _addDeleteButton(id){
        this.cardElement.querySelector('.element').setAttribute('id',`${this._item._id}`);
        if(id!='65b4995cafcff08912af118d'){
            this.cardElement.querySelector('.element__button-delete').remove()
        }
    }

    //Приватный метод установки слушателей
    _setEventListeners(buttonImg, buttonLike){
        buttonImg.addEventListener('click',() => this._initPopUpPicture(this._item));
        buttonLike.addEventListener('click', (evt) => this._likeCardHandler(buttonLike, evt.target.closest('.element').id));
        if(this.cardElement.querySelector('.element__button-delete')){
            this.cardElement.querySelector('.element__button-delete').addEventListener('click',(evt)=> {
                this.openDeletePopUp(evt.target.closest('.element').id);
            });
        }
    }

    //Приватный метод лайка карточки
    _likeCardHandler(buttonLike, id){
        buttonLike.classList.toggle('element__button-like_active');
        if(buttonLike.classList.contains('element__button-like_active')){
            this._setLike(id);
            this.counterLike.textContent = this._countLike + 1;
        }
        else{
            this._deleteLike(id);
            this.counterLike.textContent = this._countLike;
        }
    }
}

