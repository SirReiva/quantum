import QuantumElement from './quantumElement.js';
import { h } from './quantumCore.js';

class mytag extends QuantumElement {
    static template(attrs, props) {
        console.log(attrs, props);
        return h(
            'h1',
            null,
            ' item ',
            h(
                'span',
                null,
                attrs.det.toString()
            ),
            ' ',
            h(
                'span',
                null,
                props.num.toString()
            ),
            ' '
        );
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
