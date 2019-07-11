import QuantumElement from './quantum/core/quantumElement';
import { h, defineQuantumElement } from './quantum/core/quantumCore';
import './app.scss';
import './font-awesome.scss';

import { qStack, qScafold, qDrawer, qAppBar, qButton, qToolBarButton, qSwitch, qCheckBox, qContent, qIcon, qRadioButton, qTextInput, qCard, qSlider, qAvatar } from './quantum/components/index';

defineQuantumElement('q-stack', qStack);
defineQuantumElement('q-scafold', qScafold);
defineQuantumElement('q-drawer', qDrawer);
defineQuantumElement('q-appbar', qAppBar);
defineQuantumElement('q-button', qButton);
defineQuantumElement('q-tolbar-button', qToolBarButton);
defineQuantumElement('q-switch', qSwitch);
defineQuantumElement('q-checkbox', qCheckBox);
defineQuantumElement('q-content', qContent);
defineQuantumElement('q-icon', qIcon);
defineQuantumElement('q-radiobutton', qRadioButton);
defineQuantumElement('q-text-input', qTextInput);
defineQuantumElement('q-card', qCard);
defineQuantumElement('q-slider', qSlider);
defineQuantumElement('q-avatar', qAvatar);

/*ExampleApp*/
class exampleApp extends QuantumElement {
    template() {
        return <q-scafold>
                    <q-drawer>
                        <ul>
                            <li toggleMenu>Link</li>
                        </ul>
                    </q-drawer>
                    <q-appbar shadow>
                        <q-tolbar-button openMenu slot="start"><q-icon icon="bars"></q-icon></q-tolbar-button>
                        <span>{ this.props.title }</span>
                        <q-tolbar-button slot="end"><q-icon icon="music"></q-icon></q-tolbar-button>
                    </q-appbar>
                    <q-content>
                        <p>Prueba</p>
                        <q-button onClick={() => this.changeTitle()}><q-icon icon="music"></q-icon> Click</q-button>
                        <q-button onClick={() => this.changeTitle()}>Click</q-button>
                        <q-button mode="outline">Click</q-button>
                        <br/>
                        <br/>
                        <q-checkbox>Label</q-checkbox>
                        <br/>
                        <q-checkbox>Label</q-checkbox>
                        <br/>
                        <br/>
                        <q-radiobutton value="v1" checked group="grp1">Label</q-radiobutton>
                        <br/>
                        <q-radiobutton value="v2" group="grp1">Label</q-radiobutton>
                        <br/>
                        <br/>
                        <q-switch>Label</q-switch>
                        <br/>
                        <q-switch>Label</q-switch>
                        <br/>
                        <br/>
                        <q-slider>Label</q-slider>
                        <br/>
                        <br/>
                        <q-text-input type="password">Label</q-text-input>
                        <br/>
                        <q-text-input onChange={(e:any) => this.setTitle(e)} value={ this.props.title } mode="outline">Label</q-text-input>
                        <br/>
                        <br/>
                        <q-card>
                            <div slot="header">
                                <q-avatar src='https://picsum.photos/200/300?random'></q-avatar>
                                <div class="text small">
                                    <b>Title</b>
                                    <br/>
                                    <i>Subtitle</i>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <div slot="leftFooter">
                                <q-button mode="outline">Click</q-button>
                                <q-button mode="outline">Click</q-button>
                            </div>
                            <div slot="rightFooter">
                                <q-tolbar-button slot="end"><q-icon icon="music"></q-icon></q-tolbar-button>
                            </div>
                        </q-card>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat tempus porta. Mauris faucibus, ipsum vel venenatis mattis, velit mauris placerat nisi, quis varius massa nisi et velit. Sed nec nulla vestibulum, pretium magna eu, tincidunt
                            velit. Vivamus tincidunt nec lectus maximus dictum. Morbi nec ultrices urna, nec feugiat eros. Nunc laoreet tincidunt neque, non rutrum lectus placerat id. Quisque vel lacus quis lacus facilisis maximus a sed dui. Nullam sed sapien a nulla
                            dictum porttitor. Sed non neque nulla. Sed tincidunt, augue ut ultrices finibus, orci mi maximus justo, eu facilisis felis eros in arcu. Vestibulum ac nisi odio. Nam eget nulla tellus. Nunc efficitur vitae purus sit amet gravida. Quisque
                            vel lorem a tellus rhoncus efficitur quis at orci. Quisque et libero vitae turpis pellentesque posuere. Sed ultrices id mi in dapibus. Quisque semper nulla nisi, vel commodo magna ultrices maximus. Sed a quam ut nisi bibendum molestie
                            in bibendum ligula. Mauris dui odio, ornare vel lobortis vel, feugiat ut orci. Cras lacinia sagittis iaculis.</p>
                    </q-content>
                </q-scafold>;
    }

    styles() { return ``; }

    setTitle(e: any) {
        this.props.title = e.detail;
    }

    changeTitle() {
        this.props.title = 'Inicio ' + Math.floor((Math.random() * 100) + 1);
    }

    constructor() {
        super({title: 'Inicio'});        
    }
}
defineQuantumElement('example-app', exampleApp);