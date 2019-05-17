import QuantumElement from './quantumElement.js';
import { h } from './quantumCore.js';

class mytag extends QuantumElement {
    static template(attrs, props) {
        return <h1> item <span>{ attrs.det.toString() }</span> <span>{ props.num.toString() }</span> </h1>;
    }

    static get observedAttributes() {
        return ['det'];
    }

    constructor() {
        super({ num: 5 });
        setInterval(() => {
            this.props.num++;
        }, 2500);
    }
}

customElements.define('my-tag', mytag);