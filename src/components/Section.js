export class Section{
    constructor({renderer}, contain){
        this._renderer = renderer;
        this.contain = contain;
    }
    //Инициализация массива
    addArray(items){
        items.forEach(item =>{
            this._renderer(item, this.contain);
        });
    }
    addItem(element, contain){
        contain.prepend(element);
    }
}