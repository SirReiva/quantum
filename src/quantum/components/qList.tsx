import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*LIST*/
export default class qList extends QuantumElement {
    public static tagName = 'q-list';
    template() {
        return  <ul><slot></slot></ul>;
    }

    styles() { return `
        :host {
            display: block;
            width: 100%;
            contain: content;
        }
        ul {
            user-select: none;
            top: 0;
            left: 0;
            width: 100%;
            list-style: none;
            margin: 0;
            padding: 0;
            background-color: white;
        }
    `; }

    constructor() {
        super(false);
    }
}