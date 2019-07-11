import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*APPBAR*/
export default class qAppBar extends QuantumElement {
    template() {
        return <div className="toolbar-container">
                    <div className="start"><slot name="start"></slot></div>
                    <div className="title"><slot></slot></div>
                    <div className="end"><slot name="end"></slot></div>
               </div>;
    }

    styles() { return `
        :host {
            flex: 0 1 auto;
            background: rgb(var(--q-material-primary-rgb));
            color: var(--app-font-color);
            position: relative;
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
            //justify-content: space-between;
            width: 100%;
            min-height: 56px;
            contain: content;
            overflow: hidden;
            z-index: 10;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }
        .start, .end {
            flex: 0 1 auto;
        }
        .title {
            flex: 1 1 auto;
            font-size: 1.8rem;
            font-family: "Roboto", "Segoe UI";
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 15px;
            padding-right: 15px;
        }
    `; }

    constructor() {
        super({});
    }
}