import QuantumElement from './quantumElement.js';
import { h, defineQuantumElement } from './quantumCore.js';

class myitem extends QuantumElement {
    styles() {
        return `
            img {
                height: 64px;
            }
        `;
    }

    //<img src={ 'https://picsum.photos/200/300?random=' + this.attrs.data.title }/>
    template() {
        return h(
            'li',
            null,
            this.attrs.data && h(
                'div',
                null,
                h(
                    'b',
                    null,
                    h('slot', null)
                ),
                ' - ',
                h(
                    'label',
                    { ref: 'label' },
                    this.attrs.data.title
                )
            )
        );
    }

    static get observedAttributes() {
        return ['data'];
    }

    constructor() {
        super({ img: Math.floor(Math.random() * 10) });
    }

}

defineQuantumElement('my-item', myitem);

class mylist extends QuantumElement {
    template() {
        return h(
            'div',
            null,
            h(
                'button',
                { ref: 'btnRender', onclick: e => this.btnClick(e) },
                'Render'
            ),
            h(
                'button',
                { ref: 'btnRender', onclick: e => this.updateOne(e) },
                'Render One '
            ),
            h(
                'ul',
                null,
                this.props.items.map((item, index) => h(
                    'my-item',
                    { data: item },
                    index + 1
                ))
            )
        );
    }

    styles() {
        return ``;
    }

    updateOne() {
        let n = Math.floor(Math.random() * 10 + 1) + '';
        console.log(n);
        this.props.items[0].title = n;
    }

    btnClick() {
        let tempList = [];
        let max = Math.floor(Math.random() * 10 + 1);
        for (let i = 0; i < max; i++) {
            tempList.push({
                title: Math.floor(Math.random() * 10 + 1) + ''
            });
        }
        //console.log(max, tempList.map(i => i.title).join(', '));
        this.props.items = tempList;
        // this.props.items
    }

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super({ items: [] });
        //setInterval(this.btnClick.bind(this), 2000);
    }
}

defineQuantumElement('my-list', mylist);
