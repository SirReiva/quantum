import QuantumElement from '../core/quantumElement';
import { h } from '../core/quantumCore';

/*STACK*/
export default class qCard extends QuantumElement {
    public static tagName = 'q-card';
    template() {
        return  <div className="card" elevation="2">
                    <div className="header">
                      <slot name="header"></slot>
                    </div>
                    <slot name="img"></slot>
                    <div className="supporting_text">
                      <slot></slot>
                    </div>
                    <div className="supplemental_actions">
                        <div className="left">
                          <slot name="leftFooter"></slot>
                        </div>
                        <div className="right">
                            <slot name="rightFooter"></slot>
                        </div>
                    </div>
                </div>;
    }

    styles() { return `
        :host {
            width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
            display: block;
        }
        * {
            font-family: 'Roboto', sans-serif;
          }
          .card {
            display: block;
            width: 100%;
            padding: 0px;
            background-color: #ffffff;
            border-radius: 2px;
          }
          .card .header {
            padding: 16px;
            display: grid;
          }
          .card div.supporting_text {
            padding: 16px;
            font-size: 14px;
            line-height: 2;
          }
          .card figure.rich_media {
            display: block;
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: #DDDDDD;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
          }
          .card figure.rich_media:before {
            content: "";
            display: block;
            padding-top: 56.25%;
          }
          .card div.supplemental_actions {
            padding: 8px;
            height: 36px;
          }
          .card div.supplemental_actions div.right {
            float: right;
          }
          .card div.supplemental_actions div.left {
            float: left;
          }
          .card div.supplemental_actions button {
            color: #757575;
            height: 36px;
            margin: 0;
            padding: 0 8px;
            background-color: #ffffff;
            border: none;
            font-size: 14px;
            text-transform: uppercase;
            border-radius: 2px;
          }
          .card div.supplemental_actions button.icon {
            width: 36px;
          }
          .card div.supplemental_actions button + button {
            margin-left: 8px;
          }
          .card div.supplemental_actions button:hover {
            background-color: #eeeeee;
            cursor: pointer;
          }
          .card div.supplemental_actions button i {
            color: #757575;
            font-size: 21px;
            line-height: 36px;
          }
          
          [elevation='1'] {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
          }
          
          [elevation='2'] {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
          }
          
          [elevation='3'] {
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
          }
          
          [elevation='4'] {
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
          }
          
          [elevation='5'] {
            box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
          }
    `; }

    constructor() {
        super({});        
    }
}