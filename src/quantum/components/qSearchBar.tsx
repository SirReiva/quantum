import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';
import { debounce } from 'lodash';

/*SEARCHBAR*/
export default class qSearchBar extends QuantumElement {
    public static tagName = 'q-searchbar';
    template() {
        return <div className="toolbar-container">
                    <div className="bgBar"></div>
                    <div className="start"><slot name="start"></slot></div>
                    <div style={(this.hasAttribute('expanded')||this.hasAttribute('full'))?'':'display: none;'} className="title">
                        <input ref="inpt" onKeyDown={this.cchange} style={this.props.isSearching?'':'display: none;'} className="searchInput slideInDown" placeholder="Search..." type="text"/>
                        <slot className="slideInDown" style={!this.props.isSearching?'display: block;':'display: none;'}></slot>
                    </div>
                    <div className="end"><q-toolbarbutton onClick={() => this.searchClick()}><q-icon icon={this.props.isSearching?"times":"search"}></q-icon></q-toolbarbutton></div>
               </div>;
    }

    _debounce() {
        this.dispatchEvent(new CustomEvent('change', {'detail': this.refs.inpt.value}));
        console.log(this.refs.inpt.value);
    }
    
    private cchange = debounce(e => {
        this._debounce();
    }, 500);

    styles() { return `
        :host {
            flex: 0 1 auto;
            color: var(--app-font-color);
            position: relative;
            width: auto;
            z-index: 1;
            box-shadow: 0 1px 4px rgba(0,0,0,.25);
            border-bottom-right-radius: 12px;
            transition: border-bottom-right-radius ease 150ms, width ease 150ms;
            overflow: hidden;
        }
        :host([over]) {
            position: absolute;
        }
        :host([expanded]), :host([full]) {
            width: 100%;
            border-bottom-right-radius: 0px;
        }
        :host([transparent]) .bgBar {
            background: transparent;
        }
        .bgBar {
            top: 0px;
            left: 0px;
            z-index: -1;
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: var(--app-bar-opacity, 1);
            background: rgb(var(--q-material-primary-rgb));
        }
        .toolbar-container {
            padding: 4px;
            display: -ms-flexbox;
            display: flex;
            position: relative;
            -ms-flex-direction: row;
            flex-direction: row;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-pack: justify;
            width: 100%;
            min-height: 56px;
            contain: content;
            overflow: hidden;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }
        .start, .end {
            flex: 0 1 auto;
        }
        .title {
            flex: 1 1 auto;
            font-size: 1.6rem;
            font-family: "Roboto", "Segoe UI";
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 15px;
            padding-right: 15px;
        }
        .searchInput {
            padding: 9.5px 8px;
            width: 100%;
            border: 0;
            box-sizing: border-box;
            display: block;
            background-color: transparent;
            outline: none;
            color: var(--app-font-color);
            font-size: .7em;
            font-family: "Roboto", "Segoe UI";
        }
        .searchInput::-webkit-input-placeholder {
            color: lightgray;
        }
        .searchInput::-moz-placeholder {
            color: lightgray;
        }
        .searchInput:-ms-input-placeholder {
            color: lightgray;
        }
        .searchInput:-moz-placeholder {
            color: lightgray;
        }
        @-webkit-keyframes slideInDown {
            from {
                -webkit-transform: translate3d(0, -100%, 0);
                transform: translate3d(0, -100%, 0);
                visibility: visible;
            }
          
            to {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
          }
          
          @keyframes slideInDown {
            from {
                -webkit-transform: translate3d(0, -100%, 0);
                transform: translate3d(0, -100%, 0);
                visibility: visible;
            }
          
            to {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
          }
          
          .slideInDown {          
            -webkit-animation-duration: .3s;
            animation-duration: .3s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both
            -webkit-animation-name: slideInDown;
            animation-name: slideInDown;
          }
    `; }

    static get observedAttributes() {
        return ['expanded'];
    }

    private searchClick() {
        this.transaction(() => {
            if (this.hasAttribute('expanded')) {
                this.refs.inpt.value = '';
                this.removeAttribute('expanded');
            } else {
                this.setAttribute('expanded', '');
                setTimeout(() => this.refs.inpt.focus(), 155);
            }
            this.props.isSearching = !this.props.isSearching;
        });
    }

    toggleExpanded() {
        if (this.hasAttribute('expanded')) {
            this.removeAttribute('expanded');
        } else {
            this.setAttribute('expanded', '');
        }
    }

    constructor() {
        super({isSearching: false});
    }
}