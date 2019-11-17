import { QElement, Ref, Listen, Watch } from "./quantum/webcomponent/decorators";
import { QuantumElement } from "./quantum/webcomponent/QuantumElement";
import { h } from './quantum/core/vdom/h';

@QElement({
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
}