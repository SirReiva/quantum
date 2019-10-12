import QuantumElement from '../core/quantumElement';
import { h } from '../core/h';
import { debounce } from 'lodash';
import qContent from './qContent';

/*INFINITESCROLL*/
export default class qInfiniteScroll extends QuantumElement {
    public static tagName = 'q-infinitescrol';
    template() {
        return  <div>
                    <slot></slot>
                </div>;
    }

    styles() { return `
        :host {
            display: block;
            width: 100%;
        }
        slot {
            display: none;
        }
        :host([showing]) slot {
            display: block;
        }
    `; }

    private _scrolled(e: any) {
        const scroller = this._evParent.getScrollElement();
        if((scroller.offsetHeight + scroller.scrollTop + 20 >= scroller.scrollHeight) && !this.hasAttribute('showing') && !this._disable) {
            this.setAttribute('showing', '');
            scroller.scrollTo(0, scroller.scrollHeight);
            this.dispatchEvent(new CustomEvent('loadmore'));
        }
    }

    private _scrollChange = debounce(e => {
        this._scrolled(e);
    }, 250);

    _disable = false;
    private _evParent: qContent = null;
    componentMounted() {
        if (this.closest('q-content')) {
            this._evParent = (this.closest('q-content') as qContent);//this.offsetParent;
            this._evParent.setAttribute('scollevents', '');
            this._evParent.addEventListener('scroll', this._scrollChange);
        } else { console.log('not'); }
    }

    public complete() {
        setTimeout(() => this.removeAttribute('showing'), 50);
    }

    setEnable(v: boolean) {
        this._disable = !v;
    }

    componentUnmounted() {
        this._evParent && this._evParent.removeEventListener('scroll', this._scrollChange);
        this._evParent = null;
    }

    constructor() {
        super(false);
    }
}
