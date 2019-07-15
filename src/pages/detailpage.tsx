import { h } from '../quantum/core/quantumCore';
import { qPage, qStack } from '../quantum/components/index.qcomponents';

export default class DetailPage extends qPage {
    public static tagName = 'q-detailpage';
    template() {
        return  <q-scafold>
                    <q-appbar>
                        <q-toolbarbutton onClick={() => this.navigate()} slot="start"><q-icon icon="arrow-left"></q-icon></q-toolbarbutton>
                        <span>Detail</span>
                    </q-appbar>
                    <q-content>
                        <q-image srcimg={ this.props.thumbnailUrl }></q-image>
                        <h1>{ this.props.title }</h1>
                    </q-content>
                </q-scafold>;
    }

    styles() { return super.styles() + ``; 
    }


    navigate() {
        qStack.instances['main'].pop();
    }

    constructor() {
        let {title, thumbnailUrl} = qStack.instances['main'].getParams();
        super({title, thumbnailUrl});
    }
}

