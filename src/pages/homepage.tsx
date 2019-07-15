import { h } from '../quantum/core/quantumCore';
import { qPage, qStack } from '../quantum/components/index.qcomponents';

export default class HomePage extends qPage {
    public static tagName = 'q-homepage';
    template() {
        let result = this.props.loaded?this.props.posts.map((post:any) => 
        <q-card imagemedia={post.thumbnailUrl}>
            <div slot="header">
                <q-avatar src={post.thumbnailUrl}></q-avatar>
                <div class="text small">
                    <b>{ post.title }</b>
                </div>
            </div>
            <div slot="leftFooter">
                <q-button onClick={() => this.goPost(post)} mode="outline">Leer más</q-button>
            </div>
        </q-card>):<p>Cargando</p>;
        return  <q-scafold>
                    <q-appbar shadow>
                        <q-toolbarbutton openMenu slot="start"><q-icon icon="bars"></q-icon></q-toolbarbutton>
                        <span>Inicio</span>
                    </q-appbar>
                    <q-content padding>{result}</q-content>
                </q-scafold>;
    }

    styles() { return super.styles() + ``; }

    componentLoaded() {
        fetch('https://jsonplaceholder.typicode.com/photos').then((rawdata: any) => rawdata.json()).then(data => {
            this.transaction(() => {
                this.props.posts = data.slice(0, 50);
                this.props.loaded = true;
            });
        });
    }

    goPost(post :any) {
        qStack.instances['main'].pushName('detail', post);
    }


    constructor() {
        super({posts: [], loaded: false});
    }
}

