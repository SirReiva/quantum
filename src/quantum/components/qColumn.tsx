import QuantumElement from '../core/quantumElement';
import { h } from '../core/h';

/*COLUMN*/
export default class qColumn extends QuantumElement {
    public static tagName = 'q-column';
    template() {
        return <slot></slot>;
    }

    styles() { return `
        :host {
            display: flex;
            flex-direction: column;
            position: reslative;
        }
        :host([reverse]) {
            flex-direction: column-reverse;
        }
        :host([mainAlign=start]) {
            align-items: start;
        }
        :host([mainAlign=end]) {
            align-items: end;
        }
        :host([corssAlign=start]) {
            justify-content: start;
        }
        :host([corssAlign=end]) {
            justify-content: end;
        }
    `; }

    constructor() {
        super(false);
    }
}