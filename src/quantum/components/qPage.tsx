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
        }`; 
    }

    constructor(props: any) {
        super(props);        
    }
}