import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';


/*IMAGE*/
export default class qImage extends QuantumElement {
    public static tagName = 'q-image';
    template() {
        return  <div className={'base ' + this.props.loaded}>
                    <div className="loadImg">
                        <slot></slot>
                    </div>
                    <img onLoad={() => this.imageloaded()} className="mainImg" ref="mainImg"/>
                </div>;
    }
    styles() { return `
        :host {
            max-width: 100%;
            display: block; 
            position: relative;
            background-color: gray;
        }
        .base {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 100%;
            min-height: 100%;
        }
        .loadImg {
            position: absolute;
        }
        .mainImg {
            visibility: hidden;
            max-width: 100%;
            transition: visibility 0s linear, opacity .5s linear;
            display: block;
            opacity: 0;
        }
        .loaded .loadImg {
            display: none;
        }
        .loaded .mainImg {
            visibility: visible;
            opacity: 1;
        }
    `; }

    static get observedAttributes() {
        return ['srcimg'];
    }

    private observer :any = null;
    private observerListener: any = null;
    componentLoaded() {
        const config = {
            threshold: 0.01
        };
        this.observerListener =  this.onIntersection.bind(this);
        this.observer = new IntersectionObserver(this.observerListener, config);
        this.observer.observe(this);
    }

    onIntersection(entries: any[]) {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                this.refs.mainImg.setAttribute('src', this.attrs.srcimg);
                this.observer.unobserve(entry.target);
                this.observer && this.observer.disconnect();
                this.observer = null;
            }
        });
    }

    imageloaded() {
        this.props.loaded = 'loaded';
    }

    componentUnmounted() {
        this.observer && this.observer.disconnect();
        this.observer = null;
    }

    constructor() {
        super({ loaded: '' });
    }
}