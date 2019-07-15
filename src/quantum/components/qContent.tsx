import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*CONTENT*/
export default class qContent extends QuantumElement {
    public static tagName = 'q-content';
    template() {
        if (this.hasAttribute('scollevents'))
            return  <div className="baseContent">
                        <div className="fix"><div onScroll={(e: any) => this.scrollEvent(e)} className="scrollContent"><slot></slot></div></div>
                    </div>;
        else
            return  <div className="baseContent">
                        <div className="fix"><div className="scrollContent"><slot></slot></div></div>
                    </div>;
    }

    styles() { return `
        :host {
            flex: 1 1 auto;
            background-color: white;
        }
        .baseContent {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            max-height: 100%;
            max-width: 100%;
            position: relative;
        }
        .fix {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .scrollContent {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            position: relative;
            overflow-y: auto;
        }
        :host([padding]) .scrollContent{
            padding: 16px;
        }
    `; }

    scrollEvent(e: Event) {
        this.dispatchEvent(new Event(e.type, e));//set scroll props
    }

    constructor() {
        super({ items: []});
    }
}