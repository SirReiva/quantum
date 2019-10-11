import { qPage, qStack, qDrawer } from '../quantum/components';
import { h } from '../quantum/core/h';

export default class Page1 extends qPage {
    public static tagName = 'q-page1';
    template() {
        return  <q-scafold>
                    <q-appbar shadow>
                        <q-toolbarbutton onClick={() =>{ qDrawer.instances['main'].open() }} slot="start"><q-icon icon="bars"></q-icon></q-toolbarbutton>
                        <span>{ this.props.title }</span>
                        <q-toolbarbutton slot="end"><q-icon icon="music"></q-icon></q-toolbarbutton>
                    </q-appbar>
                    <q-content padding>
                        <p>Prueba</p>
                        <q-button onClick={() => this.changeTitle()}><q-icon icon="music"></q-icon> Click</q-button>
                        <q-button onClick={() => this.changeAll()}>Click</q-button>
                        <q-button mode="outline" onClick={() => this.navigate()}><q-icon icon="music"></q-icon> Click</q-button>
                        <q-checkbox>Label</q-checkbox>
                        <q-checkbox>Label</q-checkbox>
                        <q-radiobutton value="v1" checked group="grp1">Label</q-radiobutton>
                        <q-radiobutton value="v2" group="grp1">Label</q-radiobutton>
                        <q-switch>Label</q-switch>
                        <q-switch>Label</q-switch>
                        <q-slider>Label</q-slider>
                        <q-textinput type="password" onChange={(e:any) => this.setSubtitle(e)} value={ this.props.subtitle }>Label</q-textinput>
                        <q-textinput onChange={(e:any) => this.setTitle(e)} value={ this.props.title } mode="outline">Label</q-textinput>
                        <q-card imagemedia='https://picsum.photos/200/300?random'>
                            <div slot="header">
                                <q-avatar src='https://picsum.photos/200/300?random'></q-avatar>
                                <div class="text small">
                                    <b>{ this.props.title }</b>
                                    <br/>
                                    <i>{ this.props.subtitle }</i>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <div slot="leftFooter">
                                <q-button mode="outline">Click</q-button>
                                <q-button mode="outline">Click</q-button>
                            </div>
                            <div slot="rightFooter">
                                <q-toolbarbutton slot="end"><q-icon icon="music"></q-icon></q-toolbarbutton>
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

    styles() { return super.styles() + ``; }

    
    setTitle(e: any) {
        this.props.title = e.detail;
    }

    setSubtitle(e: any) {
        this.props.subtitle = e.detail;
    }

    changeAll() {
        this.transaction(() => {
            this.props.title = 'dafdfsad ' + Math.floor((Math.random() * 100) + 1);
            this.props.subtitle = 'dfadfds ' + Math.floor((Math.random() * 100) + 1);
        });
    }

    setRo() {
        qStack.instances["main"].setRootName('page2');
    }

    navigate() {
        qStack.instances["main"].pushName('page2');
    }

    changeTitle() {
        this.props.title = 'Inicio ' + Math.floor((Math.random() * 100) + 1);
    }

    constructor() {
        super({title: 'Inicio', subtitle: 'sub'});
    }
}

