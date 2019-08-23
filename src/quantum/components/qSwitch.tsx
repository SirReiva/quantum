import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*SWITCH*/
export default class qSwitch extends QuantumElement {
    public static tagName = 'q-switch';
    template() {
        return <label className="q-material-switch">
                    <input type="checkbox"/>
                    <span><slot></slot></span>
                </label>;
    }

    styles() { 
        return `
            :host {
                width: fit-content;
                display: inline-block;
            }
            .q-material-switch {
                width: 100%;
                z-index: 0;
                position: relative;
                display: inline-block;
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.87);
                font-family: var(--q-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
                font-size: 16px;
                line-height: 1.5;
                -webkit-tap-highlight-color: rgba(var(--q-material-primary-rgb, 0, 0, 0), 0.3);
            }
            
            /* Input */
            .q-material-switch > input {
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                z-index: -1;
                position: absolute;
                right: 6px;
                top: -8px;
                display: block;
                margin: 0;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
                outline: none;
                opacity: 0;
                transform: scale(1);
                pointer-events: none;
                transition: opacity 0.3s 0.1s, transform 0.2s 0.1s;
            }
            
            /* Span */
            .q-material-switch > span {
                display: inline-block;
                width: 100%;
                cursor: pointer;
            }
            
            /* Track */
            .q-material-switch > span::before {
                content: "";
                float: right;
                display: inline-block;
                margin: 5px 0 5px 10px;
                border-radius: 7px;
                width: 36px;
                height: 14px;
                background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
                vertical-align: top;
                transition: background-color 0.2s, opacity 0.2s;
            }
            
            /* Thumb */
            .q-material-switch > span::after {
                content: "";
                position: absolute;
                top: 2px;
                right: 16px;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                background-color: rgb(var(--q-material-onprimary-rgb, 255, 255, 255));
                box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
                transition: background-color 0.2s, transform 0.2s;
            }
            
            /* Checked */
            .q-material-switch > input:checked {
                right: -10px;
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
            }
            
            .q-material-switch > input:checked + span::before {
                background-color: rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.6);
            }
            
            .q-material-switch > input:checked + span::after {
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                transform: translateX(16px);
            }
            
            /* Hover, Focus */
            .q-material-switch:hover > input {
                opacity: 0.04;
            }
            
            .q-material-switch > input:focus {
                opacity: 0.12;
            }
            
            .q-material-switch:hover > input:focus {
                opacity: 0.16;
            }
            
            /* Active */
            .q-material-switch > input:active {
                opacity: 1;
                transform: scale(0);
                transition: transform 0s, opacity 0s;
            }
            
            .q-material-switch > input:active + span::before {
                background-color: rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.6);
            }
            
            .q-material-switch > input:checked:active + span::before {
                background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
            }
            
            /* Disabled */
            .q-material-switch > input:disabled {
                opacity: 0;
            }
            
            .q-material-switch > input:disabled + span {
                color: rgb(var(--q-material-onsurface-rgb, 0, 0, 0));
                opacity: 0.38;
                cursor: default;
            }
            
            .q-material-switch > input:disabled + span::before {
                background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
            }
            
            .q-material-switch > input:checked:disabled + span::before {
                background-color: rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.6);
            }
        `; 
    }
    
    constructor() {
        super(false);
    }
}