import QuantumElement from './quantumElement.js';
import { h, defineQuantumElement, compileTemplateString } from './quantumCore.js';

class myitem extends QuantumElement {
    styles() {
        return `
            img {
                height: 96px;
            }
        `;
    }

    //<img src={ 'https://picsum.photos/200/300?random=' + this.attrs.data.title }/>
    template() {
        /*return <li>
                    {
                        this.attrs.data &&
                        <div>
                            <b><slot></slot></b> - <label ref="label">{this.attrs.data.title}</label>
                        </div>
                    }
                </li>;*/

        /*Prueba compilador plantillas*/
        return compileTemplateString(`<div><img src="https://picsum.photos/200/300?random=${this.attrs.data.title}"/><slot></slot> - <b>${this.attrs.data.title}</b></div>`);
    }

    static get observedAttributes() {
        return ['data'];
    }

    constructor() {
        super({img: Math.floor(Math.random() * 10)});
    }

}

defineQuantumElement('my-item', myitem);

class mylist extends QuantumElement {
    template() {
        return <div>
                <mat-button ref="btnRender" onclick={(e) => this.btnClick(e)}>Render</mat-button>
                <mat-button ref="btnUpdate" onclick={(e) => this.updateOne(e)}>Render One </mat-button>
                <ul>
                {
                    this.props.items.map((item, index) => <my-item data={ item }>{ index + 1 }</my-item>)
                }
                </ul>
        </div>;
    }

    styles() { return ``; }

    updateOne() {
        let n = Math.floor((Math.random() * 10) + 1) + '';
        if (this.props.items[0]) this.props.items[0].title = n;
    }

    btnClick() {
        let tempList = [];
        let max = Math.floor((Math.random() * 10) + 1);
        for(let i = 0; i < max; i++) {
            tempList.push({
                title: Math.floor((Math.random() * 10) + 1) + ''
            });
        }
        //console.log(max, tempList.map(i => i.title).join(', '));
        this.props.items = tempList;
        // this.props.items
    }


    static get observedAttributes() {
        return [];
    }

    constructor() {
        super({ items: []});
        //setInterval(this.btnClick.bind(this), 2000);
        
        //console.log(xmlToJson(xmlDoc));
    }
}

defineQuantumElement('my-list', mylist);

class matbutton extends QuantumElement {
    template() {
        return <button>
                    <slot></slot>
                </button>;
    }

    styles() { 
        return `
            :host {
                display: inline-block;
            }
            button {
                position: relative;
                display: inline-block;
                box-sizing: border-box;
                border: none;
                border-radius: 4px;
                padding: 0 16px;
                min-width: 64px;
                height: 36px;
                vertical-align: middle;
                text-align: center;
                text-overflow: ellipsis;
                text-transform: uppercase;
                color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
                background-color: var(--pure-material-primary-rgb);
                box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
                font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
                font-size: 14px;
                font-weight: 500;
                line-height: 36px;
                overflow: hidden;
                outline: none;
                cursor: pointer;
                transition: box-shadow 0.2s;
            }
            
            button::-moz-focus-inner {
                border: none;
            }
            
            /* Overlay */
            button::before {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
                opacity: 0;
                transition: opacity 0.2s;
            }
            
            /* Ripple */
            button::after {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                border-radius: 50%;
                padding: 50%;
                width: 32px; /* Safari */
                height: 32px; /* Safari */
                background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
                opacity: 0;
                transform: translate(-50%, -50%) scale(1);
                transition: opacity 1s, transform 0.5s;
            }
            
            /* Hover, Focus */
            button:hover,
            button:focus {
                box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
            }
            
            button:hover::before {
                opacity: 0.08;
            }
            
            button:focus::before {
                opacity: 0.24;
            }
            
            button:hover:focus::before {
                opacity: 0.3;
            }
            
            /* Active */
            button:active {
                box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
            }
            
            button:active::after {
                opacity: 0.32;
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0s;
            }
            
            /* Disabled */
            button:disabled {
                color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
                background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.12);
                box-shadow: none;
                cursor: initial;
            }
            
            button:disabled::before {
                opacity: 0;
            }
            
            button:disabled::after {
                opacity: 0;
            }
        `; 
    }

   
    static get observedAttributes() {
        return [];
    }

    constructor() {
        super({});
    }
}

defineQuantumElement('mat-button', matbutton);

class matappbar extends QuantumElement {
    template() {
        return <div class="nav">
                    <input type="checkbox" id="nav-check"/>
                    <div class="nav-header">
                        <div class="nav-title">
                            JoGeek
                        </div>
                    </div>
                    <div class="nav-btn">
                        <label for="nav-check">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                    
                    <div class="nav-links">
                        <a href="//github.io/jo_geek" target="_blank">Github</a>
                        <a href="http://stackoverflow.com/users/4084003/" target="_blank">Stackoverflow</a>
                        <a href="https://in.linkedin.com/in/jonesvinothjoseph" target="_blank">LinkedIn</a>
                        <a href="https://codepen.io/jo_Geek/" target="_blank">Codepen</a>
                        <a href="https://jsfiddle.net/user/jo_Geek/" target="_blank">JsFiddle</a>
                    </div>
                </div>;
    }

    styles() { 
        return `
        * {
            box-sizing: border-box;
          }
          
          .nav {
            height: 50px;
            width: 100%;
            background-color: #4d4d4d;
            position: relative;
          }
          
          .nav > .nav-header {
            display: inline-block;
          }
          
          .nav > .nav-header > .nav-title {
            font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
            display: inline-block;
            font-size: 22px;
            color: #fff;
            padding: 10px 10px 10px 10px;
          }
          
          .nav > .nav-btn {
            display: none;
          }
          
          .nav > .nav-links {
            display: inline;
            float: right;
            font-size: 18px;
            z-index: 9999;
          }
          
          .nav > .nav-links > a {
            display: inline-block;
            padding: 13px 10px 13px 10px;
            text-decoration: none;
            color: #efefef;
          }
          
          .nav > .nav-links > a:hover {
            background-color: rgba(0, 0, 0, 0.3);
          }
          
          .nav > #nav-check {
            display: none;
          }
          
          @media (max-width:600px) {
            .nav > .nav-btn {
              display: inline-block;
              position: absolute;
              right: 0px;
              top: 0px;
            }
            .nav > .nav-btn > label {
              display: inline-block;
              width: 50px;
              height: 50px;
              padding: 13px;
            }
            .nav > .nav-btn > label:hover,.nav  #nav-check:checked ~ .nav-btn > label {
              background-color: rgba(0, 0, 0, 0.3);
            }
            .nav > .nav-btn > label > span {
              display: block;
              width: 25px;
              height: 10px;
              border-top: 2px solid #eee;
            }
            .nav > .nav-links {
              position: absolute;
              display: block;
              width: 100%;
              background-color: #333;
              height: 0px;
              transition: all 0.3s ease-in;
              overflow-y: hidden;
              top: 50px;
              left: 0px;
            }
            .nav > .nav-links > a {
              display: block;
              width: 100%;
            }
            .nav > #nav-check:not(:checked) ~ .nav-links {
              height: 0px;
            }
            .nav > #nav-check:checked ~ .nav-links {
              height: calc(100vh - 50px);
              overflow-y: auto;
            }
          }
        `; 
    }

   
    static get observedAttributes() {
        return [];
    }

    constructor() {
        super({});
    }
}

defineQuantumElement('mat-appbar', matappbar);

