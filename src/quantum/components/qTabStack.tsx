import QuantumElement from '../core/quantumElement';
import { h, isRegisteredQuantumElement, defineQuantumElement } from '../core/quantumCore';
import { TabRoute } from './utils/routes/index';
import { debounce } from 'lodash';

/*ROW*/
export default class qTabStack extends QuantumElement {
    public static tagName = 'q-tabstack';
    automaticDetection = false;
    template() {
        return false;
    }

    styles() { return `
        :host {
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            position: absolute;
            contain: layout size style;
            overflow-y: hidden;
            overflow-x: scroll;
            z-index: 0;
            scroll-snap-type: x mandatory;
            display: flex;
            flex-wrap: nowrap;
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
    `; }

    private _preloadRoutes() {
        let route: TabRoute;
        let i = 0;
        for (route of this.objectAttrs.routes) {
            this._preloadRoute(route, i);
            i++;
        }
    }

    private _preloadRoute(route: TabRoute, index: number) {
        if(route.resolve) {
            route.resolve().then((c: any) => {
                if(!isRegisteredQuantumElement(c.tagName)) {
                    defineQuantumElement(c);
                    this.addComponent(c, index); 
                } else {
                    this.addComponent(c, index); 
                }  
            });
        } else if(route.component) {
            this.addComponent(route.component, index); 
        }
    }

    insertChildAtIndex = function(child: HTMLElement, index: number) {
        if (index >= this.shadowRoot.children.length) {
          this.shadowRoot.appendChild(child);
        } else {
          this.shadowRoot.insertBefore(child, this.shadowRoot.children[index]);
        }
    }

    addComponent(c: QuantumElement, pos: number) {
        let page: HTMLElement = document.createElement(c.tagName);
        let container = document.createElement('div');
        container.classList.add('baseTab');
        container.appendChild(page);
        //this.shadowRoot.appendChild(container);
        this.insertChildAtIndex(container, pos);
    }

    getTabIndexPosition() {
        return Math.round(this.scrollLeft / this.clientWidth);
    }

    _waitFor :number = null;
    selectIndex(i: number, dptch = false) {
        const ci = this.getTabIndexPosition();
        if(i >= this.shadowRoot.querySelectorAll('.baseTab').length || ci === i || i < 0) return;
        this._currentIndex = i;
        this._waitFor = i * this.clientWidth;
        this.scrollTo({
            left: i * this.clientWidth,
            behavior: 'smooth'
        });
        if(dptch) this.dispatchEvent(new CustomEvent('change', {'detail': i}));
    }

    //private _stackElements: HTMLElement[] = [];

    componentLoaded() {
        this.addEventListener('scroll', this._onscroll);
        this._preloadRoutes();
    }

    componentUnmounted() {
        this.removeEventListener('scroll', this._onscroll);
    }

    private _currentIndex =  0;
    private _onscroll = debounce((e:any) => {
        if(this._waitFor === null) {
            const ci = this.getTabIndexPosition();
            if(this._currentIndex !== ci) {
                this._currentIndex = ci;
                this.dispatchEvent(new CustomEvent('change', {'detail': ci}));
            }
        } else {
            if(this._waitFor === this.scrollLeft) {
                this._waitFor = null;
            }            
        }
        
    }, 500, {maxWait: 500})

    static get observedAttributes() {
        return ['index'];
    }

    componentAttributeChange() {
        this.selectIndex(parseInt(this.getAttribute('index')));
    }

    constructor() {
        super({});
    }
}