import QuantumElement from './quantum/core/quantumElement';
import './app.scss';
import './font-awesome.scss';
import { defineQuantumElement } from './quantum/core/elements';
import { h } from './quantum/core/h';
import { Route } from './quantum/components/utils/routes/index';
import qStack from './quantum/components/qStack';
import qTabStack from './quantum/components/qTabStack';
import qScafold from './quantum/components/qScafold';
import qDrawer from './quantum/components/qDrawer';
import qAppBar from './quantum/components/qAppBar';
import qTabBar from './quantum/components/qTabBar';
import qButton from './quantum/components/qButton';
import qToolBarButton from './quantum/components/qToolBarButton';
import qSwitch from './quantum/components/qSwitch';
import qCheckBox from './quantum/components/qCheckBox';
import qContent from './quantum/components/qContent';
import qIcon from './quantum/components/qIcon';
import qRadioButton from './quantum/components/qRadioButton';
import qTextInput from './quantum/components/qTextInput';
import qCard from './quantum/components/qCard';
import qSlider from './quantum/components/qSlider';
import qAvatar from './quantum/components/qAvatar';
import qList from './quantum/components/qList';
import qListItem from './quantum/components/qListItem';
import qImage from './quantum/components/qImage';
import qSpinner from './quantum/components/qSpinner';
import qRippleContainer from './quantum/components/qRipplecontainer';
import qRatingStar from './quantum/components/qRantingStar';
import qColumn from './quantum/components/qColumn';
import qRow from './quantum/components/qRow';
import qVirtualList from './quantum/components/qVirtualList';
import qSearchBar from './quantum/components/qSearchBar';
import qInfiniteScroll from './quantum/components/qInfiniteScroll';
import qRefresher from './quantum/components/qRefresher';
import qBackdrop from './quantum/components/qBackdrop';
import qFab from './quantum/components/qFab';
import qApp from './quantum/components/qApp';


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