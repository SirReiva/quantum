import QuantumElement from '../core/quantumElement';

export default class qPage extends QuantumElement {
    public static tagName = 'q-page';
    styles() { return `
        :host {
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            position: absolute;
            flex-direction: column;
            justify-content: space-between;
            contain: layout size style;
            overflow: hidden;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
        }`; 
    }

    constructor(pr: any = false) {
        super(pr);        
    }
}