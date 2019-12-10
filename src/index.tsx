import { QElement, Ref, Listen, Watch, QWarpper, Host, Attribute, warpperElementProp, QSingleton } from './quantum/webcomponent/decorators';
import { QuantumElement } from "./quantum/webcomponent/QuantumElement";
import { h } from './quantum/core/vdom/h';

/*@QElement({
    selector: 'app-test',
    styleUrl: './template.scss'
})
export class test extends QuantumElement {
    template() {
        return <div>Número: {this.info}</div>;
    }

    @Listen('click')
    clc() {
        this.info++;
    }

    @Watch()
    info = 0;

    qw = 5;

    @Ref('p')
    prueba;
}*/


@QWarpper({
    selector: 'app-test3',
    templateUrl: './template.html',
})
export class test3 {

    constructor() {
    }

    @Listen('click')
    clc() {
        //this.info++;
        this.aaa++;
    }

    @Watch()
    info = 0;

    @Host()
    el;

    @Attribute()
    aaa = 5;
}

@QSingleton()
class ServiceEx {
    a:number;
    constructor(ap) {
        this.a = ap;
    }
}
