import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*CONTENT*/
export default class qContent extends QuantumElement {
    public static tagName = 'q-content';
    template() {
        if(this.hasAttribute('scollevents')) return <div onScroll={(e:any) => this.scrollEvent(e)} className="innerScroll"><slot></slot></div>;
        return <div className="innerScroll"><slot></slot></div>
    }

    styles() { return `
        :host {
            background-color: white;
            display: block;
            position: relative;
            -ms-flex: 1;
            flex: 1;
            width: 100%;
            height: 100%;
            margin: 0!important;
            padding: 0!important;
            contain: size style;
        }
        :host([padding]) .innerScroll{
            padding-left: 16px;
            padding-right: 16px;
            padding-top: 16px;
            padding-bottom: 16px;
        }
        .innerScroll {
            touch-action: pan-y;
            overflow-y: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            position: absolute;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }
    `; }

    static get observedAttributes() {
        return ['scollevents'];
    }

    scrollEvent(e: Event) {
        this.dispatchEvent(new Event(e.type, e));//set scroll props
    }

    constructor() {
        super(false);
    }

    getScrollElement() {
        return this.getRoot().querySelector('.innerScroll');
    }
}