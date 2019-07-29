import QuantumElement from '../core/quantumElement';

export default class qPage extends QuantumElement {
    public static tagName = 'q-page';
    styles() { return `
        :host {
            height: 100%;
            width: 100%;
            position: absolute;
            display: block;
            top: 0px;
            left: 0px;
            will-change: opacity, transform;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
        }`; 
    }

    componentLoaded() {
        this.dispatchEvent(new CustomEvent('loaded', {}));
    }

    constructor(props: any) {
        super(props);        
    }
}