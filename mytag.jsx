class mytag extends QuantumElement {
    template() {
        return <h1> item { this.props.num.toString() } </h1>;
    }
    constructor() {
        super({ num: 5 });
    }
}

customElements.define('my-tag', mytag);