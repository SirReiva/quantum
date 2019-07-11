import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*CHECKBOX*/
export default class qCheckBox extends QuantumElement {
    template() {
        return <label className="q-material-checkbox">
                    <input type="checkbox"/>
                    <span><slot></slot></span>
                </label>;
    }

    styles() { 
        return `
            .q-material-checkbox {
                z-index: 0;
                position: relative;
                display: inline-block;
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.87);
                font-family: var(--q-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
                font-size: 16px;
                line-height: 1.5;
            }
            
            /* Input */
            .q-material-checkbox > input {
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                z-index: -1;
                position: absolute;
                left: -10px;
                top: -8px;
                display: block;
                margin: 0;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.6);
                box-shadow: none;
                outline: none;
                opacity: 0;
                transform: scale(1);
                pointer-events: none;
                transition: opacity 0.3s, transform 0.2s;
            }
            
            /* Span */
            .q-material-checkbox > span {
                display: inline-block;
                width: 100%;
                cursor: pointer;
            }
            
            /* Box */
            .q-material-checkbox > span::before {
                content: "";
                display: inline-block;
                box-sizing: border-box;
                margin: 3px 11px 3px 1px;
                border: solid 2px; /* Safari */
                border-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.6);
                border-radius: 2px;
                width: 18px;
                height: 18px;
                vertical-align: top;
                transition: border-color 0.2s, background-color 0.2s;
            }
            
            /* Checkmark */
            .q-material-checkbox > span::after {
                content: "";
                display: block;
                position: absolute;
                top: 3px;
                left: 1px;
                width: 10px;
                height: 5px;
                border: solid 2px transparent;
                border-right: none;
                border-top: none;
                transform: translate(3px, 4px) rotate(-45deg);
            }
            
            /* Checked, Indeterminate */
            .q-material-checkbox > input:checked,
            .q-material-checkbox > input:indeterminate {
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
            }
            
            .q-material-checkbox > input:checked + span::before,
            .q-material-checkbox > input:indeterminate + span::before {
                border-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
            }
            
            .q-material-checkbox > input:checked + span::after,
            .q-material-checkbox > input:indeterminate + span::after {
                border-color: rgb(var(--q-material-onprimary-rgb, 255, 255, 255));
            }
            
            .q-material-checkbox > input:indeterminate + span::after {
                border-left: none;
                transform: translate(4px, 3px);
            }
            
            /* Hover, Focus */
            .q-material-checkbox:hover > input {
                opacity: 0.04;
            }
            
            .q-material-checkbox > input:focus {
                opacity: 0.12;
            }
            
            .q-material-checkbox:hover > input:focus {
                opacity: 0.16;
            }
            
            /* Active */
            .q-material-checkbox > input:active {
                opacity: 1;
                transform: scale(0);
                transition: transform 0s, opacity 0s;
            }
            
            .q-material-checkbox > input:active + span::before {
                border-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
            }
            
            .q-material-checkbox > input:checked:active + span::before {
                border-color: transparent;
                background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.6);
            }
            
            /* Disabled */
            .q-material-checkbox > input:disabled {
                opacity: 0;
            }
            
            .q-material-checkbox > input:disabled + span {
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
                cursor: initial;
            }
            
            .q-material-checkbox > input:disabled + span::before {
                border-color: currentColor;
            }
            
            .q-material-checkbox > input:checked:disabled + span::before,
            .q-material-checkbox > input:indeterminate:disabled + span::before {
                border-color: transparent;
                background-color: currentColor;
            }
        
        `; 
    }
    
    constructor() {
        super({});
    }
}