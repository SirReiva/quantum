import { createElement, diff, queuPatches, isFunction } from './quantumCore.js';

export default class QuantumElement extends HTMLElement {
    template() { return ''; }
    styles() { return ''; }

    static automaticDetection = true;

    connectedCallback() {

    }

    _get(target, key) {
        if (Array.isArray[target[key]]) {
            return new Proxy(target[key].map(item => new Proxy(item, this._validator)), this._validator);
        } else if (isFunction(target[key])) {
            return target[key].bind(target);
        } else if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], this._validator)
        } else {
            return target[key];
        }
    }

    _set(target, key, value) {
        if (target[key] !== value) {
            target[key] = value;
            if (this.constructor.automaticDetection)
                this._render();
        }
        return true;
    }

    _validator = {
        set: this._set.bind(this),
        get: this._get.bind(this),
    };

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal !== newVal && this.constructor.automaticDetection) {
            this._render();
        }
    }


    _getAttributesInObject() {
        let attrs = {};
        for (let i = 0; i < this.attributes.length; i++) {
            if (this.attributes[i].value.startsWith('q-json-obj://')) {
                attrs[this.attributes[i].name] = JSON.parse(this.attributes[i].value.substr(13));
            } else {
                attrs[this.attributes[i].name] = this.attributes[i].value;
            }

        }
        return attrs;
    }

    get attrs() {
        return this._getAttributesInObject();
    }

    _vDom = null;
    _mount() {
        this._vDom = this.template(this._getAttributesInObject(), this.props);
        const stl = document.createElement('style');
        stl.innerHTML = this.styles();
        this._shadowRoot.appendChild(createElement(this._vDom));
        this._shadowRoot.appendChild(stl);
    }

    _shadowRoot = null;
    _props = {};
    props = new Proxy({}, this._validator);
    constructor(prps = {}) {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._props = prps;
        this.props = new Proxy(prps, this._validator);
        // this._mount();
        setTimeout(() => this._mount(), 1);
    }

    _render() {
        const oldVDom = this._vDom;
        const newVDom = this.template(this._getAttributesInObject(), this.props);
        const patches = diff(newVDom, oldVDom);
        queuPatches(this._shadowRoot, patches);
        this._vDom = newVDom;
    }

    refresh() {
        this._render();
    }
}