import QuantumElement from '../core/quantumElement';
import { h } from '../core/h';

//loading="lazy"
/*IMAGE*/
export default class qImage extends QuantumElement {
    public static tagName = 'q-image';
    template() {
        return (
            <div className={'base ' + this.props.loaded}>
                <div className="loadImg">
                    <slot></slot>
                </div>
                <img
                    loading="lazy"
                    onLoad={() => this.imageloaded()}
                    className="mainImg"
                    ref="mainImg"
                    src={this.attrs.srcimg}
                />
            </div>
        );
    }
    styles() {
        return `
        :host {
            max-width: 100%;
            display: block; 
            position: relative;
            background-color: gray;
            min-height: 24px;
            overflow: hidden;
        }
        .base {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 100%;
            min-height: 100%;
            max-height: 100%;
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
            max-height: 100%;
        }
        .loaded .loadImg {
            display: none;
        }
        .loaded .mainImg {
            visibility: visible;
            opacity: 1;
        }
    `;
    }

    static get observedAttributes() {
        return ['srcimg'];
    }

    componentAttributeChange() {
        if (this.attrs.srcimg !== this.refs.mainImg.src) this.props.loaded = '';
        this.refs.mainImg.setAttribute('src', this.attrs.srcimg);
    }

    imageloaded() {
        this.props.loaded = 'loaded';
    }

    constructor() {
        super({ loaded: '' });
    }
}
