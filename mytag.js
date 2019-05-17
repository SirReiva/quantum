class mytag extends QuantumElement {
    template() {
        return h(
            'h1',
            null,
            ' item ',
            this.props.num.toString(),
            ' '
        );
    }
    constructor() {
        super({ num: 5 });
    }
}

customElements.define('my-tag', mytag);
