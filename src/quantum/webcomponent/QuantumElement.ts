export abstract class QuantumElement extends HTMLElement {
    protected componentLoad?(): void;
    protected componentLoaded?(): void;
    protected componentMount?(): void;
    protected beforeAttributeChange?(): boolean;
    protected afterAttributeChange?(): void;

    protected template?(): any;
    protected styles?(): string;

    public static selector;
    protected automatiocDetection: boolean = true;
    public static encapsulation: boolean = true;

    private _shadowRoot: HTMLElement | ShadowRoot;
    public getRoot() {
        return this._shadowRoot;
    }

    constructor() {
        super();
        if ((this.constructor as typeof QuantumElement).encapsulation)
            this._shadowRoot = this.attachShadow({ mode: 'open' }); //, delegatesFocus: true??
        else
            this._shadowRoot = this;
    }
}