import QuantumElement from './quantum/core/quantumElement';
import { h, defineQuantumElement } from './quantum/core/quantumCore';
import './app.scss';
import './font-awesome.scss';

import { qStack, qScafold, qDrawer, qAppBar, qButton, qToolBarButton,
     qSwitch, qCheckBox, qContent, qIcon, qRadioButton, qTextInput, 
     qCard, qSlider, qAvatar, qApp, qImage, qListItem, qSpinner, 
     qRatingStar, qRippleContainer, qColumn, qRow, qVirtualList,
     qSearchBar, qInfiniteScroll, qRefresher, qBackdrop } from './quantum/components';
import { Route } from './quantum/components/qStack';

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
defineQuantumElement(qRippleContainer);
defineQuantumElement(qRatingStar);
defineQuantumElement(qColumn);
defineQuantumElement(qRow);
defineQuantumElement(qVirtualList);
defineQuantumElement(qSearchBar);
defineQuantumElement(qInfiniteScroll);
defineQuantumElement(qRefresher);
defineQuantumElement(qBackdrop);
defineQuantumElement(qApp);

declare var Capacitor: any;

const routes: Route[] = [
    {
        name: 'home',
        resolve: () => import('./pages/homepage'),
    },
    {
        name: 'detail',
        resolve: () => import('./pages/detailpage'),
        preload: true
    },
    {
        name: 'home2',
        resolve: () => import('./pages/page1'),
        preload: true
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
                    <q-drawer menuid="main">
                        <ul>
                            <li onClick={() => this.navigate()} toggleMenu>Themoviedb</li>
                            <li onClick={() => this.navigate2()} toggleMenu>Test</li>
                        </ul>
                    </q-drawer>
                    <q-stack routes={routes} stackid="main" root="home" ref="navigation"></q-stack>
                </q-app>;
    }

    styles() { return `:host{
        display: block;
        width: 100%;
        height: 100%;
    }`; }

    constructor() {
        super({});
    }

    navigate() {
        qDrawer.instances['main'].close();
        qStack.instances['main'].setRootName('home');
    }

    navigate2() {
        qDrawer.instances['main'].close();
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
        document.addEventListener('keyup', (event) => {
            var key = event.key || event.keyCode;
        
            if (key === 'Escape' || key === 'Esc' || key === 27) {
                if(qStack.instances['main'] && qStack.instances['main'].canGoBack()) {
                    qStack.instances['main'].pop();
                } else { }
            } else if (key === 'Enter' || key === 'enter' || key === 13) {
                qStack.instances["main"].pushName('page2');
            }
        });
    }
}
defineQuantumElement(exampleApp);