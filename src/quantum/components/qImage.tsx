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
            min-heigt: 24px;
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
            background-position: center;
            background-size: contain;
        }
        .loaded .loadImg {
            display: none;
        }
        .loaded .mainImg {
            visibility: visible;
            opacity: 1;
        }
    `; }

    public static observer: any;
    public static obsevableCount = 0;
    public static createObsever() {
        const config = {
            threshold: 0.01
        };
        qImage.observer = new IntersectionObserver(qImage.onIntersection, config);
    }

    static get observedAttributes() {
        return ['srcimg'];
    }

    componentAttributeChange() {
        //console.log(this.attrs.srcimg, this.refs.mainImg.src);
        this.refs.mainImg.setAttribute('src', this.attrs.srcimg);
    }
    componentLoaded() {
        if(!qImage.observer) {
            qImage.createObsever();
        }
        qImage.observer.observe(this);
        qImage.obsevableCount++;
    }

    public static onIntersection(entries: any[]) {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                (entry.target as qImage).viewIntersect();
                qImage.observer.unobserve(entry.target);
                qImage.obsevableCount--;
                if(qImage.obsevableCount <= 0) {
                    qImage.observer.disconnect();
                    qImage.observer = null;
                }
            }
        });
    }

    public viewIntersect() {
        this.refs.mainImg.setAttribute('src', this.attrs.srcimg);
    }

    imageloaded() {
        this.props.loaded = 'loaded';
    }

    componentUnmounted() {
        qImage.observer && qImage.observer.unobserve(this);
    }

    constructor() {
        super({ loaded: '' });
    }
}

