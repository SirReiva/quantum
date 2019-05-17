import QuantumElement from './quantumElement.js';
import { h } from './quantumCore.js';

class mytag extends QuantumElement {
    template() {
        return h(
            'h1',
            null,
            ' item ',
            h(
                'span',
                null,
                this.props.num.toString()
            ),
            ' '
        );
    }
    constructor() {
        super({ num: 5 });
    }
}

customElements.define('my-tag', mytag);
