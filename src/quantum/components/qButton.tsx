import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*BUTTON*/
export default class qButton extends QuantumElement {
    public static tagName = 'q-button';
    template() {
        let css = 'q-material-button-contained';
        switch(this.attrs.mode) {
            case 'outline':
                css = 'q-material-button-outlined';
            break;
            case 'text':
                css = 'q-material-button-text';
            break;
            default:
                css = 'q-material-button-contained';
        }
        return <button className={css}>
                    <slot></slot>
                </button>;
    }

    static get observedAttributes() {
        return ['mode'];
    }

    styles() { 
        return `
            :host {
                display: inline-block;
                margin: 2px;
                width: fit-content;
            }
            .q-material-button-text {
                position: relative;
                display: inline-block;
                box-sizing: border-box;
                border: none;
                border-radius: 4px;
                padding: 0 8px;
                min-width: 64px;
                height: 36px;
                vertical-align: middle;
                text-align: center;
                text-overflow: ellipsis;
                text-transform: uppercase;
                color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                background-color: transparent;
                font-family: var(--q-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
                font-size: 14px;
                font-weight: 500;
                line-height: 36px;
                overflow: hidden;
                outline: none;
                cursor: pointer;
            }
            
            .q-material-button-text::-moz-focus-inner {
                border: none;
            }
            
            /* Overlay */
            .q-material-button-text::before {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background-color: rgb(var(--q-material-onprimary-rgb, 255, 255, 255));
                opacity: 0;
                transition: opacity 0.2s;
            }
            
            /* Ripple */
            .q-material-button-text::after {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                border-radius: 50%;
                padding: 50%;
                width: 32px;
                height: 32px;
                background-color: rgb(var(--q-material-onprimary-rgb, 255, 255, 255));
                opacity: 0;
                transform: translate(-50%, -50%) scale(1) ;
                transition: opacity 1s, transform 0.5s;
            }
            
            /* Hover, Focus */
            .q-material-button-text:hover::before {
                opacity: 0.04;
            }
            
            .q-material-button-text:focus::before {
                opacity: 0.12;
            }
            
            .q-material-button-text:hover:focus::before {
                opacity: 0.16;
            }
            
            /* Active */
            .q-material-button-text:active::after {
                opacity: 0.16;
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0s;
            }
            
            /* Disabled */
            .q-material-button-text:disabled {
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
                background-color: transparent;
                cursor: initial;
            }
            
            .q-material-button-text:disabled::before {
                opacity: 0;
            }
            
            .q-material-button-text:disabled::after {
                opacity: 0;
            }
            .q-material-button-outlined {
                position: relative;
                display: inline-block;
                box-sizing: border-box;
                border: solid 1px;
                border-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.24);
                border-radius: 4px;
                padding: 0 16px;
                min-width: 64px;
                height: 36px;
                vertical-align: middle;
                text-align: center;
                text-overflow: ellipsis;
                text-transform: uppercase;
                color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                background-color: transparent;
                font-family: var(--q-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
                font-size: 14px;
                font-weight: 500;
                line-height: 34px;
                overflow: hidden;
                outline: none;
                cursor: pointer;
            }
            
            .q-material-button-outlined::-moz-focus-inner {
                border: none;
            }
            
            /* Overlay */
            .q-material-button-outlined::before {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background-color: rgb(var(--q-material-onprimary-rgb, 255, 255, 255));
                opacity: 0;
                transition: opacity 0.2s;
            }
            
            /* Ripple */
            .q-material-button-outlined::after {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                border-radius: 50%;
                padding: 50%;
                width: 32px;
                height: 32px;
                background-color: rgb(var(--q-material-onprimary-rgb, 255, 255, 255));
                opacity: 0;
                transform: translate(-50%, -50%) scale(1) ;
                transition: opacity 1s, transform 0.5s;
            }
            
            /* Hover, Focus */
            .q-material-button-outlined:hover::before {
                opacity: 0.04;
            }
            
            .q-material-button-outlined:focus::before {
                opacity: 0.12;
            }
            
            .q-material-button-outlined:hover:focus::before {
                opacity: 0.16;
            }
            
            /* Active */
            .q-material-button-outlined:active::after {
                opacity: 0.16;
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0s;
            }
            
            /* Disabled */
            .q-material-button-outlined:disabled {
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
                background-color: transparent;
                cursor: initial;
            }
            
            .q-material-button-outlined:disabled::before {
                opacity: 0;
            }
            
            .q-material-button-outlined:disabled::after {
                opacity: 0;
            }
            .q-material-button-contained {
                position: relative;
                display: inline-block;
                box-sizing: border-box;
                border: none;
                border-radius: 4px;
                padding: 0 16px;
                min-width: 64px;
                height: 36px;
                vertical-align: middle;
                text-align: center;
                text-overflow: ellipsis;
                text-transform: uppercase;
                color: rgb(var(--q-material-onprimary-rgb, 255, 255, 255));
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
                font-family: var(--q-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
                font-size: 14px;
                font-weight: 500;
                line-height: 36px;
                overflow: hidden;
                outline: none;
                cursor: pointer;
                transition: box-shadow 0.2s;
            }
            
            .q-material-button-contained::-moz-focus-inner {
                border: none;
            }
            
            /* Overlay */
            .q-material-button-contained::before {
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
            .q-material-button-contained::after {
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
            }
            
            /* Hover, Focus */
            .q-material-button-contained:hover,
            .q-material-button-contained:focus {
                box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
            }
            
            .q-material-button-contained:hover::before {
                opacity: 0.08;
            }
            
            .q-material-button-contained:focus::before {
                opacity: 0.24;
            }
            
            .q-material-button-contained:hover:focus::before {
                opacity: 0.3;
            }
            
            /* Active */
            .q-material-button-contained:active {
                box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
            }
            
            .q-material-button-contained:active::after {
                opacity: 0.32;
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0s;
            }
            
            /* Disabled */
            .q-material-button-contained:disabled {
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
                background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.12);
                box-shadow: none;
                cursor: initial;
            }
            
            .q-material-button-contained:disabled::before {
                opacity: 0;
            }
            
            .q-material-button-contained:disabled::after {
                opacity: 0;
            }
            .q-material-button-contained:active, .q-material-button-contained:focus {
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
            }
            .q-material-button-outlined:active, .q-material-button-outlined:focus {
                background-color: transparent;
            }
        `; 
    }

    constructor() {
        super({});
    }
}