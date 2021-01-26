export {Card};
class Card{
    constructor(item, template, initPopUpPicture, countLike, openDeletePopUp, setLike, deleteLike, userId){
        this._item = item;
        this._template = template;
        this._initPopUpPicture = initPopUpPicture; 
        this._countLike = countLike;
        this.openDeletePopUp = openDeletePopUp;
        this._setLike = setLike;
        this._deleteLike = deleteLike;
        this._userId = userId;
    }
    
    //Публичный метод возвращающий готовую карточку
    returnCardElement(userName){
        this._initCard(userName);
        return this._cardElement;
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
    _initCard(userName){
        this._cardElement = this._templateClone();
        this._buttonCardLike = this._cardElement.querySelector('.element__button-like');
        this._buttonCardDelete = this._cardElement.querySelector('.element__button-delete');
        this._addDeleteButton(this._item.owner._id);
        this._image = this._cardElement.querySelector('.element__image');
        this._cardElement.querySelector('.element__title').textContent = this._item.name;
        this._image.src = this._item.link;
        this._image.alt = this._item.name;
        this._counterLike = this._cardElement.querySelector('.element__counter-like');
        this._counterLike.textContent = this._countLike;
        this._setEventListeners(this._image, this._buttonCardLike);
        this._item.likes.forEach(like =>{
            if(like.name === userName){
                this._buttonCardLike.classList.add('element__button-like_active');
            }
        });
    }

    //Добавление кнопки удалить
    _addDeleteButton(id){
        this._cardElement.querySelector('.element').setAttribute('id',`${this._item._id}`);
        if(id!=`${this._userId}`){
            this._buttonCardDelete.remove()
        }
    }

    //Приватный метод установки слушателей
    _setEventListeners(buttonImg, buttonLike){
        buttonImg.addEventListener('click',() => this._initPopUpPicture(this._item));
        buttonLike.addEventListener('click', (evt) => this._likeCardHandler(buttonLike, evt.target.closest('.element').id));
        if(this._buttonCardDelete){
            this._buttonCardDelete.addEventListener('click',(evt)=> {
                this.openDeletePopUp(evt.target.closest('.element').id);
            });
        }
    }

    //Приватный метод лайка карточки
    _likeCardHandler(buttonLike, id){ 
        if(!buttonLike.classList.contains('element__button-like_active')){
            this._setLike(id, buttonLike, this._counterLike)
        }
        else{
            this._deleteLike(id, buttonLike, this._counterLike);
        }
    }
}

