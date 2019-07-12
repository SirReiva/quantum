import QuantumElement from '../core/quantumElement';
import { h, defineQuantumElement } from '../core/quantumCore';

declare var window: any;
/*DRAWER*/
export default class qDrawer extends QuantumElement {
    public static tagName = 'q-drawer';
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

    

    _checkMobile(a: string) {
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
    }

    _swiping: any;
    _startX: any;
    _endSwipe: any;
    _swipeDirection: any;
    _move(e: any) {
        if (this._swiping) {
            let isMobile = this._checkMobile(navigator.userAgent || navigator.vendor || window.opera);
            let currX = isMobile ? e.touches[0].clientX : e.clientX;
            let x = this._startX - currX;
            let moveX = (-this.refs.content.offsetWidth  + (-x));
            if(moveX > 0) {
                moveX = 0;
            }
            this._endSwipe = moveX;
            this.style.transform = "translateX(" + moveX +"px)";
            e.preventDefault();
        }
    }
    _removeInlineTransform() {
        this.style.transform = "";
        this.style.transition = "";
    }

    _listener: any;
    _listenerBody: any;
    initDrawer() {
        this._endSwipe = null;
        this._swipeDirection = 0;
        this._listener = this._move.bind(this);
        this._swiping = false;
        let isMobile = this._checkMobile(navigator.userAgent || navigator.vendor || window.opera),
        isIE = window.navigator.msPointerEnabled,
        typeStart = isIE ? "MSPointerDown" : (isMobile ? "touchstart" : "mousedown"),
        typeMove = isIE ? "MSPointerMove" : (isMobile ? "touchmove" : "mousemove"),
        typeEnd = isIE ? "MSPointerUp" : (isMobile ? "touchend" : "mouseup");
        this._listenerBody = this._directive.bind(this);
        document.body.addEventListener('click', this._listenerBody);
        document.addEventListener(typeStart, (e: any) => {
            let evX = isMobile ? e.touches[0].clientX : e.clientX;
            if ((!this.isOpen() && evX < 54)) {
                this._swipeDirection = 1;
                this._startX = evX;
                this._swiping = true;
                this.style.transition = "none";
                document.addEventListener(typeMove, this._listener);
            } else if(this.isOpen()) {
                this._swipeDirection = -1;
                this._startX = evX - this.refs.content.offsetWidth;
                this._swiping = true;
                this.style.transition = "none";
                document.addEventListener(typeMove, this._listener);
            }
        });
        document.addEventListener(typeEnd, (e) => {
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
            display: flex;
        }
    `; }

    constructor() {
        super({});
    }
}