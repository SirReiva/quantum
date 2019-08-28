import QuantumElement from './quantum/core/quantumElement';
import { h, defineQuantumElement } from './quantum/core/quantumCore';
import './app.scss';
import './font-awesome.scss';
import { Route } from './quantum/components/utils/routes/index';

import { qStack, qScafold, qDrawer, qAppBar, qButton, qToolBarButton,
     qSwitch, qCheckBox, qContent, qIcon, qRadioButton, qTextInput, 
     qCard, qSlider, qAvatar, qApp, qImage, qList, qListItem, qSpinner, 
     qRatingStar, qRippleContainer, qColumn, qRow, qVirtualList,
     qSearchBar, qInfiniteScroll, qRefresher, qBackdrop, qTabStack, qTabBar, qFab } from './quantum/components';

defineQuantumElement(qStack);
defineQuantumElement(qTabStack);
defineQuantumElement(qScafold);
defineQuantumElement(qDrawer);
defineQuantumElement(qAppBar);
defineQuantumElement(qTabBar);
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
defineQuantumElement(qList);
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
defineQuantumElement(qFab);
defineQuantumElement(qApp);

declare var Capacitor: any;

const routes: Route[] = [
    {
        name: 'home',
        resolve: () => import('./pages/homepage').then(m => m.default),
    },
    {
        name: 'detail',
        resolve: () => import('./pages/detailpage').then(m => m.default),
        preload: true
    },
    {
        name: 'home2',
        resolve: () => import('./pages/page1').then(m => m.default),
        preload: true
    },
    {
        name: 'page2',
        resolve: () => import('./pages/page2').then(m => m.default),
    },
    {
        name: 'page3',
        resolve: () => import('./pages/page3').then(m => m.default),
        preload: true
    },
    {
        name: 'pagelist',
        resolve: () => import('./pages/pagelist').then(m => m.default),
        preload: true
    }
];

/*ExampleApp*/
class exampleApp extends QuantumElement {
    
    public static tagName = 'example-app';
    template() {
        return  <q-app>
                    <q-drawer menuid="main">
                        <q-list>
                            <q-listitem border onClick={() => this.navigate()}><q-icon icon="film"></q-icon>Themoviedb</q-listitem>
                            <q-listitem border onClick={() => this.navigate2()}><q-icon icon="list"></q-icon>Test</q-listitem>
                            <q-listitem border onClick={() => this.navigate3()}><q-icon icon="folder"></q-icon>Tabs</q-listitem>
                            <q-listitem border onClick={() => this.navigate4()}><q-icon icon="folder"></q-icon>List</q-listitem>
                        </q-list>
                    </q-drawer>
                    <q-stack routes={routes} stackid="main" root="home" ref="navigation"></q-stack>
                    <q-fab><q-toolbarbutton><q-icon icon="music"></q-icon></q-toolbarbutton></q-fab>
                </q-app>;
    }

    styles() { return `:host{}`; }

    constructor() {
        super({});
    }

    async navigate() {
        await qDrawer.instances['main'].close();
        qStack.instances['main'].setRootName('home');
    }

    async navigate2() {
        await qDrawer.instances['main'].close();
        qStack.instances['main'].setRootName('home2');
    }

    async navigate3() {
        await qDrawer.instances['main'].close();
        qStack.instances['main'].setRootName('page3');
    }

    async navigate4() {
        await qDrawer.instances['main'].close();
        qStack.instances['main'].setRootName('pagelist');
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