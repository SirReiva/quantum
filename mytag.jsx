import QuantumElement from './quantumElement.js';
import { h, defineQuantumElement } from './quantumCore.js';

class myitem extends QuantumElement {
    template() {
        return <li>
                    {
                        this.attrs.data &&
                        <div><img src={this.attrs.data.thumbnailUrl}/><label>{this.attrs.data.title}</label></div>
                    }
                </li>;
    }

    static get observedAttributes() {
        return ['data'];
    }

    connectedCallback() {
        
    }

    constructor() {
        super({});
    }

}

defineQuantumElement('my-item', myitem);

class mylist extends QuantumElement {
    template() {
        return <ul>
                {
                    this.props.items.map(item => <my-item data={item}></my-item>)
                }
                </ul>;
    }

    styles() { return ``; }


    static get observedAttributes() {
        return [];
    }

    constructor() {
        super({ items: [] });
        fetch('https://jsonplaceholder.typicode.com/photos').then(resp => resp.json()).then((data) => {
            this.props.items = data.slice(4950);
            /*setInterval(() => {
                this.props.items[0].title = 'dsafdsfdas';
            }, 2500);*/
        });
    }
}

defineQuantumElement('my-list', mylist);