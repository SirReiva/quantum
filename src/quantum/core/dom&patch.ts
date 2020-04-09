import { extractEventName, isFunction, isEventProp } from './utils';
import { isRegisteredQuantumElement } from './elements';
import { SET_PROP, REMOVE_PROP, REMOVE_EVENT, SET_EVENT, REPLACE_EVENT, CREATE, REMOVE, REPLACE, UPDATE } from './vDomActions';

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

const SPECIAL_PROPS = ['value', 'checked', 'selected', 'disabled'];

const PATCHSFPS = 40;

declare var window: any;
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        doPatchsHidden();
    }
});

export function createElement(node: any, refs: any = {}) {
    if (typeof node === 'string' || typeof node === 'number') {
        return document.createTextNode(node.toString());
    }
    const el = (precachedElements[node.type])?precachedElements[node.type].cloneNode():document.createElement(node.type);
    if(el instanceof HTMLUnknownElement) {
        throw new Error("Unkown element tag " + node.type);
    }
    if (node.props && node.props.ref) {
        refs[node.props.ref] = el;
    }
    setProps(el, node.props);
    addEventListeners(el, node.props);
    if (node.children && node.children.length > 0) {
        const fragChilds = document.createDocumentFragment();
        for(let i = 0; i < node.children.length; i++) {
            let vNonde = createElement(node.children[i], refs);
            fragChilds.appendChild(vNonde)
        }
        /*node.children
        .map((childEl: any) => createElement(childEl, refs))
        .forEach(fragChilds.appendChild.bind(fragChilds));*/
        el.appendChild(fragChilds);
    }
    return el;
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

function setBooleanProp(target: any, name: string, value: boolean) {
    if (value) {
        target.setAttribute(name, '');
    } else {
        target.removeAttribute(name);
    }
    if (SPECIAL_PROPS.indexOf(name) !== -1) target[name] = value;
}

function setProp(target: any, name: string, value: any) {
    if (isEventProp(name)) return;
    if (name === 'className') {
        if (value === '')
            return target.removeAttribute('class');
        else
            return target.setAttribute('class', value);
    }
    if (typeof value === 'boolean') {
        /*if(target.objectAttrs)
            target.objectAttrs[name] = value;*/
        return setBooleanProp(target, name, value);
    }
    if (Array.isArray(value)) {
        if(target.objectAttrs)
            target.objectAttrs[name] = [...value];
        return target.setAttribute(name, 'q-json-obj://' + JSON.stringify(value));
    }
    if(isFunction(value)) {
        if(target.objectAttrs)
            target.objectAttrs[name] = value;
        return target.setAttribute(name, 'q-string-func://' + value);
    }
    if (typeof value === 'object') {
        if(target.objectAttrs)
            target.objectAttrs[name] = Object.assign({}, value);
        return target.setAttribute(name, 'q-json-obj://' + JSON.stringify(value));
    }
    /*if(target.objectAttrs)
        target.objectAttrs[name] = value;*/
    //console.log(target, name, value);
    target.setAttribute(name, value);
    if (SPECIAL_PROPS.indexOf(name) !== -1) target[name] = value;
}

function setProps(target: any, props: any) {
    if (!props) return;
    Object.keys(props).forEach(name => {
        setProp(target, name, props[name]);
    });
}

function removeProp(target: any, name: string/*, value: any*/) {
    let value: any = null;
    if (target.objectAttrs && target.objectAttrs[name]) value = target.objectAttrs[name];
    if (value && (typeof value === 'object' || isFunction(value)) || Array.isArray(value)) {
        delete target.objectAttrs[name];
    }
    if (name === 'className') {
        return target.removeAttribute('class');
    }
    if (SPECIAL_PROPS.indexOf(name) !== -1) target[name] = null;
    return target.removeAttribute(name);
}

function addEvent(target: any, event: Function, eventName: string) {
    if(!target.listeners) {
        target.listeners = {};
    }
    if(!target.listeners[eventName])
        target.listeners[eventName] = [];
    target.listeners[eventName].push(event);
    target.addEventListener(eventName, event);
}

function removeEvent(target: any, event: Function, eventName: string) {
    const index: number =  target.listeners[eventName].indexOf(event);
    if(index !== -1) {
        target.listeners[eventName].splice(index, 1);
        if(target.listeners[eventName].length === 0) {
            delete target.listeners[eventName];
        }
    }
    target.removeEventListener(eventName, event);
}

function removeListeners(el: any) {
    if(el.listeners) return;
    for (const evName in el.listeners) {
        for(let i = 0; i < el .listeners[evName]; i++) {
            el.removeEventListener(evName, el .listeners[evName][i]);
        }
    }
    delete el.listeners;
}

export function scrapListenersRemove(el: any) {
    removeListeners(el);
    for (let i = 0; i < el.childNodes.length; i++) {
        if(el.childNodes.nodeType === 11)
            scrapListenersRemove(el.childNodes[i]);
        else if(el.tagName) {
            if(!isRegisteredQuantumElement(el.childNodes[i].tagName.toLowerCase()) && el.childNodes[i].tagName !== "STYLE") {
                scrapListenersRemove(el.childNodes[i]);
            }
        }
    }
}

function patchProps(parent: any, patches: any) {
    if (!patches) return;
    for (let i = 0; i < patches.length; i++) {
        const propPatch = patches[i];
        const { type, name, value, prevVal } = propPatch;
        if (type === SET_PROP) {
            setProp(parent, name, value);
        } else if (type === REMOVE_PROP) {
            removeProp(parent, name/*, value*/);
        } else if (type === REMOVE_EVENT) {
            removeEvent(parent, value, extractEventName(name));
        } else if (type === SET_EVENT) {
            addEvent(parent, value, extractEventName(name));
        } else if (type === REPLACE_EVENT) {
            removeEvent(parent, prevVal, extractEventName(name));
            addEvent(parent, value, extractEventName(name));
        }
    }
}

let domUpdates: any[] = [];
export function queuPatches(parent: any, patches: any, refs: any, index = 0) {
    domUpdates.push({ parent, patches, index, refs });
}

function doPatchs() {
    window.stats.begin();
    let ptch = null;
    if (domUpdates.length === 0) {} else {
        let i = 0;
        while (ptch = domUpdates.shift()) {
            let { parent, patches, refs, index } = ptch;
            patch(parent, patches, refs, index);
            i++;
            if (i > PATCHSFPS) break;
        }
    }
    window.stats.end();
    requestAnimationFrame(doPatchs);
}

function doPatchsHidden() {
    let ptch = null;
    if (domUpdates.length === 0) {} else {
        let i = 0;
        while (ptch = domUpdates.shift()) {
            let { parent, patches, refs, index } = ptch;
            patch(parent, patches, refs, index);
            i++;
            if (i > PATCHSFPS) break;
        }
    }
    if (document.visibilityState === 'hidden') {
        setTimeout(doPatchsHidden, 1000);
    }

}

requestAnimationFrame(doPatchs);

function patch(parent: any, patches: any, refs: any, index = 0): number {
    if (!patches || patches.length == 0) { return 0; }
    const el = parent.childNodes[index];
    switch (patches.type) {
        case CREATE:
            {
                const { newNode } = patches;
                if(newNode.type === undefined && typeof newNode !== 'string' && typeof newNode !== 'number')
                    return 0;
                const newEl = createElement(newNode, refs);
                /*if(parent.childElementCount === 0) {
                    parent.appendChild(newEl);
                    return 0;
                } else*/
                if(parent.childNodes[index]) {
                    parent.insertBefore(newEl, parent.childNodes[index]);
                    return 1;
                } else {
                    parent.appendChild(newEl);
                    return 0;
                }
            }
        case REMOVE:
            {
                if (el) {
                    parent.removeChild(el);
                    if (el.hasAttribute && el.hasAttribute('ref')) {
                        delete refs[el.getAttribute('ref')];
                    }
                    removeListeners(el);
                    return -1;
                }
                return 0;
            }
        case REPLACE:
            {
                const { newNode } = patches;
                if (newNode) {
                    const newEl = createElement(newNode, refs);
                    if (el) {
                        parent.replaceChild(newEl, el);
                        if (el.hasAttribute && el.hasAttribute('ref')) {
                            delete refs[el.getAttribute('ref')];
                        }
                        removeListeners(el);
                    }
                }
                return 0;
            }
        case UPDATE:
            {
                if (!el) return 0;
                const { props, children } = patches;
                patchProps(el, props);
                if (!children) return;
                let childI = 0;
                for (let i = 0; i < children.length; i++) {
                    if (children[i]) {
                        let df = patch(el, children[i], refs, childI);
                        childI += df + 1;
                    }
                }
                return 0;
            }
    }
    return 0;
}