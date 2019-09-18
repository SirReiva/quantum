import QuantumElement from '../core/quantumElement';
import { h } from '../core/h';

/*ROW*/
export default class qRow extends QuantumElement {
    public static tagName = 'q-row';
    template() {
        return <slot></slot>;
    }

    styles() { return `
        :host {
            display: flex;
            flex-direction: row;
            width: 100%;
            position: relative;
        }
        :host([reverse]) {
            flex-direction: row-reverse;
        }
        :host([data-mainAlign]) {
            justify-content: attr(data-mainAlign);
        }
        :host([data-corssAlign]) {
            align-items: attr(data-corssAlign);
        }
    `; }

    constructor() {
        super(false);
    }
}