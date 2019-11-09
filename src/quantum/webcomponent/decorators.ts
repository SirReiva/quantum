import { QDecoratorOptions, DEFAULT_DECORATOR_OPTIONS } from "./interfaces";
import { compileTemplateString } from './utils';

const validateSelector = (selector: string) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};

export const QElement = (config: QDecoratorOptions) => (cls: Function) => {
    validateSelector(config.selector);
    config = Object.assign(DEFAULT_DECORATOR_OPTIONS, config);
    cls.prototype.selector = config.selector;
    cls.prototype.automaticDetection = config.automaticDetction;
    cls.prototype.encapsulation = config.useShadow;
    if (config.templateUrl) {
        cls.prototype.template = function() {
            return compileTemplateString(config.templateUrl, this);
        };
    }
    if (config.styleUrl) {
        console.log(config.styleUrl);
        cls.prototype.styles = function() {
            return config.styleUrl;
        };
    }
    customElements.define(cls.prototype.selector, cls);
}