import QuantumElement from '../core/quantumElement';
import { h, checkMobile } from '../core/quantumCore';

declare var Capacitor: any;
/*SLIDER*/
export default class qSlider extends QuantumElement {
    public static tagName = 'q-slider';
    template() {
        return <label className="q-material-slider">
                    <input onInput={(e:any) => this.changeColor(e)} ref="slide" type="range" min="0" max="360" value="207"/>
                    <span><slot></slot></span>
                </label>;
    }

    private listener:any = null;
    private isIE = window.navigator.msPointerEnabled;
    private typeMove: string;

    private prevents(e: any) {
        e.stopPropagation();
        return true;
    }

    componentLoaded() {
        this.listener = this.prevents.bind(this);
        this.typeMove = this.isIE ? "MSPointerMove" : (checkMobile ? "touchmove" : "mousemove");
        this.refs.slide.addEventListener(this.typeMove, this.listener, {passive: true});
    }

    componentUnmounted() {
        if (this.listener) this.refs.slide.removeEventListener(this.typeMove, this.listener);
    }

    changeColor(event: any) {
        let A = (n: number) => n > 1 ? 2 - n : n;
        let Y = 0.5166666666666666;
        const hsl2rgb = (H: number, S: number, L:number)=>[5,3,1].map(i=>A(L*2)*S*([1,Y,0,0,Y,1][(i-~H)%6]-.5)+L,Y=(A=n=>n>1?2-n:n)((H/=60)%2));
        const rgb = hsl2rgb(event.target.value, 0.897, 0.541);
        function componentToHex(c: number) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        function rgbToHex(r: number, g: number, b: number) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
        let r = Math.round(rgb[0] * 255),
            g = Math.round(rgb[1] * 255),
            b = Math.round(rgb[2] * 255);
        document.body.style.setProperty('--q-material-primary-rgb', `${r}, ${g}, ${b}`);
        try {
            Capacitor.Plugins.StatusBar.setBackgroundColor({ color: rgbToHex(r, g, b)});
            (window as any).plugins.headerColor.tint(rgbToHex(r, g, b));
        } catch(ex) { }
    }

    styles() { 
        return `
            :host {
                width: fit-content;
            }
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