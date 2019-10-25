import { ChildrenNode } from './interfaces';

const pElement = document.createElement('p');
const divElement = document.createElement('div');
const inputElement = document.createElement('input');
const h1Element = document.createElement('h1');
const h2Element = document.createElement('h1');
const h3Element = document.createElement('h1');
const h4Element = document.createElement('h1');
const h5Element = document.createElement('h1');
const h6Element = document.createElement('h1');
const spanElement = document.createElement('span');
const bElement = document.createElement('b');
const strongElement = document.createElement('strong');
const ulElement = document.createElement('ul');
const olElement = document.createElement('ol');
const liElement = document.createElement('li');
const aElement = document.createElement('a');
const imgElement = document.createElement('img');

const precachedElements: any = [];
precachedElements['p'] = pElement;
precachedElements['div'] = divElement;
precachedElements['input'] = inputElement;
precachedElements['h1'] = h1Element;
precachedElements['h2'] = h2Element;
precachedElements['h3'] = h3Element;
precachedElements['h4'] = h4Element;
precachedElements['h5'] = h5Element;
precachedElements['h6'] = h6Element;
precachedElements['span'] = spanElement;
precachedElements['b'] = bElement;
precachedElements['strong'] = strongElement;
precachedElements['ul'] = ulElement;
precachedElements['ol'] = olElement;
precachedElements['li'] = liElement;
precachedElements['a'] = aElement;
precachedElements['img'] = imgElement;

const SPECIAL_REFLECT_ATTRIBUTES = ['disabled', 'checked', 'value'];

export function isEventProp(name: string): boolean {
    return /^on/.test(name);
}
export function isFunction(functionToCheck: any): boolean {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function isObject(objectToCheck: any): boolean {
    return typeof objectToCheck === 'object'
}

export function extractEventName(name: string): string {
    return name.slice(2).toLowerCase();
}

function setProps(target: HTMLElement, props: any) {
    if (!props) return;
    Object.keys(props).forEach(name => {
        if(!isEventProp(name)){
            setProp(target, name, props[name]);
        }
    });
}

export function setProp(target: HTMLElement, name: string, value: any) {
    if(value === null || value === undefined) {
        target.setAttribute(name, '');
    } else if (typeof value === 'number' || typeof value === 'string') {
        target.setAttribute(name, value.toString());
    } else if(typeof value === 'boolean') {
        (value)?target.setAttribute(name, ''):target.removeAttribute(name);
    } else if(Array.isArray(value) || isObject(value)) {
        target.setAttribute(name, JSON.stringify(value));
    } else if (isFunction(value)) {
        target.setAttribute(name, '' + value)
    }
    
    if(SPECIAL_REFLECT_ATTRIBUTES.includes(name)) target[name] = value;
}

export function removeProp(target: HTMLElement, propName: string) {
    target.removeAttribute(propName);
    if(SPECIAL_REFLECT_ATTRIBUTES.includes(propName)) {
        target[propName] = false;
    }

}

export function addEvent(target: any, event: Function, eventName: string) {
    target.addEventListener(eventName, event);
}

export function removeEvent(target: any, event: Function, eventName: string) {
    target.removeEventListener(eventName, event);
}

function addEventListeners(target: any, props: any) {
    if (!props) return;
    Object.keys(props).forEach(name => {
        if (isEventProp(name)) {
            // target[name.toLowerCase()] = props[name];
            addEvent(target, props[name], extractEventName(name));
        }
    });
}

export function createElementVNode(node: ChildrenNode, refs: any): HTMLElement|Text {
    if (typeof node === 'string' || typeof node === 'number') {
        return document.createTextNode(node.toString());
    }
    const el = (precachedElements[node.type])?precachedElements[node.type].cloneNode():document.createElement(node.type);
    if(el instanceof HTMLUnknownElement) {
        throw new Error("Unkown element tag " + node.type);
    }
    if (node.attrs && node.attrs.ref) {
        refs[node.attrs.ref] = el;
    }
    setProps(el, node.attrs);
    addEventListeners(el, node.attrs);
    if (node.children && node.children.length > 0) {
        const fragChilds = document.createDocumentFragment();
        for(let i = 0; i < node.children.length; i++) {
            let vNonde = createElementVNode(node.children[i], refs);
            fragChilds.appendChild(vNonde)
        }
        el.appendChild(fragChilds);
    }
    return el;
}