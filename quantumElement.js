class QuantumElement extends HTMLElement {
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

    _validator = {
        set: this._set.bind(this),
        get: this._get.bind(this),
    };

    shadowRoot = null;
    props = new Proxy({}, this._validator);
    constructor(prps) {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });
        if (prps)
            this.props = new Proxy(prps, this._validator);
        this.shadowRoot.appendChild(createElement(this.template()));
    }

    render() {}

    connectedCallback() {
        console.log('conneced');
    }
}