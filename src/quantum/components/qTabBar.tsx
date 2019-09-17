import QuantumElement from '../core/quantumElement';
import { h } from '../core/h';
import { TabBarItem } from './utils/routes/index';

/*TABBAR*/
export default class qTabBar extends QuantumElement {
    public static tagName = 'q-tabbar';
    template() {
        const ati = this.getAttribute('index');
        const i = ati!==null?parseInt(ati):-1;
        return  <div className="toolbar-container">
                    <div className="bgBar"></div>
                    {
                        this.objectAttrs.items && this.objectAttrs.items.map((it: TabBarItem, index: number) => {
                            return <button onClick={() => this._select(index)} className={(i === index)?'selected':''}><q-icon icon={it.icon}></q-icon>{it.text || ' '}</button>
                        })
                    }
                </div>;
    }

    styles() { return `
        :host {
            display: block;
            position: relative;
            flex: 0 1 auto;
            color: var(--app-font-color);
            position: relative;
            width: 100%;
            z-index: 1;
        }
        :host([shadow]):after {
            left: 0;
            bottom: -8px;
            background-position: left 0 top 0;
            position: absolute;
            width: 100%;
            height: 8px;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAIBAMAAAACWGKkAAAAFVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAASAQCkAAAAB3RSTlMFTEIzJBcOYhQUIwAAAB9JREFUCNdjEIQCBiUoYDCGAgYXKGAIhQKGNChgwAAAorMLKSCkL40AAAAASUVORK5CYII=");
            background-repeat: repeat-x;
            content: "";
            z-index: 1;
        }
        :host([topshadow]):after {
            transform: rotate(180deg);
            left: 0;
            top: -8px;
            background-position: left 0 top 0;
            position: absolute;
            width: 100%;
            height: 8px;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAIBAMAAAACWGKkAAAAFVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAASAQCkAAAAB3RSTlMFTEIzJBcOYhQUIwAAAB9JREFUCNdjEIQCBiUoYDCGAgYXKGAIhQKGNChgwAAAorMLKSCkL40AAAAASUVORK5CYII=");
            background-repeat: repeat-x;
            content: "";
            z-index: 1;
        }
        :host([top]) .selected {
            color: var(--app-font-color);
            border-bottom: 2px solid;
            border-top: none;
        }
        .bgBar {
            top: 0px;
            left: 0px;
            z-index: -1;
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: var(--app-bar-opacity, 1);
            background: rgb(var(--q-material-primary-rgb));
        }
        .toolbar-container {
            padding: 4px;
            display: -ms-flexbox;
            display: flex;
            position: relative;
            -ms-flex-direction: row;
            flex-direction: row;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-pack: justify;
            width: 100%;
            min-height: 56px;
            contain: content;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            overflow: hidden;
            scroll-snap-type: x mandatory;
            flex-wrap: nowrap;
        }
        button {
            position: relative;
            display: inline-block;
            scroll-snap-align: center;
            flex: 1 1 0%;
            height: 48px;
            border: none;
            background: transparent;
            color: #666666;
            outline: none;
            contain: layout style;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        
        button::-moz-focus-inner {
            border: none;
        }
        
        /* Overlay */
        button::before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgb(var(--q-material-onprimary-rgb, 255, 255, 255));
            opacity: 0;
            transition: opacity 0.2s;
        }
        
        /* Ripple */
        button::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            border-radius: 50%;
            padding: 50%;
            width: 32px; /* Safari */
            height: 32px; /* Safari */
            background-color: rgb(var(--q-material-onprimary-rgb, 255, 255, 255));
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
            transition: opacity 1s, transform 0.5s;
            pointer-events: none;
        }
        button:active::after {
            opacity: 0.32;
            transform: translate(-50%, -50%) scale(0);
            transition: transform 0s;
        }
        button:disabled {
            color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
            background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.12);
            box-shadow: none;
            cursor: initial;
        }
        
        button:disabled::after {
            opacity: 0;
        }
        .selected {
            color: var(--app-font-color);
            border-top: 2px solid;
        }
        .selected  q-icon{
            color: var(--app-font-color);
        }
        button > q-icon {
            display: inline;
        }
        q-icon{
            color: #666666;;
        }
    `; }

    _select(i: number) {
        const ati = this.getAttribute('index');
        const ic = ati!==null?parseInt(ati):-1;
        if(ic != i) {
            this.setAttribute('index', i + '');
            this.dispatchEvent(new CustomEvent('change', {'detail': i}));
        }
    }

    static get observedAttributes() {
        return ['index', 'items'];
    }

    constructor() {
        super(false);
    }
}