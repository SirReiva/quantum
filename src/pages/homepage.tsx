import { h } from '../quantum/core/h';
//import { dummydata } from '../data/dummydata';
import qPage from '../quantum/components/qPage';
import qDrawer from '../quantum/components/qDrawer';
import qStack from '../quantum/components/qStack';

export default class HomePage extends qPage {
    public static tagName = 'q-homepage';
    template() {
        // <q-avatar className="cardMovie" src={'http://image.tmdb.org/t/p/w185' + post.poster_path}></q-avatar>
        //<q-virtuallist items={this.props.posts} renderitem={this.rendItem.bind(this)}></q-virtuallist>
        //let result = this.props.loaded?this.props.posts.map(this.rendItem.bind(this)):<q-spinner></q-spinner>;

        return  <q-scafold>
                    <q-appbar shadow>
                        <q-toolbarbutton onClick={() =>{ qDrawer.instances['main'].open() }} slot="start"><q-icon icon="bars"></q-icon></q-toolbarbutton>
                        <span>{ 'Inicio ' + this.props.itemsCount }</span>
                    </q-appbar>
                    <q-content padding>
                        <q-refresher ref="fresh" onRefresh={() => this.loadActual()}>
                            <q-spinner></q-spinner>
                        </q-refresher>
                        {this.props.error && <div>Datos no disponibles...</div>}
                        <q-spinner style={((this.props.loaded || this.props.error)?'display: none;':'')}></q-spinner>
                        <q-virtuallist itemheight="370" items={this.props.posts} renderitem={this.rendItem.bind(this)}></q-virtuallist>
                        <q-infinitescrol ref="iScrol" onLoadmore={() => this.loadMore()}>
                            <q-spinner></q-spinner>
                        </q-infinitescrol>
                    </q-content>
                </q-scafold>;
    }

    styles() { return super.styles() + ``; }

    rendItem(post: any, index: number) {
        return <q-card>
                    <div slot="header">
                        <div class="text small">
                            <b>{ post.title }</b>
                        </div>
                    </div>
                    <q-image style="height: 215px;" className="mainimage" slot="img" srcimg={ (post.backdrop_path)?'http://image.tmdb.org/t/p/w500' + post.backdrop_path:'https://via.placeholder.com/500x281' }>
                        <q-icon style="color: rgb(var(--q-material-primary-rgb));" icon="spinner" spin></q-icon>
                    </q-image>
                    <div slot="leftFooter">
                        <q-button onClick={() => this.goPost(post)} mode="outline">Leer más</q-button>
                    </div>
                </q-card>;
    }

    first = false;
    loadMore() {
        setTimeout(() => {
            fetch('https://api.themoviedb.org/3/movie/popular?api_key=785e1bfa35690f914c6c1c83a043d807&language=es-ES&page=' + this.page).then((rawdata: any) => rawdata.json()).then(data => {
                this.transaction(() => {
                    this.props.posts = [...this.props.posts,...data.results];
                    this.props.itemsCount = this.props.posts.length;
                });
                this.page++;
                //this.refs.iScrol.setEnable(false);
                this.refs.iScrol.complete();
            });
        }, 2000);
    }

    private page = 1;

    loadActual() {
        setTimeout(() => {
            this.page = 1;
            fetch('https://api.themoviedb.org/3/movie/popular?api_key=785e1bfa35690f914c6c1c83a043d807&language=es-ES&page=' + this.page).then((rawdata: any) => rawdata.json()).then(data => {
                this.transaction(() => {
                    this.props.posts = data.results;
                    this.props.loaded = true;
                    this.props.error = false;    
                    this.props.itemsCount = this.props.posts.length;
                });
                this.page++;
                this.refs.fresh.complete();
            });
        }, 1000);
    }

    loadInitial() {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=785e1bfa35690f914c6c1c83a043d807&language=es-ES&page=' + this.page).then((rawdata: any) => rawdata.json()).then(data => {
            this.transaction(() => {
                this.props.posts = data.results;
                this.props.loaded = true;
                this.props.itemsCount = this.props.posts.length;
            });
            this.page++;
            this.refs.fresh.complete();
        }).catch(ex => {
            this.props.error = true;
        });
    }

    componentLoaded() {
        
        setTimeout(() => {
            this.loadInitial();
            /*let data = dummydata;
            this.transaction(() => {
                this.props.posts = data.results.slice(0, 10);
                this.props.loaded = true;
            });*/
        }, 1000);
    }

    goPost(post :any) {
        qStack.instances['main'].pushName('detail', post);
    }


    constructor() {
        super({posts: [], loaded: false, itemsCount: 0, error: false});
    }
}

