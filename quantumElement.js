import { createElement, diff, patch } from './quantumCore.js';

export default class QuantumElement extends HTMLElement {
    static template() {}

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
        if (oldVal !== newVal) {
            this.render();
        }
    }

    _validator = {
        set: this._set.bind(this),
        get: this._get.bind(this),
    };

    _getAttributesInObject() {
        let attrs = {};
        for (let i = 0; i < this.attributes.length; i++) {
            attrs[this.attributes[i].name] = this.attributes[i].value;
        }
        return attrs;
    }

    _vDom = null;
    _mount() {
        this._vDom = this.constructor.template(this._getAttributesInObject(), this.props);
        this.shadowRoot.appendChild(createElement(this._vDom));
    }

    shadowRoot = null;
    _props = {};
    props = new Proxy({}, this._validator);
    constructor(prps = {}) {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });
        this._props = prps;
        this.props = new Proxy(prps, this._validator);
        this._mount();
    }

    render() {
        const oldVDom = this._vDom;
        const newVDom = this.constructor.template(this._getAttributesInObject(), this.props);
        const patches = diff(newVDom, oldVDom);
        patch(this.shadowRoot, patches);
        this._vDom = newVDom;
    }

}