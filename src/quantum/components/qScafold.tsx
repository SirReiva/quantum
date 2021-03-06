import QuantumElement from '../core/quantumElement';
import { h } from '../core/h';

/*SCAFOLD*/
export default class qScafold extends QuantumElement {
    public static tagName = 'q-scafold';
    static readonly encapsulation = false;
    automaticDetection = false;
    template() {
        return null;
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