import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*RADIOBUTTON*/
export default class qRadioButton extends QuantumElement {
    public static tagName = 'q-radiobutton';

    template() {
        return <label className="q-material-radio">
                    <input ref="rb" value={this.attrs.value} checked={this.hasAttribute('checked')} onChange={(e:any) => this._changeInp(e)} type="radio" name={this.attrs.group}/>
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

    _changeInp(event: any) {
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
            :host {
                width: fit-content;
            }
            .q-material-radio {
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

    public static instances: qRadioButton[] = [];
    
    constructor() {
        super({});
        qRadioButton.instances.push(this);
    }
}