import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

export default class qRippleContainer extends QuantumElement {
    public static tagName = 'q-ripplecontainer';
    styles() { return `
        :host {
            display: block;
            overflow: hidden;
            position: relative;
        }
        *[data-rippleEffect="box"] {
            transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            -webkit-transform: scale(1);
            background-color: rgba(0,0,0,0);
            height: 100%;
            left: 0;
            overflow: hidden;
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 2;
            pointer-events: none;
        }
        .rp {
            pointer-events: none;
        }
        /* Ripple Effect style (background, border-radius, time) */
        *[data-rippleEffect="effect"] {
            animation: rippleEffect 800ms forwards;
            -moz-animation: rippleEffect 800ms forwards;
            -o-animation: rippleEffect 800ms forwards;
            -webkit-animation: rippleEffect 800ms forwards;
            background-color: rgba(0,0,0,0.1);
            border-radius: 100%;
            position: absolute;
            opacity: 0;
        }
        
        /* Effect animation */
        @-webkit-keyframes rippleEffect {
            0% {
                transform: scale(0.0);
                -moz-transform: scale(0.0);
                -ms-transform: scale(0.0);
                -o-transform: scale(0.0);
                -webkit-transform: scale(0.0);
                opacity: 1;
            }
            
            50% {
                opacity: 1;
            }
            
            100% {
                transform: scale(1.0);
                -moz-transform: scale(1.0);
                -ms-transform: scale(1.0);
                -o-transform: scale(1.0);
                -webkit-transform: scale(1.0);
                opacity: 0;
            }
        }
        
        /* Effect animation */
        @keyframes rippleEffect {
            0% {
                transform: scale(0.0);
                -moz-transform: scale(0.0);
                -ms-transform: scale(0.0);
                -o-transform: scale(0.0);
                -webkit-transform: scale(0.0);
                opacity: 1;
            }
            
            50% {
                transform: scale(1.0);
                -moz-transform: scale(1.0);
                -ms-transform: scale(1.0);
                -o-transform: scale(1.0);
                -webkit-transform: scale(1.0);
                opacity: 1;
            }
            
            100% {
                opacity: 0;
            }
        }
    `; }

    template() {
        return <slot></slot>;
    }

    private _box: HTMLElement = null;

    rippleEffect(event:any) {
        // Getting the div that the effect is relative to
        var create = document.createElement('div'),
        
        // Getting the button's size, distance to top and left
        boxWidth = this._box.offsetWidth,
        boxHeight = this._box.offsetHeight,
        boxY = this._box.getBoundingClientRect().top,
        boxX = this._box.getBoundingClientRect().left,
        
        // Getting the mouse position
        mouseX = event.clientX || event.center.x,
        mouseY = event.clientY || event.center.y,
        
        // Mouse position relative to the box
        rippleX = mouseX - boxX,
        rippleY = mouseY - boxY,
        
        // Calculate which is the farthest corner
        rippleWidth = boxWidth / 2 < rippleX
                        ? rippleX
                        : boxWidth - rippleX,
        rippleHeight = boxHeight / 2 < rippleY
                        ? rippleY
                        : boxHeight - rippleY,
        
        // Distance to the farest corner
        boxSize = Math.sqrt(Math.pow(rippleWidth, 2) +
                            Math.pow(rippleHeight, 2)),
        
        // Getting the custom background value
        color = this.getAttribute('data-rippleEffectColor') || 'rgba(var(--q-material-primary-rgb), 0.3)',
        
        // Getting the custom Z-Index value
        zIndex = this.getAttribute('data-rippleEffectZIndex'),
        
        // Getting the button computed style
        thisStyle = window.getComputedStyle(this);
        
        // Creating and moving the effect div inside the button
        this._box.appendChild(create);
        
        // Ripple style (size, position, color and border-radius)
        create.classList.add('rp');
        create.setAttribute('data-rippleEffect', 'effect');
        create.style.height = 2 * boxSize + 'px';
        create.style.width = 2 * boxSize + 'px';
        create.style.top = mouseY - boxY - boxSize + 'px';
        create.style.left = mouseX - boxX - boxSize + 'px';
        create.style.backgroundColor = color;
        this._box.style.borderTopLeftRadius = 
            thisStyle.getPropertyValue('border-top-left-radius');
        this._box.style.borderTopRightRadius = 
            thisStyle.getPropertyValue('border-top-right-radius');
        this._box.style.borderBottomLeftRadius = 
            thisStyle.getPropertyValue('border-bottom-left-radius');
        this._box.style.borderBottomRightRadius = 
            thisStyle.getPropertyValue('border-bottom-right-radius');
        this._box.style.zIndex = zIndex;
        
        setTimeout(() => {
            create.remove();
        }, 800);
    }

    private _hmanager:HammerManager = null;
    componentLoaded() {
        this._hmanager = new Hammer.Manager(this);
        this._box = document.createElement('div');
        this.shadowRoot.appendChild(this._box);
        this._box.setAttribute('data-rippleEffect', 'box');
        const Press = new Hammer.Press({
            time: 500
        });
        this._hmanager.add(Press);
        const Tap = new Hammer.Tap();
        this._hmanager.add(Press);
        this._hmanager.add(Tap);
        this._hmanager.on('press', this.rippleEffect.bind(this));
        this._hmanager.on('tap', this.rippleEffect.bind(this));
    }

    componentUnmounted() {
        this._hmanager.destroy();
        this._hmanager = null;
    }

    automaticDetection = false;

    constructor() {
        super(false);        
    }
}