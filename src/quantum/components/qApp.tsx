import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*APP*/
export default class qApp extends QuantumElement {
    public static tagName = 'q-app';
    template() {
        return <slot></slot>;
    }

    styles() { return `
        :host {
            width: 100%;
            padding-top: env(safe-area-inset-top);
            height: calc(100% - env(safe-area-inset-top));
            display: inline-block;
        }`; 
    }

    constructor() {
        super({});        
    }
}