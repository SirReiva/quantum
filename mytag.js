import QuantumElement from './quantumElement.js';
import { h, defineQuantumElement } from './quantumCore.js';

class myitem extends QuantumElement {
    template() {
        return h(
            'li',
            null,
            this.attrs.data && h(
                'div',
                null,
                h('img', { src: this.attrs.data.thumbnailUrl }),
                h(
                    'label',
                    null,
                    this.attrs.data.title
                )
            )
        );
    }

    static get observedAttributes() {
        return ['data'];
    }

    connectedCallback() {}

    constructor() {
        super({});
    }

}

defineQuantumElement('my-item', myitem);

class mylist extends QuantumElement {
    template() {
        return h(
            'ul',
            null,
            this.props.items.map(item => h('my-item', { data: item }))
        );
    }

    styles() {
        return ``;
    }

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super({ items: [] });
        fetch('https://jsonplaceholder.typicode.com/photos').then(resp => resp.json()).then(data => {
            this.props.items = data.slice(4950);
            setInterval(() => {
                this.props.items[0].title = 'dsafdsfdas';
            }, 2500);
        });
    }
}

defineQuantumElement('my-list', mylist);
