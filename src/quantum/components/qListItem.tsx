import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*LISTITEM*/
export default class qListItem extends QuantumElement {
    public static tagName = 'q-listitem';
    template() {
        return  <button className="item-native">
                    <slot name="start"></slot>
                    <div className="item-inner">
                        <div className="input-wrapper"><slot></slot></div>
                    </div>
                    <slot name="end"></slot>
                </button>;
    }

    styles() { return `
        :host {
            display: block;
            width; 100%;
        }
        .item-native {
            width: 100%;
        }
        .item-inner {
        }
        .input-wrapper {
        }
    `; }

    constructor() {
        super({ items: []});
    }
}