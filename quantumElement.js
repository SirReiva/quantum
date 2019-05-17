import { createElement, diff, patch } from './quantumCore.js';

export default class QuantumElement extends HTMLElement {
    template() {}

    _get(target, key) {
        if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], self.validator)
        } else {
            return target[key];
        }
    }

    _set(target, key, value) {
        target[key] = value;
        this.render();
        return true;
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log('attr changed 0');
        if (oldVal !== newVal) {
            console.log('attr changed');
            this.render();
        }
    }

    _validator = {
        set: this._set.bind(this),
        get: this._get.bind(this),
    };

    _vDom = null;
    _mount() {
        this._vDom = this.template();
        this.shadowRoot.appendChild(createElement(this._vDom));
    }

    shadowRoot = null;
    props = new Proxy({}, this._validator);
    constructor(prps) {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });
        if (prps)
            this.props = new Proxy(prps, this._validator);
        this._mount();
    }

    render() {
        const oldVDom = this._vDom;
        const newVDom = this.template();
        const patches = diff(newVDom, oldVDom);
        patch(this.shadowRoot, patches);
        this._vDom = newVDom;
    }

    connectedCallback() {
        console.log('conneced');
    }
}