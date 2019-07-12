import QuantumElement from './quantum/core/quantumElement';
import { h, defineQuantumElement } from './quantum/core/quantumCore';
import './app.scss';
import './font-awesome.scss';

import { qStack, qScafold, qDrawer, qAppBar, qButton, qToolBarButton, qSwitch, qCheckBox, qContent, qIcon, qRadioButton, qTextInput, qCard, qSlider, qAvatar, qApp, qImage } from './quantum/components/index.qcomponents';
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
defineQuantumElement(qImage);
defineQuantumElement(qApp);

const routes: Route[] = [
    {
        name: 'page1',
        resolve: () => import('./pages/page1'),
    },
    {
        name: 'page2',
        resolve: () => import('./pages/page2'),
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
                    </q-drawer>
                    <q-stack routes={routes} stackid="main" root="page1" ref="navigation"></q-stack>
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