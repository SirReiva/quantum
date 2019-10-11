import { qPage, qDrawer } from '../quantum/components';
import { h } from '../quantum/core/h';

export default class PageList extends qPage {
    public static tagName = 'q-pagelist';
    template() {
        return  <q-scafold>
                    <q-appbar shadow>
                        <q-toolbarbutton onClick={() => qDrawer.instances['main'].open() } slot="start"><q-icon icon="bars"></q-icon></q-toolbarbutton>
                        <span>List</span>
                    </q-appbar>
                    <q-content>
                        <q-list>
                            <q-listitem border>
                                <q-textinput>Nombre</q-textinput>
                            </q-listitem>
                            <q-listitem border>
                                <q-textinput>Dirección</q-textinput>
                            </q-listitem>
                            <q-listitem border>
                                <q-checkbox>Acepto</q-checkbox>
                            </q-listitem>
                            <q-listitem border>
                                <q-radiobutton value="v1" checked group="grp2">Label</q-radiobutton>
                            </q-listitem>
                            <q-listitem border>
                                <q-radiobutton value="v2" group="grp2">Label</q-radiobutton>
                            </q-listitem>
                            <q-listitem border>
                                <q-switch>Label</q-switch>
                            </q-listitem>
                        </q-list>
                    </q-content>
                </q-scafold>;
    }

    styles() { return super.styles() + ``; 
    }

    constructor() {
        super({});
    }
}

