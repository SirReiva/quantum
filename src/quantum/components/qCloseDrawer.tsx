import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*ROW*/
export default class qRow extends QuantumElement {
    public static tagName = 'q-closedrawer';
    template() {
        return <slot></slot>;
    }

    styles() { return `
        :host { }
    `; }

    constructor() {
        super(false);
    }
}