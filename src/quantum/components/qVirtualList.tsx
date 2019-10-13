import QuantumElement from '../core/quantumElement';
import { h } from '../core/h';
import { qContent } from '.';
import { debounce } from 'lodash';

/*VIRTUAL LIST*/
export default class qVirtualList extends QuantumElement {
    public static tagName = 'q-virtuallist';
    template() {
        return  <div ref="base" className="vBase">
                    {this.objectAttrs.items && this._arrIt &&
                        this._arrIt.filter(i => i != null)
                        .map((item: number, index:number) => 
                            <div style={'transform: translate3d(0, ' + item * this._itemHeight + 'px, 0); height: ' + this._itemHeight + 'px;'} className="vRow">
                                {this.objectAttrs.renderitem(this.objectAttrs.items[item], item)}
                            </div>
                        )}
                </div>;
    }

    styles() { return `
        :host {
            width: 100%;
            display: block;
        }
        .vBase {
            width: 100%;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
        }
        .vRow {
            position: absolute;
            box-sizing: border-box;
            padding-left: 5px;
            padding-right: 5px;
            width: 100%;
            will-change: transform;
            top: 0 !important;
            right: 0 !important;
            left: 0 !important;
            transition-duration: 0ms;
            display: flex;
            align-items: center;
        }
    `; }

    private _itemHeight = 50;
    private _screenItemsLen: number = null;
    private _current = 0;
    private _arrIt: number[];
    private _evParent: qContent;
    private _cacheItems = 0;

    static get observedAttributes() {
        return ['items', 'renderitem'];
    }

    componentAttributeChange() {
        this.refs.base.style.height = this.objectAttrs.items.length * this._itemHeight + "px";
        this._reestructFromIndex();
        this.refresh();
    }


    /*private _indexOfMax(arr: number[]) {
        if (arr.length === 0) {
            return -1;
        }
    
        var max = arr[0];
        var maxIndex = 0;
    
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
    
        return maxIndex;
    }
    private _indexOfMin(arr: number[]) {
        if (arr.length === 0) {
            return -1;
        }
    
        var max = arr[0];
        var maxIndex = 0;
    
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < max) {
                maxIndex = i;
                max = arr[i];
            }
        }
    
        return maxIndex;
    }
    private _swapPrev() {
        const prevIndex = Math.min(...this._arrIt) - 1;
        if(prevIndex > -1) {
            const changeIndex = this._indexOfMax(this._arrIt);
            this._arrIt[changeIndex] = prevIndex;
        }
    }
    private _swapNext() {
        const nextIndex = Math.max(...this._arrIt) + 1;
        if(nextIndex < this.objectAttrs.items.length) {    
            const changeIndex = this._indexOfMin(this._arrIt);
            this._arrIt[changeIndex] = nextIndex;
        }
    }
    private _scrollChange(e: any) {
        let scrollTop: number = this._evParent.getScrollElement().scrollTop;
        const curr = scrollTop / this._itemHeight;
        const df = this._current - curr;
        if(df > this._constPercent) {
            this._current = curr;
            this._reestructFromIndex();
            this.refresh();
        }
        else if(df < -this._constPercent) {
            this._current = curr;
            this._reestructFromIndex();
            this.refresh();
        }
    }*/

    private _reestructFromIndex() {
        if(!this.objectAttrs.items || this.objectAttrs.items.length === 0) return;
        this._screenItemsLen = Math.ceil(this._evParent.getScrollElement().offsetHeight / this._itemHeight);
        this._cacheItems = this._screenItemsLen * 4;
        let scrollTop: number = this._evParent.getScrollElement().scrollTop;
        const curr = Math.round(scrollTop / this._itemHeight);
        const middle = this._cacheItems / 2;
        let curIndex = 0;
        let startIndex = Math.max(0, curr - middle);
        let endIndex = Math.min(this.objectAttrs.items.length, curr + middle);
        const prevArr = this._arrIt.slice(0);
        this._arrIt = [];
        for(let i = startIndex; i < endIndex; i++) {
            this._arrIt.push(i);
            curIndex = i;
        }
        if(this._arrIt.length < this._cacheItems && this._cacheItems < this.objectAttrs.items.length ) {
            const df = this._cacheItems - this._arrIt.length;
            if(curIndex == this.objectAttrs.items.length - 1) {
                for(let i = 0; i < df; i++) {
                    if(curIndex - 1 - i > - 1)
                        this._arrIt.unshift(curIndex - 1 - i);
                    else 
                        break;
                }
            } else {
                for(let i = 0; i < df; i++) {
                    if(curIndex + 1 + i < this.objectAttrs.items.length)
                        this._arrIt.push(curIndex + 1 + i);
                    else 
                        break;
                }
            }
        }
        //
        /*console.clear();
        console.log(scrollTop);
        this.shadowRoot.querySelectorAll('.vRow').forEach((el: HTMLElement) => {
            console.log(el , isInViewport(el));
        });*/

        const adf = this._arrIt.filter(i => prevArr.indexOf(i) === -1);
        const instersecarr = this._arrIt.filter(i => prevArr.indexOf(i) !== -1);
        this._arrIt = [...adf, ...instersecarr];

        /*console.log(this._arrIt);
        console.log(adf, instersecarr);
        console.log(this._arrIt);
        console.log('-----------');*/
    }

    private readonly _constPercent = 2.1;
    private _scrollChangeD = debounce(e => {
        let scrollTop: number = this._evParent.getScrollElement().scrollTop;
        const curr = scrollTop / this._itemHeight;
        const df = this._current - curr;
        if(df > this._constPercent) {
            this._current = curr;
            this._reestructFromIndex();
            this.refresh();
        }
        else if(df < -this._constPercent) {
            this._current = curr;
            this._reestructFromIndex();
            this.refresh();
        }
    }, 50, {maxWait: 50});


    componentLoaded() {
        if (this.closest('q-content')) {
            this._evParent = (this.closest('q-content') as qContent);//this.offsetParent;
            this._evParent.setAttribute('scollevents', '');
            this._itemHeight = parseInt(this.getAttribute('itemheight')) | 50;
            this._screenItemsLen = Math.ceil(this._evParent.getScrollElement().offsetHeight / this._itemHeight);
            this._cacheItems = this._screenItemsLen * 4;
            this._evParent.addEventListener('scroll', this._scrollChangeD);
            this._arrIt = [];
            this.refs.base.style.height = this.objectAttrs.items.length * this._itemHeight + "px";
            this._reestructFromIndex();
            this.refresh();
        } else { console.error('not q-content found parent'); }
    }

    componentUnmounted() {
        this._evParent && this._evParent.removeEventListener('scroll', this._scrollChangeD);
        this._evParent = null;
        this._arrIt = null;
    }

    constructor() {
        super(false);
    }
}