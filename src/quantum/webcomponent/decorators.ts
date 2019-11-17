import { QDecoratorOptions, DEFAULT_DECORATOR_OPTIONS } from "./interfaces";
import { compileTemplateString } from './utils';
import { QuantumElement } from "./QuantumElement";

const warpperElementProp = Symbol('QWARPPER');

const validateSelector = (selector: string) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};

export const Listen = (eventName: string) => (target: any, key: string, descriptor: PropertyDescriptor) => {
   if (target instanceof QuantumElement) {
       if((target as any).initListeners === undefined)
            (target as any).initListeners = [];
       (target as any).initListeners.push({
           eventName,
           function: target[key]
       });
   }
};

export const Ref = (refName: string = null) => (target: any, key: string) => {

    var getter = function () {
        return (refName)?this.refs[refName]:this.refs[key];
    };

    Object.defineProperty(target, key, {
        get: getter,
        configurable: false
    });
}

export const State = () => function(target: any, key: string) {

    console.log('init')
    

    var setter = function (newVal) {
        console.log('zas')
    };

    Object.defineProperty(target, key, {
        set: setter
    });
}

export const HostElement = () => (target: any, key: string) => {

    var getter = function () {
        if(this instanceof QuantumElement)
            return this;
        else
        return this[warpperElementProp];
    };

    Object.defineProperty(target, key, {
        get: getter,
        configurable: false
    });
}

export const QElement = (config: QDecoratorOptions) => (cls: Function) => {
    validateSelector(config.selector);
    config = Object.assign(DEFAULT_DECORATOR_OPTIONS, config);
    (cls as any).selector = config.selector;
    (cls as any).automaticDetection = config.automaticDetection;
    (cls as any).encapsulation = config.useShadow;
    if (config.templateUrl) {
        cls.prototype.template = function() {
            return compileTemplateString(config.templateUrl, this);
        };
    }
    if (config.styleUrl) {
        cls.prototype.styles = function() {
            return config.styleUrl;
        };
    }
    customElements.define(config.selector, cls);
}

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}

export const QWarpper = (config: QDecoratorOptions) => (clss: any) => {
    validateSelector(config.selector);
    config = Object.assign(DEFAULT_DECORATOR_OPTIONS, config);
    class tmp extends QuantumElement {
        static selector = config.selector;
        static encapsulation = config.useShadow;
        automaticDetection = config.automaticDetection;

        constructor() {
            super();
            const c = new clss();
            c[warpperElementProp] = this;
        }
    }
    customElements.define(config.selector, tmp);
    return tmp;
}

/*export const QElementAll = (config: QDecoratorOptions) => (base: Function):any => {   
    validateSelector(config.selector);
    config = Object.assign(DEFAULT_DECORATOR_OPTIONS, config);
    
    let tmp:any = class extends QuantumElement {
        constructor() {
            super();
        }
    }

    tmp.prototype.selector = config.selector;

    if (config.templateUrl) {
        tmp.prototype.template = function() {
            return compileTemplateString(config.templateUrl, this);
        };
    }
    if (config.styleUrl) {
        tmp.prototype.styles = function() {
            return config.styleUrl;
        };
    }
    customElements.define(config.selector, tmp);
    return tmp;
}*/