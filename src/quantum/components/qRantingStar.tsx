import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*RATING BAR*/
export default class qRatingStar extends QuantumElement {
    public static tagName = 'q-ratingstar';
    template() {
        return  <div class="Stars" style={ "--rating: " + this.attrs.rating + ";" }></div>;
    }

    static get observedAttributes() {
        return ['rating'];
    }

    styles() { return `      
        .Stars {
            --percent: calc(var(--rating) / 5 * 100%);
            display: inline-block;
            font-size: var(--star-size);
            font-family: Times;
            line-height: 1;
        }
        .Stars::before {
            content: '★★★★★';
            letter-spacing: 3px;
            background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    `; }

    constructor() {
        super({});
    }
}