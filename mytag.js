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
                h('img', { src: "https://picsum.photos/200/300?random" + Math.floor(Math.random() * 10) }),
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
        super({ items: [{
                title: '0'
            }, {
                title: '1'
            }, {
                title: '2'
            }, {
                title: '3'
            }, {
                title: '2'
            }, {
                title: '1'
            }, {
                title: '2'
            }, {
                title: '3'
            }, {
                title: '2'
            }, {
                title: '1'
            }, {
                title: '2'
            }, {
                title: '3'
            }, {
                title: '2'
            }, {
                title: '5'
            }] });
        setInterval(() => {
            for (let i = 0; i < this.props.items.length; i++) this.props.items[i].title = Math.floor(Math.random() * 100).toString();
        }, 2500);
    }
}

defineQuantumElement('my-list', mylist);
