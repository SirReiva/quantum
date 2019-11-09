import { QElement } from "./quantum/webcomponent/decorators";
import { QuantumElement } from "./quantum/webcomponent/QuantumElement";
import { h } from "./quantum/core/vdom/h";

@QElement({
    selector: 'app-test',
    templateUrl: './template.html',
    styleUrl: './template.scss'
})
export class test extends QuantumElement {
}