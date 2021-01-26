export class Section{
    constructor({renderer}, contain, userName){
        this._renderer = renderer;
        this.contain = contain;
        this.userName = userName;
    }
    //Инициализация массива
    addArray(items, userName, userId){
        items.forEach(item =>{
            this._renderer(item, userName, userId, this.contain);
        });
    }
    addItem(element, contain){
        contain.prepend(element);
    }
}