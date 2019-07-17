import QuantumElement from './quantum/core/quantumElement';
import { h, defineQuantumElement } from './quantum/core/quantumCore';
import './app.scss';
import './font-awesome.scss';

import { qStack, qScafold, qDrawer, qAppBar, qButton, qToolBarButton, qSwitch, qCheckBox, qContent, qIcon, qRadioButton, qTextInput, qCard, qSlider, qAvatar, qApp, qImage, qListItem, qSpinner, qRatingStar } from './quantum/components/index.qcomponents';
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
defineQuantumElement(qSpinner);
defineQuantumElement(qRatingStar);
defineQuantumElement(qApp);

const routes: Route[] = [
    {
        name: 'home',
        resolve: () => import('./pages/homepage'),
    },
    {
        name: 'detail',
        resolve: () => import('./pages/detailpage'),
    },
    {
        name: 'home2',
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
                            <li onClick={() => this.navigate()} toggleMenu>Themoviedb</li>
                            <li onClick={() => this.navigate2()} toggleMenu>Test</li>
                        </ul>
                    </q-drawer>
                    <q-stack routes={routes} stackid="main" root="home" ref="navigation"></q-stack>
                </q-app>;
    }

    styles() { return ``; }

    constructor() {
        super({});
    }

    navigate() {
        qStack.instances['main'].setRootName('home');
    }

    navigate2() {
        qStack.instances['main'].setRootName('home2');
    }

    componentLoaded() {
        try {
            Capacitor.Plugins.SplashScreen.hide();
            Capacitor.Plugins.App.addListener("backButton", () => {
                if(qStack.instances['main'] && qStack.instances['main'].canGoBack()) {
                    qStack.instances['main'].pop();
                } else {
                    Capacitor.Plugins.App.exitApp();
                }
            });
        } catch(ex) { }
    }
}
defineQuantumElement(exampleApp);