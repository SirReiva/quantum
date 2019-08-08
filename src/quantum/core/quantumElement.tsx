import { createElement, diff, queuPatches, isFunction } from './quantumCore';

interface arrReferences {
    [key: string]: any;
}

export default abstract class QuantumElement extends HTMLElement {
    template(): any { return false; }
    styles(): string { return ''; }
    protected componentBeforeLoaded?(): void;
    protected componentMounted?(): void;
    protected componentLoaded?(): void;
    protected componentBeforeUpdate?(): void;
    protected componentAfterUpdate?(): void;
    protected componentUnmounted?(): void;
    protected componentAttributeChange?(name: string, oldVal: any, newVal: any): void;
    protected componentPropChange?(name: string, oldVal: any, newVal: any): void;

    public static encapsulation: boolean = true;
    public static tagName: string = null;

    protected automaticDetection = true;
    public refs: arrReferences = {};
    public props: any = null;
    public objectAttrs: any = {};
    private _validator: any = {
        set: this._set.bind(this),
        get: this._get.bind(this),
    };
    private _vDom: any = null;
    private _initialized = false;
    private _shadowRoot: any = null;
    private _styleEl: any = null;

    constructor(prps = {}) {
        super();
        if ((this.constructor as typeof QuantumElement).encapsulation)
            this._shadowRoot = this.attachShadow({ mode: 'open' }); //, delegatesFocus: true??
        else
            this._shadowRoot = this;
        this.props = new Proxy(prps, this._validator);
        setTimeout(() => this._mount(), 1);
    }

    connectedCallback() {
        this.componentMounted && this.componentMounted();
    }
    disconnectedCallback() {
        this.componentUnmounted && this.componentUnmounted();
    }

    private _get(target: any, key: string) {
        if (Array.isArray(target[key])) {
            //return new Proxy(target[key].map((item: any) => new Proxy(item, this._validator)), this._validator);
            return new Proxy(target[key], this._validator);
        } else if (isFunction(target[key])) {
            return target[key].bind(target);
        } else if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], this._validator)
        } else {
            return target[key];
        }
    }

    private _set(target: any, key: string, value: any) {
        if (target[key] !== value) {
            let oldVal = target[key];
            target[key] = value;
            if (this.automaticDetection) {
                this.componentPropChange && this.componentPropChange(key, oldVal, value);
                this._render();
            }
        }
        return true;
    }

    attributeChangedCallback(_attrName: string, oldVal: any, newVal: any) {
        if ((oldVal !== newVal) && this.automaticDetection && this._initialized) {
            this.componentAttributeChange && this.componentAttributeChange(_attrName, oldVal, newVal);
            this._render();
        }
    }

    private _getAttributesInObject() {
        let attrs: any = {};
        for (let i = 0; i < this.attributes.length; i++) {
            if (this.attributes[i].value.startsWith('q-json-obj://')) {
                attrs[this.attributes[i].name] = JSON.parse(this.attributes[i].value.substr(13));
            } else {
                attrs[this.attributes[i].name] = this.attributes[i].value;
            }

        }
        return attrs;
    }

    public get attrs() {
        return this._getAttributesInObject();
    }

    private _mount() {
        this.componentBeforeLoaded && this.componentBeforeLoaded();
        //this.style.visible = 'hidden';
        this._vDom = this.template();
        this._styleEl = document.createElement('style');
        this._styleEl.innerHTML = this.styles(); //+ ':host{ visible: "visible"; }';??
        /*this._styleEl = new CSSStyleSheet();
        this._styleEl.replaceSync(this.styles());*/
        if(this._vDom) this._shadowRoot.appendChild(createElement(this._vDom, this.refs));
        this._shadowRoot.appendChild(this._styleEl);
        //this._shadowRoot.adoptedStyleSheets = [this._styleEl];
        this._initialized = true;
        this.componentLoaded && this.componentLoaded();
    }

    public getRoot() {
        return this._shadowRoot;
    }

    protected transaction(cb: Function) {
        let prevVal = this.automaticDetection;
        this.automaticDetection = false;
        cb();
        this.automaticDetection = prevVal;
        this._render();
    }

    private _render() {
        if (!this._initialized) return;
        this.componentBeforeUpdate && this.componentBeforeUpdate();
        const oldVDom = this._vDom;
        const newVDom = this.template();
        queuPatches(this._shadowRoot, diff(newVDom, oldVDom), this.refs);
        this._vDom = newVDom;
        this.componentAfterUpdate && this.componentAfterUpdate();
    }

    public reloadStyles() {
        if (!this._initialized) return;
        this._styleEl.innerHTML = this.styles();
        /*this._styleEl = new CSSStyleSheet();
        this._styleEl.replaceSync(this.styles());
        this._shadowRoot.adoptedStyleSheets = [this._styleEl];*/
    }

    public refresh() {
        if (!this._initialized) return;
        this._render();
    }

    public rebuild() { //testear...
        if (!this._initialized) return;
        this._shadowRoot.innerHTML = '';
        this._vDom = this.template();
        this._styleEl = document.createElement('style');
        this._styleEl.innerHTML = this.styles();
        /*this._styleEl = new CSSStyleSheet();
        this._styleEl.replaceSync(this.styles());*/
        this._shadowRoot.appendChild(createElement(this._vDom, this.refs));
        this._shadowRoot.appendChild(this._styleEl);
        //this._shadowRoot.adoptedStyleSheets = [this._styleEl];
    }
}