import { h } from '../quantum/core/quantumCore';
import { qPage, qStack } from '../quantum/components';
import { TabRoute } from '../quantum/components/utils/routes';

const routes: TabRoute[] = [
    {
        resolve: () => import('../components/comp1'),
    },
    {
        resolve: () => import('../components/comp2'),
    },
    {
        resolve: () => import('../components/comp1'),
    }
];

export default class Page3 extends qPage {
    public static tagName = 'q-page3';
    template() {
        return  <q-scafold>
                    <q-appbar shadow>
                        <q-toolbarbutton onClick={() =>{ qStack.instances["main"].pop(); }} slot="start"><q-icon icon="arrow-left"></q-icon></q-toolbarbutton>
                        <span>{'TABS ' + this.props.num}</span>
                    </q-appbar>
                    <q-content>
                        <q-tabstack ref="tabs" onChange={(e:any) => this.onchangeTab(e)} routes={routes}></q-tabstack>
                    </q-content>
                    <q-appbar>
                        <q-toolbarbutton onClick={() =>{ this.changeTab(0) }} slot="start"><q-icon icon="arrow-left"></q-icon></q-toolbarbutton>
                        <q-toolbarbutton onClick={() =>{ this.changeTab(1) }} slot="end"><q-icon icon="arrow-right"></q-icon></q-toolbarbutton>
                    </q-appbar>
                </q-scafold>;
    }

    styles() { return super.styles() + ``; 
    }

    onchangeTab(e:any) {
        this.props.num = e.detail;
    }

    changeTab(i: number) {
        this.refs.tabs.selectIndex(i);
    }

    constructor() {
        super({num: 0});
    }
}

