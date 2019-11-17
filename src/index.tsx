import { QElement, Ref, Listen, State } from "./quantum/webcomponent/decorators";
import { QuantumElement } from "./quantum/webcomponent/QuantumElement";

import('./index2').then(mod => {
    console.log(mod)
})

@QElement({
    selector: 'app-test',
    templateUrl: './template.html',
    styleUrl: './template.scss'
})
export class test extends QuantumElement {
    @Listen('click')
    clc() {
        this.info.a++;
    }

    @State()
    info = { a: 2 };

    qw = 5;

    @Ref('p')
    prueba;
}