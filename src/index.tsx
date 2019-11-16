import { QElement, Ref } from "./quantum/webcomponent/decorators";
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
    @Ref('p')
    prueba;
}