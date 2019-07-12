import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*AVATAR*/
export default class qAvatar extends QuantumElement {
    public static tagName = 'q-avatar';
    template() {
        return <figure style={'background-image: url(' + this.attrs.src + ')'}></figure>;
    }

    static get observedAttributes() {
        return ['src'];
    }

    styles() { return `
        :host {
            display: block;
            width: 40px;
            height: 40px;
            float: left;
            padding-right: 16px;
        }
        figure {
            width: 100%;
            height: 100%;
            background-color: #dddddd;
            background-size: cover;
            margin: 0;
            padding: 0;
            border-radius: 50%;
        }
    `; }

    constructor() {
        super({});        
    }
}