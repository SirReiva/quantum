import { QElement } from "./quantum/webcomponent/decorators";
import { QuantumElement } from "./quantum/webcomponent/QuantumElement";

@QElement({
    selector: 'app-test2',
    templateUrl: './template.html',
    styleUrl: './template.scss'
})
export class test2 extends QuantumElement {
}