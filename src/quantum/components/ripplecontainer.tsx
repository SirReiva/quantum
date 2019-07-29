import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*LISTITEM*/
export default class qRippleContainer extends QuantumElement {
    public static tagName = 'q-ripplecontainer';
    template() {
        return <button><slot></slot></button>;
    }

    styles() { return `
        :host {
            display: block;
            height: 100%;
            width: 100%;
        }
        /* Material style */
        button {
            display: contents;
            border: none;
            outline: none;
            position: relative;
            overflow: hidden;
            height: 100%;
            width: 100%;
        }
        button:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, .5);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%);
            transform-origin: 50% 50%;
            z-index: 2;
        }

        @keyframes ripple {
            0% {
                transform: scale(0, 0);
                opacity: 1;
            }
            20% {
                transform: scale(25, 25);
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: scale(40, 40);
            }
        }

        button:focus:not(:active)::after {
            animation: ripple 1s ease-out;
        }
    `; }

    constructor() {
        super({});
    }
}