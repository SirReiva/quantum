import QuantumElement from '../core/quantumElement';
import { h, checkMobile } from '../core/quantumCore';

declare var window: any;
interface arrDrawer {
    [key: string]: qDrawer;
}
/*DRAWER*/
export default class qDrawer extends QuantumElement {
    public static tagName = 'q-drawer';
    template() {
        return <div className="base">
                    <div ref="backdrop" onMouseDown={() => this.close()} className="backdrop"></div>
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

    automaticDetection = false;

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

    componentLoaded() {
        if (this.attrs.menuid) qDrawer.instances[this.attrs.menuid] = this;
    }

    public static instances: arrDrawer = {};

    componentUnmounted() {
        let keys = Object.keys(qDrawer.instances);
        const pos = Object.values(qDrawer.instances).indexOf(this);
        if(pos > -1) {
            delete qDrawer.instances[keys[pos]];
        }
        //document.body.removeEventListener('click', this._listenerBody);
    }

    async _directive(e: any) {
        if(e.path) {
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
        } else {
            let fd = this.findDirective(e.originalTarget);
            if(fd) {
                if(!fd.hasAttribute) {}
                else if (fd.hasAttribute('openmenu')) {
                    this.open();
                    return true;
                } else if (fd.hasAttribute('togglemenu')) {
                    this.toggle();
                    return true;
                } else if (fd.hasAttribute('closenmenu')) {
                    this.close();
                    return true;
                }
            }
        }        
        return true;
    }

    private findDirective(el: any) {
        try {
            while (el){
                if (el.hasAttribute && (el.hasAttribute('openmenu') || el.hasAttribute('togglemenu') || el.hasAttribute('closenmenu'))) {
                    return el;
                }
                if(el.parentNode) el = el.parentNode;
                else if(el.host) el = el.host;
                else el = null;
            }
        } catch(exc) { return null; }
        
        return null;
    }


    _swiping: any;
    _startX: any;
    _endSwipe: any;
    _swipeDirection: any;
    _sensibillity = 10;
    _move(e: any) {
        if (this._swiping) {
            let isMobile = checkMobile(navigator.userAgent || navigator.vendor || window.opera);
            let currX = isMobile ? e.touches[0].clientX : e.clientX;
            let x = this._startX - currX;
            let moveX = (-this.refs.content.offsetWidth  + (-x));
            if(moveX > 0) {
                moveX = 0;
            }
            this._endSwipe = moveX;
            this.style.transform = "translateX(" + moveX +"px)";
            this.refs.backdrop.style.opacity = 1 - (0.8 * (-moveX / this.refs.content.offsetWidth)) - 0.2;
            if(Math.abs(x) > this._sensibillity) {
                this.style.transition = "none";
            }
            e.preventDefault();
        }
        return true;
    }
    _removeInlineTransform() {
        if(this.style.transform) this.style.transform = "";
        if(this.style.transition) this.style.transition = "";
        if(this.refs.backdrop.style.opacity) this.refs.backdrop.style.opacity = null;
    }

    _listener: any;
    _listenerBody: any;
    initDrawer() {
        this._endSwipe = null;
        this._swipeDirection = 0;
        this._listener = this._move.bind(this);
        this._swiping = false;
        let isMobile = checkMobile(navigator.userAgent || navigator.vendor || window.opera),
        isIE = window.navigator.msPointerEnabled,
        typeStart = isIE ? "MSPointerDown" : (isMobile ? "touchstart" : "mousedown"),
        typeMove = isIE ? "MSPointerMove" : (isMobile ? "touchmove" : "mousemove"),
        typeEnd = isIE ? "MSPointerUp" : (isMobile ? "touchend" : "mouseup");
        //this._listenerBody = this._directive.bind(this);
        //document.body.addEventListener('click', this._listenerBody);
        document.addEventListener(typeStart, (e: any) => {
            let evX = isMobile ? e.touches[0].clientX : e.clientX;
            if ((!this.isOpen() && evX < 54)) {
                this._swipeDirection = 1;
                this._startX = evX;
                this._swiping = true;
                /*this.style.transition = "none";
                this.refs.backdrop.style.display = 'block';*/
                document.addEventListener(typeMove, this._listener);
            } else if(this.isOpen()) {
                this._swipeDirection = -1;
                this._startX = evX - this.refs.content.offsetWidth;
                this._swiping = true;
                this.style.transition = "none";
                document.addEventListener(typeMove, this._listener);
            }
            return true;
        });
        document.addEventListener(typeEnd, (e: any) => {
            if (this._swiping && this._endSwipe !== null) {
                if (this._swipeDirection == 1) {
                    this._removeInlineTransform();
                    if(this._endSwipe + this.refs.content.offsetWidth > 150) {
                        this.open();
                    } else {
                        this.close();
                    }
                    this._endSwipe = null;
                } else if (this._swipeDirection == -1) {
                    this._removeInlineTransform();
                    if (-this._endSwipe > 150) {
                        this.close();
                    } else {
                        this.open();
                    }
                    this._endSwipe = null;
                }
                this._swiping = false;
                this._swipeDirection = 0;
            } else {
                this._swiping = false;
                this._removeInlineTransform();
            }
            document.removeEventListener(typeMove, this._listener);
            return true;
        });
    }

    styles() { return `
        :host {
            display: inline-block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            z-index: 999;
            transform: translateX(-100%);
            transition: transform 0.3s ease-out;
            will-change: transform;
            overflow: visible;
            contain: layout size style;
            overscroll-behavior-x: none;
        }
        :host([open]) {
            transform: translateX(0%);
        }
        :host([open]) .backdrop {
            opacity: 0.8;
            pointer-events: auto;
        }
        .base {
            position: relative;
            top: 0px;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            overflow: visible;
        }
        .backdrop {
            width: 200%;
            height: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            background-color: black;
            opacity: 0;
            z-index: 0;
            transition: opacity 0.3s ease-out;
            pointer-events: none;
            will-change: opacity;
        }
        .content {
            z-index: 1;
            position: relative;
            width: 70%;
            height: 100%;
            background-color: white;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
        }
    `; }

    constructor() {
        super({});
    }
}