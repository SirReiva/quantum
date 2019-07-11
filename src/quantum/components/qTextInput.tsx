import QuantumElement from '../core/quantumElement';
import { h, debounce } from '../core/quantumCore';

const SUPPORT_TYPES = ['text', 'password', 'number', 'email'];
/*TEXTINPUT*/
export default class qTextInput extends QuantumElement {
    template() {
        let css = 'q-material-textfield-standard';
        if (this.attrs.mode == 'outline') css = 'q-material-textfield-outlined';
        let tp = (SUPPORT_TYPES.indexOf(this.attrs.type) !== -1)?this.attrs.type:'text';
        return <label className={css}>
                    <input type={tp} ref="inpt" onKeyDown={(e:any) => this._change(e)} value={this.attrs.value} placeholder=" "/>
                    <span><slot></slot></span>
                </label>;
    }

    static get observedAttributes() {
        return ['mode', 'value', 'type'];
    }

    _change(event: any) {
        debounce(this._debounce.bind(this), 500)();
    }

    _debounce() {
        if (this.refs.inpt.value != this.getAttribute('value')) {
            this.setAttribute('value', this.refs.inpt.value);
            this.dispatchEvent(new CustomEvent('change', {'detail': this.refs.inpt.value}));
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