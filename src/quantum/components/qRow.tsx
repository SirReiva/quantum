import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

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
        :host([mainAlign=start]) {
            justify-content: start;
        }
        :host([mainAlign=end]) {
            justify-content: end;
        }
        :host([corssAlign=start]) {
            align-items: start;
        }
        :host([corssAlign=end]) {
            align-items: end;
        }
    `; }

    constructor() {
        super({});
    }
}