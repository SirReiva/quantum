import { QDecoratorOptions, DEFAULT_DECORATOR_OPTIONS } from "./interfaces";
import { QuantumElement } from "./QuantumElement";
import { h } from "../core/vdom/h";

const validateSelector = (selector: string) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};

export const QElement = (config: QDecoratorOptions) => (cls: Function) => {
    cls.prototype.selector = config.selector;
    customElements.define(cls.prototype.selector, cls);
    console.dir(cls)
}