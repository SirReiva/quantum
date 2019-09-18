import QuantumElement from '../quantum/core/quantumElement';
import { compileTemplateString, h } from '../quantum/core/h';

export default class appComp1 extends QuantumElement {
    public static tagName = 'app-comp1';
    template() {
        return compileTemplateString(require('./comp1.html'), this);
    }

    styles() { return `:host{padding: 20px; display: block;}`; }

    constructor() {
        super({title: 'zas', style: 'color: gray;'});
    }
}