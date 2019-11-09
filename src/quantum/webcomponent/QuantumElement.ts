import { createElementVNode } from "../core/vdom/createElement";
import { queuPatch } from "../core/vdom/patch";
import { diff } from "../core/vdom/diff";
import { qNode } from "../core/vdom/interfaces";

interface qReferences {
    [key: string]: any;
}

export abstract class QuantumElement extends HTMLElement {
    protected componentLoad?(): void;
    protected componentLoaded?(): void;
    protected componentMount?(): void;
    protected attributeChange?(attrName: string, prevVal: any, currentVal: any): void;
    protected componentUnmounted?(): void;
    protected componentBeforeUpdate?(): void;
    protected componentAfterUpdate?(): void;

    protected observableAttributes: string[] = []; 

    protected template?(): qNode;
    protected styles?(): string;

    public static selector;
    protected automaticDetection: boolean = true;
    public static encapsulation: boolean = true;

    private _shadowRoot: HTMLElement | ShadowRoot;
    public getRoot() {
        return this._shadowRoot;
    }
    private _vDom: qNode;
    private _styleEl: HTMLStyleElement;
    private _initialized: boolean = false;
    protected refs: qReferences = {};
    private _promiseReadyResolver:Function = null;
    public isReady = new Promise((resolve) => {
        this._promiseReadyResolver = resolve;
    });
    private _load() {
        this.componentLoad && this.componentLoad();
        const frag = document.createDocumentFragment();
        if (this.template) this._vDom = this.template();
        this._styleEl = document.createElement('style');
        if (this.styles) this._styleEl.innerHTML = this.styles();
        if (this._vDom) frag.appendChild(createElementVNode(this._vDom, this.refs));
        frag.appendChild(this._styleEl);
        this._shadowRoot.appendChild(frag);
        this._initialized = true;
        this.componentLoaded && this.componentLoaded();
        this._promiseReadyResolver();
    }

    connectedCallback() {
        this.componentMount && this.componentMount();
    }

    disconnectedCallback() {
        this.componentUnmounted && this.componentUnmounted();
        this._shadowRoot.innerHTML = '';
        delete this._vDom;
        delete this.refs;
        delete this._shadowRoot;
        delete this._styleEl;
        delete this.isReady;
        delete this._promiseReadyResolver;
    }

    attributeChangedCallback(_attrName: string, oldVal: any, newVal: any) {
        if ((oldVal !== newVal) && this._initialized) {
            this.attributeChange && this.attributeChange(_attrName, oldVal, newVal);
            if(this.automaticDetection)
                this._render();
        }
    }

    constructor() {
        super();
        if ((this.constructor as typeof QuantumElement).encapsulation)
            this._shadowRoot = this.attachShadow({ mode: 'open' }); //, delegatesFocus: true??
        else
            this._shadowRoot = this;
        setTimeout(() => this._load());
    }

    private _render() {
        if (!this._initialized) return;
        this.componentBeforeUpdate && this.componentBeforeUpdate();
        const oldVDom = this._vDom;
        const newVDom = this.template();
        this._vDom = newVDom;
        queuPatch(this._shadowRoot as HTMLElement, diff(oldVDom, newVDom), this.refs);
        this.componentAfterUpdate && this.componentAfterUpdate();
    }
}