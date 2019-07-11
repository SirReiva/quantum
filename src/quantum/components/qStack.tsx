import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*STACK*/
export default class qStack extends QuantumElement {
    template() {
        return <slot></slot>;
    }

    styles() { return `
        :host {
            position: absolute;
            display: flex;
            flex-flow: column;
            height: 100%;
            width: 100%;
        }
    `; }

    constructor() {
        super({});        
    }
}