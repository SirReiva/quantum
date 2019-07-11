import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*SCAFOLD*/
export default class qScafold extends QuantumElement {
    template() {
        return <slot></slot>;
    }

    styles() { return `
        :host {
            position: relative;
            display: flex;
            flex-flow: column;
            height: 100%;
            width: 100%;
            top: 0px;
            left: 0px;
        }
    `; }

    constructor() {
        super({});
    }
}