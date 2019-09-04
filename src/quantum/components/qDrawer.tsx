import QuantumElement from '../core/quantumElement';
import { h, checkMobile } from '../core/quantumCore';

declare var window: any;
interface arrDrawer {
    [key: string]: qDrawer;
}
const isMobile = checkMobile(navigator.userAgent || navigator.vendor || window.opera);
const isIE = window.navigator.msPointerEnabled;
const typeMove = isIE ? "MSPointerMove" : (isMobile ? "touchmove" : "mousemove");
const typeStart = isIE ? "MSPointerDown" : (isMobile ? "touchstart" : "mousedown");
const typeEnd = isIE ? "MSPointerUp" : (isMobile ? "touchend" : "mouseup");
/*DRAWER*/
export default class qDrawer extends QuantumElement {
    public static tagName = 'q-drawer';
    template() {
        return <div ref="base" className="base">
                    <q-backdrop onClick={() => this.close()} ref="bckdrp"></q-backdrop>
                    <div ref="content" className="menu-inner">
                        <slot></slot>
                    </div>
                </div>;
    }

    static automaticDetection = false;
    
    styles() { return `
        .base {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            contain: strict;
            z-index: 9999;
        }
        .menu-inner {
            left: 0;
            right: auto;
            top: 0;
            bottom: 0;
            display: flex;
            position: absolute;        
            flex-direction: column;
            justify-content: space-between;
            transform: translate3d(-100%, 0px, 0px); 
            width: 250px;
            height: auto;
            contain: strict;
            background-color: white;
        }
        q-backdrop {
            display: none;
          
            opacity: .01;
            z-index: -1;
        }
        .show {
            display: block;
        }
        .show q-backdrop {
            display: block;
        }
    `; }

    private _isOpen = false;
    private _startswiping = false;
    private _swiping = false;
    private _listener: any;
    private _swipeDirection = 0;
    private _startX = 0;
    private _lastPercentage = 0;
    private _sensibillity = 14;

    _move(e: any) {
        let currX = isMobile ? e.touches[0].clientX : e.clientX;
        if (this._swiping) {
            const w = this.refs.content.offsetWidth;
            const per = Math.min((((currX - this._startX)/ w) * 100) - 100, 0);
            this._lastPercentage = per;
            this.refs.content.style.transform = 'translate3d(' + per +'%, 0px, 0px)';
            this.refs.bckdrp.style.opacity = ((((per + 100) / 100) * 0.31) + 0.01) + ''; 
            e.preventDefault();
            e.stopPropagation();
        } else if(this._startswiping) {
            if(Math.abs(this._startX - currX) > this._sensibillity) {
                this._swiping = true;
                this.refs.base.classList.add('show');
                e.preventDefault();
                e.stopPropagation();
            }
        }
        //return true;
    }

    componentLoaded() {
        if (this.attrs.menuid) qDrawer.instances[this.attrs.menuid] = this;
        this._init();
    }

    private _init() {
        this._listener = this._move.bind(this);
        document.addEventListener(typeStart, (e: any) => {
            let evX = isMobile ? e.touches[0].clientX : e.clientX;
            if ((!this._isOpen && evX < 24)) {
                this._swipeDirection = 1;
                this._startX = evX;
                this._startswiping = true;
                e.preventDefault();
                e.stopPropagation();
                document.body.addEventListener(typeMove, this._listener);
            } else if(this._isOpen) {
                this._swipeDirection = -1;
                this._startX = evX - this.refs.content.offsetWidth;
                this._startswiping = true;
                document.body.addEventListener(typeMove, this._listener);
            }
            //return true;
        }, true);
        document.addEventListener(typeEnd, (e: any) => {
            if (this._swiping) {
                if (this._swipeDirection == 1) {
                    if(this._lastPercentage > -65) {
                        this._openAnimation();
                    } else {
                        this._closeAnimation();
                    }
                } else if (this._swipeDirection == -1) {
                    if (this._lastPercentage < -35) {
                        this._closeAnimation();
                    } else {
                        this._openAnimation();
                    }
                }
                this._swiping = false;
                this._swipeDirection = 0;
            } else {
                this._swiping = false;
            }
            this._startswiping = false;
            document.body.removeEventListener(typeMove, this._listener);
            //return true;
        });
    }

    public static instances: arrDrawer = {};

    componentUnmounted() {
        let keys = Object.keys(qDrawer.instances);
        const pos = Object.values(qDrawer.instances).indexOf(this);
        if(pos > -1) {
            delete qDrawer.instances[keys[pos]];
        }
    }

    isOpen() {
        return this._isOpen;
    }


    open() {
        this._openAnimation();
    }

    _openAnimation() {
        this.refs.base.classList.add('show');
        const initT = this.refs.content.style.transform || 'translate3d(-100%, 0px, 0px)';
        const initO = parseFloat(this.refs.bckdrp.style.opacity) || 0;
        this.refs.content.style.willChange = 'transform';
        this.refs.bckdrp.style.willChange = 'opacity';
        this.refs.content.animate([
            { transform: initT }, 
            { transform: 'translate3d(0%, 0px, 0px)' }
        ], {
            duration: 300,
            easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        }).onfinish = () => {
            this.refs.content.style.willChange = '';
            this.refs.content.style.transform = 'translate3d(0%, 0px, 0px)';
            this._isOpen = true; 
        };
        this.refs.bckdrp.animate([
            { opacity: initO }, 
            { opacity: 0.32 }
        ], {
            duration: 300,
            easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        }).onfinish = () => {
            this.refs.bckdrp.style.willChange = '';
            this.refs.bckdrp.style.opacity = '0.32';
        };
    }

    _closeAnimation():Promise<null> {
        return new Promise((resolve, reject) => {
            const initT = this.refs.content.style.transform || 'translate3d(-100%, 0px, 0px)';
            const initO = parseFloat(this.refs.bckdrp.style.opacity) || 0;
            this.refs.content.style.willChange = 'transform';
            this.refs.bckdrp.style.willChange = 'opacity';
            this.refs.content.animate([
                { transform: initT }, 
                { transform: 'translate3d(-100%, 0px ,0px)' }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
            }).onfinish = () => {
                this.refs.content.style.willChange = '';
                this.refs.content.style.transform = 'translate3d(-100%, 0px ,0px)';
                this._isOpen = false; 
                this.refs.base.classList.remove('show');
                resolve();
            };
            this.refs.bckdrp.animate([
                { opacity: initO }, 
                { opacity: 0.01 }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
            }).onfinish = () => {
                this.refs.bckdrp.style.willChange = '';
                this.refs.bckdrp.style.opacity = '0.01';
            };
        });
    }

    close():Promise<null> {
        return this._closeAnimation();
    }

    toggle() {}

    constructor() {
        super({});
    }
}