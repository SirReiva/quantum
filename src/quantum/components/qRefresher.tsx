import QuantumElement from '../core/quantumElement';
import { h } from '../core/h';
import { qContent } from '.';
import { checkMobile } from '../core/utils';

declare var window: any;

/*QREFRESHER*/
export default class qRefresher extends QuantumElement {
    public static tagName = 'q-refresher';
    template() {
        return  <slot></slot>;
    }

    styles() { return `
        :host {
            display: flex;
            height: 0px;
            width: 100%;
            overflow: hidden;
            justify-content: center;
            align-items: center;
        }
        :host([showing]) {
            -moz-transition: 0.3s;
            -ms-transition: 0.3s;
            -o-transition: 0.3s;
            -webkit-transition: 0.3s;
            transition: 0.3s;
            height: 96px;
        }
    `; }

    _disable = false;
    private _evParent: qContent = null;
    private _listener:any = null;
    private _startY:number = null;
    private _typeMove: string;
    private _typeStart: string;
    private _typeEnd: string;
    private _listDown :any = null;
    private _listUp: any = null;

    _move(e: any) {
        /*if (this._evParent.getScrollElement().scrollTop !== 0) {
            console.log('end');
            document.removeEventListener(this._typeMove, this._listener);
            return true;
        }*/
        
        let isMobile = checkMobile(navigator.userAgent || navigator.vendor || window.opera);
        let currY = isMobile ? e.touches[0].clientY : e.clientY;
        if(this._startY === null) {
            this._startY = currY;
        } else {
            this.style.height = Math.min(Math.max(0, currY - this._startY), 128) + "px";
        }
        /*if (this._evParent.getScrollElement().scrollTop !== 0)
            */
        e.preventDefault();
        return true;
    }

    componentMounted() {
        if (this.closest('q-content')) {
            this._listener = this._move.bind(this);
            this._evParent = (this.closest('q-content') as qContent);//this.offsetParent;
            let isMobile = checkMobile(navigator.userAgent || navigator.vendor || window.opera),
            isIE = window.navigator.msPointerEnabled;
            this._typeStart = isIE ? "MSPointerDown" : (isMobile ? "touchstart" : "mousedown");
            this._typeEnd = isIE ? "MSPointerUp" : (isMobile ? "touchend" : "mouseup");
            this._typeMove = isIE ? "MSPointerMove" : (isMobile ? "touchmove" : "mousemove");
            //this._listenerBody = this._directive.bind(this);
            //document.body.addEventListener('click', this._listenerBody);
            this._listDown = () => {
                if (this._evParent.getScrollElement().scrollTop === 0 && this._evParent.getScrollElement().offsetParent)
                this._evParent.addEventListener(this._typeMove, this._listener, { passive: false });
                return true;
            };
            this._listUp = () => {
                this._startY = null;
                this._evParent.removeEventListener(this._typeMove, this._listener);
                const mh = parseInt(this.style.height);
                    this.style.height = '';
                if (mh >= 48) {
                    this.setAttribute('showing', '');
                    this.dispatchEvent(new CustomEvent('refresh'));
                }
                return true;
            };
            this._evParent.addEventListener(this._typeStart, this._listDown, { passive: true });
            this._evParent.addEventListener(this._typeEnd, this._listUp);
        } else { console.log('not'); }
    }

    public complete() {
        this.removeAttribute('showing');
    }

    setEnable(v: boolean) {
        this._disable = !v;
    }

    componentUnmounted() {
        this._evParent.removeEventListener(this._typeStart, this._listDown);
        this._evParent.removeEventListener(this._typeEnd, this._listUp);
        this._evParent = null;
    }

    constructor() {
        super(false);
    }
}
