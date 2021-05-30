export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderer = renderer;
        //this._items = items;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.append(element);
    }

    addUserCard(element) {
        this._container.prepend(element);
    }

    deleteElement(element) {
        element.remove();
    }

}