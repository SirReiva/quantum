import QuantumElement from './quantumElement.js';
import { h, defineQuantumElement } from './quantumCore.js';

class mytag extends QuantumElement {
    template() {
        return h(
            'h1',
            null,
            ' Input: ',
            h('input', { onChange: ev => {
                    this.changeVal(ev);
                }, type: 'number', min: '10', max: '100', value: this.props.data }),
            ' ',
            h(
                'h2',
                null,
                this.props.data
            ),
            ' '
        );
    }

    styles() {
        return `span{ color: red; }`;
    }

    changeVal(ev) {
        this.props.data = ev.target.value;
    }

    static get observedAttributes() {
        return ['det'];
    }

    constructor() {
        super({ data: 20 });
    }
}

defineQuantumElement('my-tag', mytag);
