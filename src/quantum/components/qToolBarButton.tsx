import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*BUTTON TOOLBAR*/
export default class qToolBarButton extends QuantumElement {
    public static tagName = 'q-toolbarbutton';
    template() {
        return <button>
                    <slot></slot>
                </button>;
    }

    styles() { 
        return `
            :host {
                display: inline-block;
            }
            button {
                position: relative;
                display: inline-flex;
                box-sizing: border-box;
                border: none;
                border-radius: 50%;
                vertical-align: middle;
                text-align: center;
                text-overflow: ellipsis;
                color: var(--app-font-color);
                background-color: transparent;
                font-family: "Roboto", "Segoe UI";
                height: 36px;
                width: 36px;
                font-size: 14px;
                overflow: hidden;
                outline: none;
                cursor: pointer;
                margin-left: 10px;
                margin-right: 10px;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }  

            button:focus,
            button:active {
                outline:none;
            }

            button::-moz-focus-inner {
                border: none;
            }
            
            /* Ripple */
            button::after {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                border-radius: 50%;
                padding: 50%;
                width: 36px; /* Safari */
                height: 36px; /* Safari */
                background-color: white;
                opacity: 0;
                transform: translate(-50%, -50%) scale(1);
                transition: opacity 1s, transform 0.5s;
            }
            
            button:hover::before {
                opacity: 0.08;
            }
            
            button:focus::before {
                opacity: 0.24;
            }
            
            button:hover:focus::before {
                opacity: 0.3;
            }
            
            
            button:active::after {
                opacity: 0.32;
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0s;
            }
            button:hover,.button:focus,.button:active, 
            buttony:active:focus:not(:disabled):not(.disabled),
            button:focus, button:active, button:hover{
                box-shadow: none!important;
                outline: 0;
            }
        `; 
    }
    
    constructor() {
        super({});
    }
}