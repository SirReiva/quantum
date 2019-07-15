import QuantumElement from './quantum/core/quantumElement';
import { h, defineQuantumElement } from './quantum/core/quantumCore';
import './app.scss';
import './font-awesome.scss';

import { qStack, qScafold, qDrawer, qAppBar, qButton, qToolBarButton, qSwitch, qCheckBox, qContent, qIcon, qRadioButton, qTextInput, qCard, qSlider, qAvatar, qApp, qImage, qListItem } from './quantum/components/index.qcomponents';
import { Route } from './quantum/components/qStack';

declare var Capacitor: any;

defineQuantumElement(qStack);
defineQuantumElement(qScafold);
defineQuantumElement(qDrawer);
defineQuantumElement(qAppBar);
defineQuantumElement(qButton);
defineQuantumElement(qToolBarButton);
defineQuantumElement(qSwitch);
defineQuantumElement(qCheckBox);
defineQuantumElement(qContent);
defineQuantumElement(qIcon);
defineQuantumElement(qRadioButton);
defineQuantumElement(qTextInput);
defineQuantumElement(qCard);
defineQuantumElement(qSlider);
defineQuantumElement(qAvatar);
defineQuantumElement(qListItem);
defineQuantumElement(qImage);
defineQuantumElement(qApp);

const routes: Route[] = [
    {
        name: 'home',
        resolve: () => import('./pages/homepage'),
    },
    {
        name: 'detail',
        resolve: () => import('./pages/detailpage'),
    }
];

/*ExampleApp*/
class exampleApp extends QuantumElement {
    
    public static tagName = 'example-app';
    template() {
        return  <q-app>
                    <q-drawer>
                        <ul>
                            <li onClick={() => this.navigate()} toggleMenu>Link</li>
                        </ul>
                        <q-listitem>List Item</q-listitem>
                    </q-drawer>
                    <q-stack routes={routes} stackid="main" root="home" ref="navigation"></q-stack>
                </q-app>;
    }

    styles() { return ``; }

    constructor() {
        super({});
    }

    navigate() {
        qStack.instances["main"].pushName('page2');
    }

    componentLoaded() {
        try {
            Capacitor.Plugins.SplashScreen.hide();
        } catch(ex) { }
    }
}
defineQuantumElement(exampleApp);