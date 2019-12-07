import { QDecoratorOptions, DEFAULT_DECORATOR_OPTIONS } from "./interfaces";
import { compileTemplateString } from './utils';
import { QuantumElement } from './QuantumElement';

export const warpperElementProp = Symbol('QWARPPER');
export const staticWarpperElementProp = Symbol('STATIC_QWARPPER');
export const listenersWarpper = Symbol('QWARPPER_LISTENERS');
export const observerAttrs = Symbol('QOBS_ATTRS');

const validateSelector = (selector: string) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};

export const Listen = (eventName: string) => (target: any, key: string, descriptor: PropertyDescriptor) => {
    if (target instanceof QuantumElement) {
        if(!(target as any).initListeners)
            (target as any).initListeners = [];
        (target as any).initListeners.push({
            eventName,
            function: target[key]
        });
    } else {
        if(!(target as any)[listenersWarpper])
            (target as any)[listenersWarpper] = [];
        (target as any)[listenersWarpper].push({
            eventName,
            function: target[key]
        });
    }
};

export const Attribute = (refName: string = null) => (target: any, key: string) => {
    if(!(target as any)[observerAttrs])
        (target as any)[observerAttrs] = [];
    target[observerAttrs].push(key);
    if (target instanceof QuantumElement) {
        (target as any).observedAttributes = function() { return target[observerAttrs]; };
        Object.defineProperty(target, key, {
            get: function() {
                this.getAttribute(key)
            },
            set: function(val) {
                this.setAttribute(key, val);
            },
            configurable: false
        });

    } else {
        let val = null;
        Object.defineProperty(target, key, {
            get: function() {
                return val;
            },
            set: function(value) {
                if (this[warpperElementProp]) //cjeck value type
                    this[warpperElementProp].setAttribute(key, value);
                val = value;
            },
            configurable: false
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

export const Watch = () => (target: any, key: string) => {

    let val = null;

    var setter = function (newVal) {
        val = newVal;
        if(this instanceof QuantumElement)
            this._render();
        else if(this[warpperElementProp])
            this[warpperElementProp]._render();
    };

    var getter = function () {
       return val;
    };

    Object.defineProperty(target, key, {
        set: setter,
        get: getter
    });
}

export const Host = () => (target: any, key: string) => {

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
    config = Object.assign({} ,DEFAULT_DECORATOR_OPTIONS, config);
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
    delete cls[observerAttrs];
    customElements.define(config.selector, cls);
}

/*function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}*/

export const QWarpper = (config: QDecoratorOptions) => (clss: any): any => {
    validateSelector(config.selector);
    config = Object.assign({} ,DEFAULT_DECORATOR_OPTIONS, config);
    const tmpObs = clss.prototype[observerAttrs];
    delete clss.prototype[observerAttrs];
    const initListeners = clss.prototype[listenersWarpper];
    delete clss.prototype[listenersWarpper];
    
    function tmpClss(cmp) {
        this[warpperElementProp] = cmp;
        clss.call(this);
    }
    Object.setPrototypeOf(tmpClss.prototype, clss.prototype);

    class tmp extends QuantumElement {
        static selector = config.selector;
        static encapsulation = config.useShadow;
        automaticDetection = config.automaticDetection;

        static get observedAttributes() {
            return [...tmpObs];
        }


        template() {
            if(config.templateUrl)
                return compileTemplateString(config.templateUrl, this[warpperElementProp]);
            else if (config.template)
                return compileTemplateString(config.template, this[warpperElementProp]);
            else 
                return null;
        }

        constructor() {
            super();
            const c = new tmpClss(this);
            this[warpperElementProp] = c;
        }
    }
    
    (tmp as any).initListeners = initListeners;

    customElements.define(config.selector, tmp);
    return tmpClss;
}

export function QSingleton(Target:any) {

    Target.getInstance = function(...args:any[]) {
  
      var original = Target;
  
      function construct(constructor) {
        var c : any = function () {
          return constructor.apply(this, args);
        }
        c.prototype = constructor.prototype;
        return new c();
      }
  
      var f : any = function () {
        return construct(original);
      }
  
      if (!original.instance) {
          f.prototype = original.prototype;
          original.instance = new f();
      }
  
      return original.instance;
    }
  
}