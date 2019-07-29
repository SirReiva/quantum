import { h } from '../quantum/core/quantumCore';
import { qPage, qStack } from '../quantum/components/index.qcomponents';

export default class DetailPage extends qPage {
    public static tagName = 'q-detailpage';
    template() {
        return  <q-scafold>
                    <q-appbar over>
                        <q-toolbarbutton onClick={() => this.navigate()} slot="start"><q-icon icon="arrow-left"></q-icon></q-toolbarbutton>
                        <span>{ this.props.title }</span>
                    </q-appbar>
                    <q-content>
                        <q-image srcimg={'http://image.tmdb.org/t/p/w500' +  this.props.backdrop_path }><q-icon icon="spinner" spin></q-icon></q-image>
                        <q-row style="justify-content: space-around;">
                            <q-image className="poster" srcimg={'http://image.tmdb.org/t/p/w500' +  this.props.poster_path }><q-icon icon="spinner" spin></q-icon></q-image>
                            <div></div>
                            <b>{ this.props.vote_average }</b>
                            <q-ratingstar rating={this.props.vote_average / 2}></q-ratingstar>
                        </q-row>
                        
                        <div className="content">
                            <div style="clear: both;"></div>
                            <p className="overview">{ this.props.overview }</p>
                        </div>
                    </q-content>
                </q-scafold>;
    }

    styles() { return super.styles() + `
            q-appbar {
                --app-bar-opacity: 0.56;
            }
            .poster {
                width: 85.33px;
                height: 128px;
                position: absolute;
                left: 20px;
                top: -64px;
                border-radius: 14px;
                overflow: hidden;
                -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
                -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
                box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
            }
            .content {
                margin-top: 20px;
                padding: 20px;
            }
        `; 
    }


    navigate() {
        qStack.instances['main'].pop();
    }

    constructor() {
        let { id, title, backdrop_path, overview, vote_average, poster_path } = qStack.instances['main'].getParams();
        super({ id, title, backdrop_path, overview, vote_average, poster_path });
    }
}

