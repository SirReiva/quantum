import QuantumElement from './quantumElement.js';
import { h, defineQuantumElement, debounce } from './quantumCore.js';

/*SCAFOLD*/
class qScafold extends QuantumElement {
    template() {
        return <slot></slot>;
    }

    styles() { return `
        :host {
            position: absolute;
            display: flex;
            flex-flow: column;
            height: 100%;
            width: 100%;
        }
    `; }

    constructor() {
        super({});        
    }
}
defineQuantumElement('q-scafold', qScafold);

/*CONTENT*/
class qContent extends QuantumElement {
    template() {
        return <div className="baseContent">
                    <div className="fix"><div className="scrollContent"><slot></slot></div></div>
               </div>;
    }

    styles() { return `
        :host {
            flex: 1 1 auto;
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
            overflow-y: hidden;
        }
        .scrollContent {
            padding: 16px;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            position: relative;
            overflow-y: auto;
        }
    `; }

    constructor() {
        super({ items: []});
    }
}
defineQuantumElement('q-content', qContent);

/*APPBAR*/
class qAppBar extends QuantumElement {
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
        }
    `; }

    constructor() {
        super({});
    }
}
defineQuantumElement('q-appbar', qAppBar);

/*BUTTON*/
class qButton extends QuantumElement {
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
                background-color: currentColor;
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
                background-color: currentColor;
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
                background-color: currentColor;
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
                background-color: currentColor;
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
        `; 
    }

    constructor() {
        super({});
    }
}
defineQuantumElement('q-button', qButton);

/*BUTTON TOOLBAR*/
class qToolBarButton extends QuantumElement {
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
defineQuantumElement('q-tolbar-button', qToolBarButton);

/*CHECKBOX*/
class qCheckBox extends QuantumElement {
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
defineQuantumElement('q-checkbox', qCheckBox);

/*RADIOBUTTON*/
class qRadioButton extends QuantumElement {

    template() {
        return <label className="q-material-radio">
                    <input ref="rb" value={this.attrs.value} checked={this.attrs.checked} onChange={e => this._changeInp(e)} type="radio" name={this.attrs.group}/>
                    <span><slot></slot></span>
                </label>;
    }

    static get observedAttributes() {
        return ['group', 'checked', 'value'];
    }

    isChecked() {
        return this.hasAttribute('checked');
    }

    getValue() {
        return this.refs.rb.value;
    }

    getGroupSelectedValue() {
        for(let qCkbx of qRadioButton.instances) {
            if(qCkbx.hasAttribute('checked') && this.attrs.group == qCkbx.getAttribute('group')) {
                return qCkbx.getValue();
            }
        }
        return null;
    }

    _changeInp(event) {
        if(event.target.checked) {
            this.setAttribute('checked', '');
            for(let qCkbx of qRadioButton.instances) {
                if(qCkbx !== this && qCkbx.hasAttribute('checked') && this.attrs.group == qCkbx.getAttribute('group')) {
                    qCkbx.removeAttribute('checked');
                }
            }
        } else {
            this.removeAttribute('checked');
        }
        
    }

    componentUnmounted() {
        let index = qRadioButton.instances.indexOf(this);
        if(index != -1) {
            qRadioButton.instances.splice(index, 1);
        }
    }

    styles() { 
        return `
            .q-material-radio {
                z-index: 0;
                position: relative;
                display: inline-block;
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.87);
                font-family: var(--q-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
                font-size: 16px;
                line-height: 1.5;
            }
            
            /* Input */
            .q-material-radio > input {
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
                outline: none;
                opacity: 0;
                transform: scale(1);
                pointer-events: none;
                transition: opacity 0.3s, transform 0.2s;
            }
            
            /* Span */
            .q-material-radio > span {
                display: inline-block;
                width: 100%;
                cursor: pointer;
            }
            
            /* Circle */
            .q-material-radio > span::before {
                content: "";
                display: inline-block;
                box-sizing: border-box;
                margin: 2px 10px 2px 0;
                border: solid 2px; /* Safari */
                border-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.6);
                border-radius: 50%;
                width: 20px;
                height: 20px;
                vertical-align: top;
                transition: border-color 0.2s;
            }
            
            /* Check */
            .q-material-radio > span::after {
                content: "";
                display: block;
                position: absolute;
                top: 2px;
                left: 0;
                border-radius: 50%;
                width: 10px;
                height: 10px;
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                transform: translate(5px, 5px) scale(0);
                transition: transform 0.2s;
            }
            
            /* Checked */
            .q-material-radio > input:checked {
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
            }
            
            .q-material-radio > input:checked + span::before {
                border-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
            }
            
            .q-material-radio > input:checked + span::after {
                transform: translate(5px, 5px) scale(1);
            }
            
            /* Hover, Focus */
            .q-material-radio:hover > input {
                opacity: 0.04;
            }
            
            .q-material-radio > input:focus {
                opacity: 0.12;
            }
            
            .q-material-radio:hover > input:focus {
                opacity: 0.16;
            }
            
            /* Active */
            .q-material-radio > input:active {
                opacity: 1;
                transform: scale(0);
                transition: transform 0s, opacity 0s;
            }
            
            .q-material-radio > input:active + span::before {
                border-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
            }
            
            /* Disabled */
            .q-material-radio > input:disabled {
                opacity: 0;
            }
            
            .q-material-radio > input:disabled + span {
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
                cursor: initial;
            }
            
            .q-material-radio > input:disabled + span::before {
                border-color: currentColor;
            }
            
            .q-material-radio > input:disabled + span::after {
                background-color: currentColor;
            }
        `; 
    }
    
    constructor() {
        super({});
        qRadioButton.instances.push(this);
    }
}
qRadioButton.instances = [];
defineQuantumElement('q-radiobutton', qRadioButton);

/*SWITCH*/
class qSwitch extends QuantumElement {
    template() {
        return <label className="q-material-switch">
                    <input type="checkbox"/>
                    <span><slot></slot></span>
                </label>;
    }

    styles() { 
        return `
            .q-material-switch {
                z-index: 0;
                position: relative;
                display: inline-block;
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.87);
                font-family: var(--q-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
                font-size: 16px;
                line-height: 1.5;
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
        super({});
    }
}
defineQuantumElement('q-switch', qSwitch);

/*SLIDER*/
class qSlider extends QuantumElement {
    template() {
        return <label className="q-material-slider">
                    <input onInput={(e) => this.changeColor(e)} ref="slide" type="range" min="0" max="360" value="207"/>
                    <span><slot></slot></span>
                </label>;
    }

    componentLoaded() {
        /*let A = n => n > 1 ? 2 - n : n;
        let Y = 0.5166666666666666;
        const hsl2rgb = (H,S,L)=>[5,3,1].map(i=>A(L*2)*S*([1,Y,0,0,Y,1][(i-~H)%6]-.5)+L,Y=(A=n=>n>1?2-n:n)((H/=60)%2));
        this.refs.slide.oninput = (event) => {
            const rgb = hsl2rgb(event.target.value, 0.897, 0.541);
            document.body.style.setProperty('--q-material-primary-rgb', `${Math.round(rgb[0] * 255)}, ${Math.round(rgb[1] * 255)}, ${Math.round(rgb[2] * 255)}`);
        };*/
    }

    changeColor(event) {
        let A = n => n > 1 ? 2 - n : n;
        let Y = 0.5166666666666666;
        const hsl2rgb = (H,S,L)=>[5,3,1].map(i=>A(L*2)*S*([1,Y,0,0,Y,1][(i-~H)%6]-.5)+L,Y=(A=n=>n>1?2-n:n)((H/=60)%2));
        const rgb = hsl2rgb(event.target.value, 0.897, 0.541);
        document.body.style.setProperty('--q-material-primary-rgb', `${Math.round(rgb[0] * 255)}, ${Math.round(rgb[1] * 255)}, ${Math.round(rgb[2] * 255)}`);
    }

    styles() { 
        return `
            .q-material-slider {
                --q-material-safari-helper1: rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.04);
                --q-material-safari-helper2: rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.12);
                --q-material-safari-helper3: rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.16);
                --q-material-safari-helper4: rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.24);
                display: inline-block;
                width: 200px;
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.87);
                font-family: var(--q-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
                font-size: 16px;
                line-height: 1.5;
                max-width: 100%;
            }
            
            /* Input */
            .q-material-slider > input {
                -webkit-appearance: none;
                position: relative;
                top: 24px;
                display: block;
                margin: 0 0 -36px;
                width: 100%;
                height: 36px;
                background-color: transparent;
                cursor: pointer;
            }
            
            /* Without Span */
            .q-material-slider > input:last-child {
                position: static;
                margin: 0;
            }
            
            /* Span */
            .q-material-slider > span {
                display: inline-block;
                margin-bottom: 36px;
            }
            
            /* Focus */
            .q-material-slider > input:focus {
                outline: none;
            }
            
            /* Disabled */
            .q-material-slider > input:disabled {
                cursor: default;
                opacity: 0.38;
            }
            
            .q-material-slider > input:disabled + span {
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
            }
            
            /* Webkit | Track */
            .q-material-slider > input::-webkit-slider-runnable-track {
                margin: 17px 0;
                border-radius: 1px;
                width: 100%;
                height: 2px;
                background-color: rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.24);
            }
            
            /* Webkit | Thumb */
            .q-material-slider > input::-webkit-slider-thumb {
                appearance: none;
                -webkit-appearance: none;
                border: none;
                border-radius: 50%;
                height: 2px;
                width: 2px;
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                transform: scale(6, 6);
                transition: box-shadow 0.2s;
            }
            
            /* Webkit | Hover, Focus */
            .q-material-slider:hover > input::-webkit-slider-thumb {
                box-shadow: 0 0 0 2px var(--q-material-safari-helper1);
            }
            
            .q-material-slider > input:focus::-webkit-slider-thumb {
                box-shadow: 0 0 0 2px var(--q-material-safari-helper2);
            }
            
            .q-material-slider:hover > input:focus::-webkit-slider-thumb {
                box-shadow: 0 0 0 2px var(--q-material-safari-helper3);
            }
            
            /* Webkit | Active */
            .q-material-slider > input:active::-webkit-slider-thumb {
                box-shadow: 0 0 0 2px var(--q-material-safari-helper4) !important;
            }
            
            /* Webkit | Disabled */
            .q-material-slider > input:disabled::-webkit-slider-runnable-track {
                background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
            }
            
            .q-material-slider > input:disabled::-webkit-slider-thumb {
                background-color: rgb(var(--q-material-onsurface-rgb, 0, 0, 0));
                color: rgb(var(--q-material-surface-rgb, 255, 255, 255)); /* Safari */
                box-shadow: 0 0 0 1px rgb(var(--q-material-surface-rgb, 255, 255, 255)) !important;
                transform: scale(4, 4);
            }
            
            /* Moz | Track */
            .q-material-slider > input::-moz-range-track {
                margin: 17px 0;
                border-radius: 1px;
                width: 100%;
                height: 2px;
                background-color: rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.24);
            }
            
            /* Moz | Thumb */
            .q-material-slider > input::-moz-range-thumb {
                appearance: none;
                -moz-appearance: none;
                border: none;
                border-radius: 50%;
                height: 2px;
                width: 2px;
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                transform: scale(6, 6);
                transition: box-shadow 0.2s;
            }
            
            /* Moz | Progress */
            .q-material-slider > input::-moz-range-progress {
                border-radius: 1px;
                height: 2px;
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
            }
            
            /* Moz | Hover, Focus */
            .q-material-slider:hover > input:hover::-moz-range-thumb {
                box-shadow: 0 0 0 2px rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.04);
            }
            
            .q-material-slider > input:focus::-moz-range-thumb {
                box-shadow: 0 0 0 2px rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.12);
            }
            
            .q-material-slider:hover > input:focus::-moz-range-thumb {
                box-shadow: 0 0 0 2px rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.16);
            }
            
            /* Moz | Active */
            .q-material-slider > input:active::-moz-range-thumb {
                box-shadow: 0 0 0 2px rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.24) !important;
            }
            
            /* Moz | Disabled */
            .q-material-slider > input:disabled::-moz-range-track {
                background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
            }
            
            .q-material-slider > input:disabled::-moz-range-progress {
                background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.87);
            }
            
            .q-material-slider > input:disabled::-moz-range-thumb {
                background-color: rgb(var(--q-material-onsurface-rgb, 0, 0, 0));
                box-shadow: 0 0 0 1px rgb(var(--q-material-surface-rgb, 255, 255, 255)) !important;
                transform: scale(4, 4);
            }
            
            .q-material-slider > input::-moz-focus-outer {
                border: none;
            }
            
            /* MS | Track */
            .q-material-slider > input::-ms-track {
                box-sizing: border-box;
                margin: 17px 0;
                border: none;
                border-radius: 1px;
                padding: 0 17px;
                width: 100%;
                height: 2px;
                background-color: transparent;
            }
            
            .q-material-slider > input::-ms-fill-lower {
                border-radius: 1px;
                height: 2px;
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
            }
            
            /* MS | Progress */
            .q-material-slider > input::-ms-fill-upper {
                border-radius: 1px;
                height: 2px;
                background-color: rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.24);
            }
            
            /* MS | Thumb */
            .q-material-slider > input::-ms-thumb {
                appearance: none;
                margin: 0 17px;
                border: none;
                border-radius: 50%;
                height: 2px;
                width: 2px;
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                transform: scale(6, 6);
                transition: box-shadow 0.2s;
            }
            
            /* MS | Hover, Focus */
            .q-material-slider:hover > input::-ms-thumb {
                box-shadow: 0 0 0 2px rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.04);
            }
            
            .q-material-slider > input:focus::-ms-thumb {
                box-shadow: 0 0 0 2px rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.12);
            }
            
            .q-material-slider:hover > input:focus::-ms-thumb {
                box-shadow: 0 0 0 2px rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.16);
            }
            
            /* MS | Active */
            .q-material-slider > input:active::-ms-thumb {
                box-shadow: 0 0 0 2px rgba(var(--q-material-primary-rgb, 33, 150, 243), 0.24) !important;
            }
            
            /* MS | Disabled */
            .q-material-slider > input:disabled::-ms-fill-lower {
                background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
            }
            
            .q-material-slider > input:disabled::-ms-fill-upper {
                background-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
                opacity: 0.38;
            }
            
            .q-material-slider > input:disabled::-ms-thumb {
                background-color: rgb(var(--q-material-onsurface-rgb, 0, 0, 0));
                box-shadow: 0 0 0 1px rgb(var(--q-material-surface-rgb, 255, 255, 255)) !important;
                transform: scale(4, 4);
            }


            
            input::-webkit-slider-runnable-track {
                background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
            }
            
            input::-moz-range-track {
                background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
            }
            
            input::-ms-track {
                background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
            }
        
        `; 
    }
    
    constructor() {
        super({});
    }
}
defineQuantumElement('q-slider', qSlider);

/*TEXTINPUT*/
class qTextInput extends QuantumElement {
    template() {
        let css = 'q-material-textfield-standard';
        if (this.attrs.mode == 'outline') css = 'q-material-textfield-outlined';
        return <label className={css}>
                    <input ref="inpt" onKeyDown={e => this._change(e)} value={this.attrs.value} placeholder=" "/>
                    <span><slot></slot></span>
                </label>;
    }

    static get observedAttributes() {
        return ['mode', 'value'];
    }

    _change(event) {
        debounce(this._debounce.bind(this), 500)();
    }

    _debounce() {
        if(this.refs.inpt.value != this.getAttribute('value')) {
            this.setAttribute('value', this.refs.inpt.value);
        } 
    }

    getValue() {
        return this.refs.inpt.value;
    }

    styles() { 
        return `
            .q-material-textfield-outlined {
                --q-material-safari-helper1: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                position: relative;
                display: inline-block;
                padding-top: 6px;
                font-family: var(--q-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
                font-size: 16px;
                line-height: 1.5;
                overflow: hidden;
            }
            
            /* Input, Textarea */
            .q-material-textfield-outlined > input,
            .q-material-textfield-outlined > textarea {
                box-sizing: border-box;
                margin: 0;
                border: solid 1px; /* Safari */
                border-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.6);
                border-top-color: transparent;
                border-radius: 4px;
                padding: 15px 13px 15px;
                width: 100%;
                height: inherit;
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.87);
                background-color: transparent;
                box-shadow: none; /* Firefox */
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                caret-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                transition: border 0.2s, box-shadow 0.2s;
            }
            
            /* Span */
            .q-material-textfield-outlined > input + span,
            .q-material-textfield-outlined > textarea + span {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                border-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.6);
                width: 100%;
                max-height: 100%;
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.6);
                font-size: 75%;
                line-height: 15px;
                cursor: text;
                transition: color 0.2s, font-size 0.2s, line-height 0.2s;
            }
            
            /* Corners */
            .q-material-textfield-outlined > input + span::before,
            .q-material-textfield-outlined > input + span::after,
            .q-material-textfield-outlined > textarea + span::before,
            .q-material-textfield-outlined > textarea + span::after {
                content: "";
                display: block;
                box-sizing: border-box;
                margin-top: 6px;
                border-top: solid 1px;
                border-top-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.6);
                min-width: 10px;
                height: 8px;
                pointer-events: none;
                box-shadow: inset 0 1px transparent;
                transition: border-color 0.2s, box-shadow 0.2s;
            }
            
            .q-material-textfield-outlined > input + span::before,
            .q-material-textfield-outlined > textarea + span::before {
                margin-right: 4px;
                border-left: solid 1px transparent;
                border-radius: 4px 0;
            }
            
            .q-material-textfield-outlined > input + span::after,
            .q-material-textfield-outlined > textarea + span::after {
                flex-grow: 1;
                margin-left: 4px;
                border-right: solid 1px transparent;
                border-radius: 0 4px;
            }
            
            /* Hover */
            .q-material-textfield-outlined:hover > input,
            .q-material-textfield-outlined:hover > textarea {
                border-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.87);
                border-top-color: transparent;
            }
            
            .q-material-textfield-outlined:hover > input + span::before,
            .q-material-textfield-outlined:hover > textarea + span::before,
            .q-material-textfield-outlined:hover > input + span::after,
            .q-material-textfield-outlined:hover > textarea + span::after {
                border-top-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.87);
            }
            
            .q-material-textfield-outlined:hover > input:not(:focus):placeholder-shown,
            .q-material-textfield-outlined:hover > textarea:not(:focus):placeholder-shown {
                border-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.87);
            }
            
            /* Placeholder-shown */
            .q-material-textfield-outlined > input:not(:focus):placeholder-shown,
            .q-material-textfield-outlined > textarea:not(:focus):placeholder-shown {
                border-top-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.6);
            }
            
            .q-material-textfield-outlined > input:not(:focus):placeholder-shown + span,
            .q-material-textfield-outlined > textarea:not(:focus):placeholder-shown + span {
                font-size: inherit;
                line-height: 68px;
            }
            
            .q-material-textfield-outlined > input:not(:focus):placeholder-shown + span::before,
            .q-material-textfield-outlined > textarea:not(:focus):placeholder-shown + span::before,
            .q-material-textfield-outlined > input:not(:focus):placeholder-shown + span::after,
            .q-material-textfield-outlined > textarea:not(:focus):placeholder-shown + span::after {
                border-top-color: transparent;
            }
            
            /* Focus */
            .q-material-textfield-outlined > input:focus,
            .q-material-textfield-outlined > textarea:focus {
                border-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                border-top-color: transparent;
                box-shadow: inset 1px 0 var(--q-material-safari-helper1), inset -1px 0 var(--q-material-safari-helper1), inset 0 -1px var(--q-material-safari-helper1);
                outline: none;
            }
            
            .q-material-textfield-outlined > input:focus + span,
            .q-material-textfield-outlined > textarea:focus + span {
                color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
            }
            
            .q-material-textfield-outlined > input:focus + span::before,
            .q-material-textfield-outlined > input:focus + span::after,
            .q-material-textfield-outlined > textarea:focus + span::before,
            .q-material-textfield-outlined > textarea:focus + span::after {
                border-top-color: var(--q-material-safari-helper1) !important;
                box-shadow: inset 0 1px var(--q-material-safari-helper1);
            }
            
            /* Disabled */
            .q-material-textfield-outlined > input:disabled,
            .q-material-textfield-outlined > input:disabled + span,
            .q-material-textfield-outlined > textarea:disabled,
            .q-material-textfield-outlined > textarea:disabled + span {
                border-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
                border-top-color: transparent !important;
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
                pointer-events: none;
            }
            
            .q-material-textfield-outlined > input:disabled + span::before,
            .q-material-textfield-outlined > input:disabled + span::after,
            .q-material-textfield-outlined > textarea:disabled + span::before,
            .q-material-textfield-outlined > textarea:disabled + span::after {
                border-top-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
            }
            
            .q-material-textfield-outlined > input:disabled:placeholder-shown,
            .q-material-textfield-outlined > input:disabled:placeholder-shown + span,
            .q-material-textfield-outlined > textarea:disabled:placeholder-shown,
            .q-material-textfield-outlined > textarea:disabled:placeholder-shown + span {
                border-top-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
            }
            
            .q-material-textfield-outlined > input:disabled:placeholder-shown + span::before,
            .q-material-textfield-outlined > input:disabled:placeholder-shown + span::after,
            .q-material-textfield-outlined > textarea:disabled:placeholder-shown + span::before,
            .q-material-textfield-outlined > textarea:disabled:placeholder-shown + span::after {
                border-top-color: transparent !important;
            }
            
            /* Faster transition in Safari for less noticable fractional font-size issue */
            @media not all and (min-resolution:.001dpcm) {
                @supports (-webkit-appearance:none) {
                    .q-material-textfield-outlined > input,
                    .q-material-textfield-outlined > input + span,
                    .q-material-textfield-outlined > textarea,
                    .q-material-textfield-outlined > textarea + span,
                    .q-material-textfield-outlined > input + span::before,
                    .q-material-textfield-outlined > input + span::after,
                    .q-material-textfield-outlined > textarea + span::before,
                    .q-material-textfield-outlined > textarea + span::after {
                        transition-duration: 0.1s;
                    }
                }
            }
            .q-material-textfield-standard {
                position: relative;
                display: inline-block;
                font-family: var(--q-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
                font-size: 16px;
                line-height: 1.5;
                overflow: hidden;
            }
            
            /* Input, Textarea */
            .q-material-textfield-standard > input,
            .q-material-textfield-standard > textarea {
                display: block;
                box-sizing: border-box;
                margin: 0;
                border: none;
                border-top: solid 27px transparent;
                border-bottom: solid 1px rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.6);
                padding: 0 0 4px;
                width: 100%;
                height: inherit;
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.87);
                background-color: transparent;
                box-shadow: none; /* Firefox */
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                caret-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                transition: border-bottom 0.2s, background-color 0.2s;
            }
            
            /* Span */
            .q-material-textfield-standard > input + span,
            .q-material-textfield-standard > textarea + span {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: block;
                box-sizing: border-box;
                padding: 7px 0 0;
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.6);
                font-size: 75%;
                line-height: 18px;
                pointer-events: none;
                transition: color 0.2s, font-size 0.2s, line-height 0.2s;
            }
            
            /* Underline */
            .q-material-textfield-standard > input + span::after,
            .q-material-textfield-standard > textarea + span::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                display: block;
                width: 100%;
                height: 2px;
                background-color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
                transform-origin: bottom center;
                transform: scaleX(0);
                transition: transform 0.2s;
            }
            
            /* Hover */
            .q-material-textfield-standard > input:hover,
            .q-material-textfield-standard > textarea:hover {
                border-bottom-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.87);
            }
            
            /* Placeholder-shown */
            .q-material-textfield-standard > input:not(:focus):placeholder-shown + span,
            .q-material-textfield-standard > textarea:not(:focus):placeholder-shown + span {
                font-size: inherit;
                line-height: 56px;
            }
            
            /* Focus */
            .q-material-textfield-standard > input:focus,
            .q-material-textfield-standard > textarea:focus {
                outline: none;
            }
            
            .q-material-textfield-standard > input:focus + span,
            .q-material-textfield-standard > textarea:focus + span {
                color: rgb(var(--q-material-primary-rgb, 33, 150, 243));
            }
            
            .q-material-textfield-standard > input:focus + span::before,
            .q-material-textfield-standard > textarea:focus + span::before {
                opacity: 0.12;
            }
            
            .q-material-textfield-standard > input:focus + span::after,
            .q-material-textfield-standard > textarea:focus + span::after {
                transform: scale(1);
            }
            
            /* Disabled */
            .q-material-textfield-standard > input:disabled,
            .q-material-textfield-standard > textarea:disabled {
                border-bottom-color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
            }
            
            .q-material-textfield-standard > input:disabled + span,
            .q-material-textfield-standard > textarea:disabled + span {
                color: rgba(var(--q-material-onsurface-rgb, 0, 0, 0), 0.38);
            }
            
            /* Faster transition in Safari for less noticable fractional font-size issue */
            @media not all and (min-resolution:.001dpcm) {
                @supports (-webkit-appearance:none) {
                    .q-material-textfield-standard > input,
                    .q-material-textfield-standard > input + span,
                    .q-material-textfield-standard > input + span::after,
                    .q-material-textfield-standard > textarea,
                    .q-material-textfield-standard > textarea + span,
                    .q-material-textfield-standard > textarea + span::after {
                        transition-duration: 0.1s;
                    }
                }
            }
        `; 
    }
    
    constructor() {
        super({});
    }
}
defineQuantumElement('q-text-input', qTextInput);

/*STACK*/
class qStack extends QuantumElement {
    template() {
        return <slot></slot>;
    }

    styles() { return `
        :host {
            position: absolute;
            display: flex;
            flex-flow: column;
            height: 100%;
            width: 100%;
        }
    `; }

    constructor() {
        super({});        
    }
}
defineQuantumElement('q-stack', qStack);

/*ICON*/
class qIcon extends QuantumElement {
    template() {
        return <div>
                    <link rel="stylesheet" href="font-awesome.min.css"></link>
                    <i class={`fa fa-${this.attrs.icon} large`}></i>
                </div>;
    }

    static get observedAttributes() {
        return ['icon'];
    }

    styles() { return `
        :host {
            height: 32px;
            width: 32px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .xsmall {
            font-size: 70%;
        }
        
        .small {
            font-size: 85%;
        }
        
        .large {
            font-size: 140%;
        }
        
        .xlarge {
            font-size: 170%;
        }
    `; }

    constructor() {
        super({});
    }
}
defineQuantumElement('q-icon', qIcon);

/*DRAWER*/
class qDrawer extends QuantumElement {
    template() {
        return <div className="base">
                    <div onMouseDown={() => this.close()} className="backdrop"></div>
                    <div ref="content" className="content">
                        <slot></slot>
                    </div>
                </div>;
    }

    static get observedAttributes() {
        return ['open'];
    }

    isOpen() {
        return this.hasAttribute('open');
    }

    open() {
        if(this.isOpen()) return;
        this._removeInlineTransform();
        this.setAttribute('open', '');
        this.dispatchEvent(new CustomEvent('change', {'detail': this.hasAttribute('open')}));
    }

    close() {
        if(!this.isOpen()) return;
        this._removeInlineTransform();
        this.removeAttribute('open');
        this.dispatchEvent(new CustomEvent('change', {'detail': this.hasAttribute('open')}));
    }

    toggle() {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    componentMounted() {
        this.initDrawer();
    }

    componentUnmounted() {
        document.body.removeEventListener('click', this._listenerBody);
    }

    checkMobile(a) {
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
    }

    _swiping;
    _startX;
    _endSwipe;
    _move(e) {
        if (this._swiping) {
            let isMobile = this.checkMobile(navigator.userAgent || navigator.vendor || window.opera);
            let currX = isMobile ? e.touches[0].clientX : e.clientX;
            let x = this._startX - currX;
            let moveX = (-this.refs.content.offsetWidth  + (-x));
            if(moveX > 0) {
                moveX = 0;
            }
            //console.log(moveX);
            this._endSwipe = -x;
            this.style.transform = "translateX(" + moveX +"px)";
            e.preventDefault();
        }
    }
    _removeInlineTransform() {
        this.style.transform = "";
        this.style.transition = "";
    }

    _directive(e) {
        for(let tgts = 0; tgts < e.path.length; tgts++) {
            if(!e.path[tgts].hasAttribute) {}
            else if (e.path[tgts].hasAttribute('openmenu')) {
                this.open();
                return true;
            } else if (e.path[tgts].hasAttribute('togglemenu')) {
                this.toggle();
                return true;
            } else if (e.path[tgts].hasAttribute('closenmenu')) {
                this.close();
                return true;
            }
        }
        return true;
    }

    _listener;
    _listenerBody;
    initDrawer() {
        this._endSwipe = 0;
        this._listener = this._move.bind(this);
        this._swiping = false;
        let isMobile = this.checkMobile(navigator.userAgent || navigator.vendor || window.opera),
        isIE = window.navigator.msPointerEnabled,
        typeStart = isIE ? "MSPointerDown" : (isMobile ? "touchstart" : "mousedown"),
        typeMove = isIE ? "MSPointerMove" : (isMobile ? "touchmove" : "mousemove"),
        typeEnd = isIE ? "MSPointerUp" : (isMobile ? "touchend" : "mouseup");
        this._listenerBody = this._directive.bind(this);
        document.body.addEventListener('click', this._listenerBody);
        document.addEventListener(typeStart, (e) => {
            this._startX = isMobile ? e.touches[0].clientX : e.clientX;
            if ((!this.isOpen() && this._startX < 54)) {
                this._swiping = true;
                this.style.transition = "none";
                document.addEventListener(typeMove, this._listener);
            }// else if(this.isOpen() )
        });
        document.addEventListener(typeEnd, (e) => {
            if (this._swiping) {
                if (this._endSwipe > 150) {
                    this._endSwipe = 0;
                    this._removeInlineTransform();
                    this.open();
                } else {
                    this._endSwipe = 0;
                    this._removeInlineTransform();
                    this.close();
                }
                this._swiping = false;
            }
            document.removeEventListener(typeMove, this._listener);
        });
    }

    styles() { return `
        :host {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            z-index: 999;
            transform: translateX(-100%);
            transition: transform 0.3s ease-out;
        }
        :host([open]) {
            transform: translateX(0%);
        }
        :host([open]) .backdrop {
            opacity: 0.8;
        }
        .base {
            position: relative;
            top: 0px;
            box-sizing: border-box;
        }
        .base, .backdrop {
            width: 100%;
            height: 100%;
        }
        .backdrop {
            position: absolute;
            top: 0px;
            left: 0px;
            background-color: black;
            opacity: 0;
            z-index: 0;
            transition: opacity 0.3s ease-out;
        }
        .content {
            z-index: 1;
            position: relative;
            width: 70%;
            height: 100%;
            background-color: white;
            box-sizing: border-box;
            padding: 1px;
        }
    `; }

    constructor() {
        super({});
    }
}
defineQuantumElement('q-drawer', qDrawer);


/*ExampleApp*/
class exampleApp extends QuantumElement {
    template() {
        return <q-scafold>
                    <q-drawer>
                        <ul>
                            <li toggleMenu>Link</li>
                        </ul>
                    </q-drawer>
                    <q-appbar shadow>
                        <q-tolbar-button openMenu slot="start"><q-icon icon="bars"></q-icon></q-tolbar-button>
                        <span>{ this.props.title }</span>
                        <q-tolbar-button slot="end"><q-icon icon="music"></q-icon></q-tolbar-button>
                    </q-appbar>
                    <q-content>
                        <p>Prueba</p>
                        <q-button onClick={() => this.changeTitle()}><q-icon icon="music"></q-icon> Click</q-button>
                        <q-button onClick={() => this.changeTitle()}>Click</q-button>
                        <q-button mode="outline">Click</q-button>
                        <br/>
                        <br/>
                        <q-checkbox>Label</q-checkbox>
                        <br/>
                        <q-checkbox>Label</q-checkbox>
                        <br/>
                        <br/>
                        <q-radiobutton value="v1" checked group="grp1">Label</q-radiobutton>
                        <br/>
                        <q-radiobutton value="v2" group="grp1">Label</q-radiobutton>
                        <br/>
                        <br/>
                        <q-switch>Label</q-switch>
                        <br/>
                        <q-switch>Label</q-switch>
                        <br/>
                        <br/>
                        <q-slider>Label</q-slider>
                        <br/>
                        <br/>
                        <q-text-input>Label</q-text-input>
                        <br/>
                        <q-text-input value="test" mode="outline">Label</q-text-input>
                        <br/>
                        <br/>
                        <p>1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat tempus porta. Mauris faucibus, ipsum vel venenatis mattis, velit mauris placerat nisi, quis varius massa nisi et velit. Sed nec nulla vestibulum, pretium magna eu, tincidunt
                            velit. Vivamus tincidunt nec lectus maximus dictum. Morbi nec ultrices urna, nec feugiat eros. Nunc laoreet tincidunt neque, non rutrum lectus placerat id. Quisque vel lacus quis lacus facilisis maximus a sed dui. Nullam sed sapien a nulla
                            dictum porttitor. Sed non neque nulla. Sed tincidunt, augue ut ultrices finibus, orci mi maximus justo, eu facilisis felis eros in arcu. Vestibulum ac nisi odio. Nam eget nulla tellus. Nunc efficitur vitae purus sit amet gravida. Quisque
                            vel lorem a tellus rhoncus efficitur quis at orci. Quisque et libero vitae turpis pellentesque posuere. Sed ultrices id mi in dapibus. Quisque semper nulla nisi, vel commodo magna ultrices maximus. Sed a quam ut nisi bibendum molestie
                            in bibendum ligula. Mauris dui odio, ornare vel lobortis vel, feugiat ut orci. Cras lacinia sagittis iaculis.</p>
                    </q-content>
                </q-scafold>;
    }

    styles() { return `
        
    `; }

    changeTitle() {
        this.props.title = 'Inicio ' + Math.floor((Math.random() * 10) + 1);
    }

    constructor() {
        super({title: 'Inicio'});        
    }
}
defineQuantumElement('example-app', exampleApp);