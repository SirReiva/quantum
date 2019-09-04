import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*APP*/
export default class qApp extends QuantumElement {
    public static tagName = 'q-app';
    template() {
        return null;
    }

    static readonly encapsulation = false;

    styles() { return `
        :host {
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            position: absolute;
            flex-direction: column;
            justify-content: space-between;
            contain: layout size style;
            overflow: hidden;
            z-index: 0;
        }`; 
    }

    constructor() {
        super(false);        
    }
}