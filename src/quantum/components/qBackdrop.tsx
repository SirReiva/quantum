import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*BACKDROP*/
export default class qBackdrop extends QuantumElement {
    public static tagName = 'q-backdrop';
    template() {
        return false;
    }

    styles() { return `
        :host {
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: block;
            position: absolute;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            contain: strict;
            cursor: pointer;
            opacity: .01;
            -ms-touch-action: none;
            touch-action: none;
        }
    `; }

    constructor() {
        super({});
    }
}