import QuantumElement from '../core/quantumElement';
import { TabRoute } from './utils/routes/index';
import { debounce } from 'lodash';
import { h } from '../core/h';
import {
    isRegisteredQuantumElement,
    defineQuantumElement,
} from '../core/elements';

/*TABSTACK*/
export default class qTabStack extends QuantumElement {
    public static tagName = 'q-tabstack';
    automaticDetection = false;
    template() {
        return null;
    }

    styles() {
        return `
            :host {
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                position: absolute;
                contain: layout size style;
                overflow-y: hidden;
                overflow-x: hidden;
                z-index: 0;
                display: flex;
                flex-wrap: nowrap;
            }
            :host([animated]) {
                scroll-snap-type: x mandatory;
                overflow-x: scroll;
            }
            .baseTab {
                position: relative;
                display: inline-block;
                width: 100%;
                height: 100%;
                scroll-snap-align: center;
                flex: 0 0 auto;
                overflow: auto;
            }
            :host([hidebars])::-webkit-scrollbar {
                width: 0px;
            }
        `;
    }

    private _preloadRoutes() {
        let route: TabRoute;
        let i = 0;
        for (route of this.objectAttrs.routes) {
            this._preloadRoute(route, i);
            i++;
        }
    }

    private _preloadRoute(route: TabRoute, index: number) {
        if (route.resolve) {
            route.resolve().then((c: any) => {
                if (!isRegisteredQuantumElement(c.tagName)) {
                    defineQuantumElement(c);
                    this.addComponent(c, index);
                } else {
                    this.addComponent(c, index);
                }
            });
        } else if (route.component) {
            this.addComponent(route.component, index);
        }
    }

    /*private _insertChildAtIndex = function(child: HTMLElement | DocumentFragment, index: number) {
        if (index >= this.shadowRoot.children.length) {
            this.shadowRoot.appendChild(child);
        } else {
            this.shadowRoot.insertBefore(child, this.shadowRoot.children[index]);
        }
    }*/

    addComponent(c: QuantumElement, pos: number) {
        const frag = document.createDocumentFragment();
        let page: HTMLElement = document.createElement(c.tagName);
        let container = document.createElement('div');
        container.style.order = pos + '';
        container.classList.add('baseTab');
        container.appendChild(page);
        frag.appendChild(container);
        //this.shadowRoot.appendChild(container);
        this.shadowRoot.prepend(frag);
    }

    getTabIndexPosition() {
        return Math.round(this.scrollLeft / this.clientWidth);
    }

    private _waitFor: number = null;
    private _nextIndex: number = null;
    private _lastChange: number = null;
    private _timjePerf = 75;
    selectIndex(i: number) {
        const ci = this.getTabIndexPosition();
        const now = performance.now();
        if (
            i >= this.shadowRoot.querySelectorAll('.baseTab').length ||
            ci === i ||
            i < 0 ||
            this._nextIndex === i ||
            (this._lastChange && now - this._lastChange < this._timjePerf)
        )
            return;
        this._waitFor = i * this.clientWidth;
        this._nextIndex = i;
        this.scrollTo({
            left: i * this.clientWidth,
            behavior: this.hasAttribute('animated') ? 'smooth' : 'auto',
        });
        this._lastChange = now;
    }

    //private _stackElements: HTMLElement[] = [];

    componentLoaded() {
        this._preloadRoutes();
        this.addEventListener('scroll', this._onscroll);
    }

    componentUnmounted() {
        this.removeEventListener('scroll', this._onscroll);
    }

    private _currentIndex = 0;
    private _debonceTime = 350;
    private _onscroll = debounce(
        (e: any) => {
            const ci = this.getTabIndexPosition();
            if (this._waitFor !== null && this._waitFor === this.scrollLeft) {
                this._currentIndex = ci;
                this._nextIndex = null;
            } else {
                if (this._currentIndex !== ci) {
                    this._currentIndex = ci;
                    this._nextIndex = ci;
                    this.dispatchEvent(
                        new CustomEvent('change', { detail: ci })
                    );
                }
            }
            this._waitFor = null;
        },
        this._debonceTime,
        { maxWait: this._debonceTime }
    );

    static get observedAttributes() {
        return ['index'];
    }

    componentAttributeChange(name: string, oldVal: any, newVal: any) {
        this.selectIndex(parseInt(newVal));
    }

    constructor() {
        super(false);
    }
}
