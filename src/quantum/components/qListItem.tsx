import QuantumElement from '../core/quantumElement';
import { h } from '../core/h';

/*LISTITEM*/
export default class qListItem extends QuantumElement {
    public static tagName = 'q-listitem';
    template() {
        return  <li><slot></slot></li>;
    }

    styles() { return `
        :host {
            display: block;
            width: 100%;
        }
        li {
            padding: 8px 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            min-height: 32px;
            font-family: "Roboto", "Segoe UI"; 
        }
        :host([hover]) li:hover {
            background-color: rgba(var(--q-material-primary-rgb), 0.3);
        }
        :host([border]) li {
            border-bottom: 1px solid #DEDEDE;
        }
        ::slotted(q-icon) {
            display: inline-flex;
        }
        ::slotted(q-textinput) {
            flex: 1;
        }
        ::slotted(q-checkbox) {
            flex: 1;
        }
        ::slotted(q-radiobutton) {
            flex: 1;
        }
        ::slotted(q-switch) {
            flex: 1;
        }
    `; }

    constructor() {
        super(false);
    }
}