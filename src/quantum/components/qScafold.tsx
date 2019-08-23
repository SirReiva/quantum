import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*SCAFOLD*/
export default class qScafold extends QuantumElement {
    public static tagName = 'q-scafold';
    static readonly encapsulation = false;
    template() {
        return <slot></slot>;
    }

    styles() { return `
        q-scafold {
            position: relative;
            display: flex;
            flex-flow: column;
            height: 100%;
            width: 100%;
            background-color: white;
            top: 0px;
            left: 0px;
        }
    `; }

    constructor() {
        super(false);
    }
}