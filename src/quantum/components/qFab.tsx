import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*FAB*/
export default class qFab extends QuantumElement {
    public static tagName = 'q-fab';
    template() {
        return <slot></slot>;
    }

    styles() { return `
        :host {
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-shadow: 0 0 4px rgba(0, 0, 0, .14), 0 4px 8px rgba(0, 0, 0, .28);
            background: rgb(var(--q-material-primary-rgb));
            color: var(--app-font-color);
            z-index: 999;
            bottom: 10px;
            right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }
        ::slotted(q-toolbarbutton) {
            transform: scale(1.35);
        }
    `; }

    constructor() {
        super(false);
    }
}