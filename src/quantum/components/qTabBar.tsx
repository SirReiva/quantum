import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*TABBAR*/
export default class qTabBar extends QuantumElement {
    public static tagName = 'q-tabbar';
    template() {
        return <div className="tab-wrap">
                    <input type="radio" name="tabs" id="tab1" checked/>
                    <div className="tab-label-content" id="tab1-content">
                        <label for="tab1">Tab 1</label>
                    </div>
                    <input type="radio" name="tabs" id="tab2"/>
                    <div className="tab-label-content" id="tab2-content">
                        <label for="tab2">Tab 2</label>
                    </div>
                    
                    <input type="radio" name="tabs" id="tab3"/>
                    <div className="tab-label-content" id="tab3-content">
                        <label for="tab3">Tab 3</label>
                    </div>
                
                    <input type="radio" name="tabs" id="tab4"/>
                    <div className="tab-label-content" id="tab4-content">
                        <label for="tab4">Tab 4</label>
                    </div>
                    
                    <div className="slide"></div>
                </div>;
    }

    styles() { return `
        :host {
            display: block;
            position: relative;
            flex: 0 1 auto;
            color: var(--app-font-color);
            position: relative;
            width: 100%;
            z-index: 1;
        }
        .tab-wrap {
            width: 50%;
            margin-left: 20%;
            position: relative;
            display: flex;
            top: -106px;
        }
        input[type="radio"][name="tabs"] {
            position: absolute;
            z-index: -1;
          }
        input[type="radio"][name="tabs"]:checked + .tab-label-content label {
            color: white;
        }
        input[type="radio"][name="tabs"]:checked + .tab-label-content .tab-content {
            display: block;
        }
    `; }

    constructor() {
        super({});
    }
}