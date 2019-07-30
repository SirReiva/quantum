import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*VIRTUAL LIST*/
export default class qVirtualList extends QuantumElement {
    public static tagName = 'q-virtuallist';
    template() {
        return  <div className="vBase">
                    { this.attrs.items.map((item: any, index: number) => {
                        return this.objectAttrs.renderitem(item, index);
                    })}
                </div>;
    }

    styles() { return `
        :host {
            width: 100%;
        }
        .vBase {
            flex-direction: column;
            width: 100%;
            position: relative;
            height: 500px;
            overflow-y: auto;
            overflow-x: visible;
            display: flex;
            padding-left: 5px;
            padding-right: 5px;
            box-sizing: border-box;
        }
    `; }

    static get observedAttributes() {
        return ['items', 'renderitem'];
    }

    constructor() {
        super({});
    }
}