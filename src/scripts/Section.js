export class Section{
    constructor({items, renderer}, containSelector){
        this.items = items;
        this.renderer = renderer;
        this.containSelector = containSelector;
    }
    //Инициализация массива
    addArray(){
        this.items.forEach(item =>{
            this.renderer(item, this.containSelector);
        });
    }
    addItem(element){
        this.containSelector.prepend(element);
    }
}