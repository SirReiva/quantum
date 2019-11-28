import { qPage, qStack } from '../quantum/components';
import { h } from '../quantum/core/h';

export default class DetailPage extends qPage {
    public static tagName = 'q-detailpage';
    template() {
        return  <q-scafold>
                    <q-appbar over>
                        <q-toolbarbutton onClick={() => this.navigate()} slot="start"><q-icon icon="arrow-left"></q-icon></q-toolbarbutton>
                        <span>{ this.props.title }</span>
                    </q-appbar>
                    <q-content>
                        <q-image ref="mainImg" srcimg={ (this.props.backdrop_path)?'http://image.tmdb.org/t/p/w500' + this.props.backdrop_path:'https://via.placeholder.com/500x281' }><q-icon icon="spinner" spin></q-icon></q-image>
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

    componentLoaded() {
        this.refs['mainImg'].animate([
            { transform: 'translate3d(0px, ' + this.props.startPos + 'px, 0px) scale(.9)', zIndex: '1' }, 
            { transform: 'translate3d(0px, 0px, 0px) scale(1)', zIndex: '1' }
        ], { 
            duration: 1000,
            easing: 'cubic-bezier(0.36,0.66,0.04,1)'
        });
    }

    styles() { return super.styles() + `
            q-appbar {
                --app-bar-opacity: 0.56;
                z-index: 2;
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
                z-index: 2;
            }
            .content {
                margin-top: 20px;
                padding: 20px;
            }
            q-image {
                transform-origin: 50% 50%;
            }
        `; 
    }


    navigate() {
        qStack.instances['main'].pop();
    }

    constructor() {
        let { id, title, backdrop_path, overview, vote_average, poster_path, startPos } = qStack.instances['main'].getParams();
        super({ id, title, backdrop_path, overview, vote_average, poster_path, startPos });
    }
}

