import QuantumElement from './quantumElement.js';
import { h } from './quantumCore.js';

class mytag extends QuantumElement {
    static template(attrs, props) {
        return h(
            'h1',
            null,
            ' item ',
            h(
                'span',
                null,
                attrs.det.toString()
            ),
            ' '
        );
    }

    static get observedAttributes() {
        return ['det'];
    }

    constructor() {
        super({ num: 5 });
    }
}

customElements.define('my-tag', mytag);
