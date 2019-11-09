import { QElement } from "./quantum/webcomponent/decorators";
import { QuantumElement } from "./quantum/webcomponent/QuantumElement";
import { h } from "./quantum/core/vdom/h";

@QElement({
    selector: 'app-test'
})
class test extends QuantumElement {
    template() {
        return <h1>Test</h1>;
    }
}