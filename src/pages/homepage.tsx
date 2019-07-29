import { h } from '../quantum/core/quantumCore';
import { qPage, qStack, qDrawer } from '../quantum/components/index.qcomponents';
import { dummydata } from '../data/dummydata';

export default class HomePage extends qPage {
    public static tagName = 'q-homepage';
    template() {
        // <q-avatar className="cardMovie" src={'http://image.tmdb.org/t/p/w185' + post.poster_path}></q-avatar>
        let result = this.props.loaded?this.props.posts.map((post:any) => 
        <q-card>
            <div slot="header">
                <div class="text small">
                    <b>{ post.title }</b>
                </div>
            </div>
            <q-image hero="{'top': 0, 'width': '100%', 'left': 0}" className="mainimage" slot="img" srcimg={'http://image.tmdb.org/t/p/w500' + post.backdrop_path}>
                <q-icon style="color: rgb(var(--q-material-primary-rgb));" icon="spinner" spin></q-icon>
            </q-image>
            <div slot="leftFooter">
                <q-button onClick={() => this.goPost(post)} mode="outline">Leer más</q-button>
            </div>
        </q-card>):<q-spinner></q-spinner>;

        return  <q-scafold>
                    <q-appbar shadow>
                        <q-toolbarbutton onClick={() =>{ qDrawer.instances['main'].open() }} slot="start"><q-icon icon="bars"></q-icon></q-toolbarbutton>
                        <span>Inicio</span>
                    </q-appbar>
                    <q-content padding>{result}</q-content>
                </q-scafold>;
    }

    styles() { return super.styles() + ``; }

    componentLoaded() {
        /*fetch('https://api.themoviedb.org/3/movie/popular?api_key=785e1bfa35690f914c6c1c83a043d807&language=es-ES').then((rawdata: any) => rawdata.json()).then(data => {
            this.transaction(() => {
                this.props.posts = data.results;
                this.props.loaded = true;
            });
        });*/
        setTimeout(() => {
            let data = dummydata;
            this.transaction(() => {
                this.props.posts = data.results;
                this.props.loaded = true;
            });
        }, 1000);
        super.componentLoaded();
    }

    goPost(post :any) {
        qStack.instances['main'].pushName('detail', post);
    }


    constructor() {
        super({posts: [], loaded: false});
    }
}

