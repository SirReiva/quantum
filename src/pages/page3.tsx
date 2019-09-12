import { h } from '../quantum/core/quantumCore';
import { qPage, qDrawer } from '../quantum/components';
import { TabRoute } from '../quantum/components/utils/routes';
import { TabBarItem } from '../quantum/components/utils/routes/index';

const routes: TabRoute[] = [
    {
        resolve: () => import('../components/comp1').then(m => m.default),
    },
    {
        resolve: () => import('../components/comp2').then(m => m.default),
    },
    {
        resolve: () => import('../components/comp1').then(m => m.default),
    }
];

const prueba: TabBarItem[] = [
    {
        icon: 'adjust',
        text: 'Settings'
    },
    {
        icon: 'bar-chart',
        text: 'Stats'
    },
    {
        icon: 'book',
        text: 'History'
    }
];

export default class Page3 extends qPage {
    public static tagName = 'q-page3';
    template() {
        return  <q-scafold>
                    <q-appbar shadow>
                        <q-toolbarbutton onClick={() =>{ qDrawer.instances['main'].open() }} slot="start"><q-icon icon="bars"></q-icon></q-toolbarbutton>
                        <span>{'TABS ' + this.props.num}</span>
                    </q-appbar>
                    <q-content>
                        <q-tabstack animated hidebars ref="tabs" index={this.props.num} onChange={(e:any) => this.onchangeTab(e)} routes={routes}></q-tabstack>
                    </q-content>
                    <q-tabbar items={prueba} top topshadow index={this.props.num} onChange={(e:any) => this.onchangeTab(e)}></q-tabbar>
                </q-scafold>;
    }

    styles() { return super.styles() + ``; }

    onchangeTab(e:any) {
        this.props.num = e.detail;
    }

    /*changeTab(i: number) {
        this.refs.tabs.selectIndex(i);
    }*/

    constructor() {
        super({num: 0});
    }
}

