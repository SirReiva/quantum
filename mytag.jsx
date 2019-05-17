import QuantumElement from './quantumElement.js';
import { h } from './quantumCore.js';

class mytag extends QuantumElement {
    template() {
        return <h1> item <span>{ this.props.num.toString() }</span> </h1>;
    }
    constructor() {
        super({ num: 5 });
    }
}

customElements.define('my-tag', mytag);