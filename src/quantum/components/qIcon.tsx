import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*ICON
atributes: icon: string
*/
export default class qIcon extends QuantumElement {
    template() {
        return  <div>
                    <link rel="stylesheet" href="./static/font-awesome.css"></link>
                    <i className={`fa fa-${this.attrs.icon} large`}></i>
                </div>;
    }

    static get observedAttributes() {
        return ['icon'];
    }

    styles() { return `
        :host {
            height: 32px;
            width: 32px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            align-self: center;
        }
        .xsmall {
            font-size: 70%;
        }
        
        .small {
            font-size: 85%;
        }
        
        .large {
            font-size: 140%;
        }
        
        .xlarge {
            font-size: 170%;
        }
    `; }

    constructor() {
        super({});
    }
}