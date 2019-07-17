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
                        <q-image className="bg" srcimg={'http://image.tmdb.org/t/p/w500' +  this.props.backdrop_path }></q-image>
                        <q-image className="poster" srcimg={'http://image.tmdb.org/t/p/w500' +  this.props.poster_path }></q-image>
                        <div className="content">
                            <div className="rat">
                                <span>{ this.props.vote_average }</span>
                                <q-ratingstar rating={this.props.vote_average / 2}></q-ratingstar>
                            </div>
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
                top: 217px;
                left: 20px;
                border-radius: 14px;
                -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
                -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
                box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
            }
            .bg {
                height: 281px;
                margin: 0 auto;
                display: block;
            }
            .content {
                padding: 20px;
            }
            .overview {
                margin-top: 40px;
            }
            .rat {
                float: right;
            }
        `; 
    }


    navigate() {
        qStack.instances['main'].pop();
    }

    constructor() {
        let { title, backdrop_path, overview, vote_average, poster_path } = qStack.instances['main'].getParams();
        super({ title, backdrop_path, overview, vote_average, poster_path });
    }
}

