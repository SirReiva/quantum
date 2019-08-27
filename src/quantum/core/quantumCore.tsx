import qWorker from './qWorker';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

export const DIFF_MODE_WOKER = true;

const CREATE = 'CREATE';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
const UPDATE = 'UPDATE';
const SET_PROP = 'SET_PROP';
const REMOVE_PROP = 'REMOVE PROP';
const SET_EVENT = 'SET EVENT';
const REPLACE_EVENT = 'REPLACE EVENT';
const REMOVE_EVENT = 'REMOVE EVENT';

const SPECIAL_PROPS = ['value', 'checked'];

const PATCHSFPS = 40;

let worker:qWorker = null;
if(DIFF_MODE_WOKER) {
    worker = new qWorker();
}

declare var window: any;
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

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

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        doPatchsHidden();
    }
});
/*UTILS*/
export function validateSelector(selector: string) {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};
export function isInViewport(elem: HTMLElement):Boolean {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top + bounding.height >= 0 &&
        bounding.left + bounding.width >= 0 &&
        bounding.bottom - bounding.height <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right - bounding.width <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
export function isFunction(functionToCheck: any) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function isObject(objectToCheck: any) {
    return typeof objectToCheck === 'object'
}

function isEventProp(name: string) {
    return /^on/.test(name);
}

function extractEventName(name: string) {
    return name.slice(2).toLowerCase();
}

function flatten(arr: any[]) {
    return [].concat.apply([], arr);
}

function copyObject(src: any) {
    return Object.assign({}, src);
}

function purgeProps(obj: any) {
    Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : '');
}

function xmlToJson(xml: any) {

    var obj: any = { type: xml.tagName, children: [], attributes: null };

    if (xml.nodeType == 1) {
        if (xml.attributes.length > 0) {
            obj.attributes = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj.attributes[attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) {
        obj.children.push(xml.nodeValue);
    }

    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            if (item.nodeType == 3) {
                obj.children.push(item.nodeValue);
            } else if (item.nodeType == 1) {
                obj.children.push(xmlToJson(item));
            }
        }
    }
    if (xml.nodeType == 9) {
        obj = obj.children[0];
    }
    return obj;
}

function stringToXml(value: string) {
    return new window.DOMParser().parseFromString(value, "text/xml");
}

export function checkMobile(a: string) {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
}

export function debounce(func: () => void, wait = 50) {
    let h: any;
    return (...args : any) => {
        clearTimeout(h);
        h = setTimeout(() => func.apply(args), wait);
    };
}

/*function isTwoWayDataBindingProp(name: string) {
    return /^q-/.test(name);
}*/
/*DIFF*/
function changed(node1: any, node2: any) {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type;
}

function diffProps(newNode: any, oldNode: any) {
    const patches: any[] = [];
    const props = Object.assign({}, newNode.props, oldNode.props);
    Object.keys(props).forEach(name => {
        const newVal = newNode.props[name];
        const oldVal = oldNode.props[name];
        if (isEventProp(name)) {
            if (!newVal) {
                patches.push({ type: REMOVE_EVENT, name, value: oldVal });
            } else if (!oldVal && newVal/*.toString() !== oldVal.toString()*/) {
                patches.push({ type: SET_EVENT, name, value: newVal });
            } else /*if (oldVal && newVal.toString() !== oldVal.toString())*/ {
                //console.log(name, newNode.type);
                patches.push({ type: REPLACE_EVENT, name, value: newVal, prevVal: oldVal });
            }
        } else {
            if (newVal === null || newVal === false) {
                patches.push({ type: REMOVE_PROP, name, value: oldVal });
            } else if (!oldVal || JSON.stringify(newVal) !== JSON.stringify(oldVal)) { //comparar valor??
                patches.push({ type: SET_PROP, name, value: newVal });
            }
        }

    });
    return patches;
}

function diffChildren(newNode: any, oldNode: any) {
    const patches = [];
    const patchesLength = Math.max(
        newNode.children.length,
        oldNode.children.length
    );
    for (let i = 0; i < patchesLength; i++) {
        let df: any = diff(
            newNode.children[i],
            oldNode.children[i]
        )
        if (df) patches[i] = df;
    }
    return patches;
}

export function diff(newNode: any, oldNode: any) {
    if (!oldNode && newNode) {
        return { type: CREATE, newNode };
    }
    if (!newNode && oldNode) {
        return { type: REMOVE };
    }
    if (oldNode && newNode && changed(newNode, oldNode)) {
        return { type: REPLACE, newNode };
    }
    if (newNode && newNode.type) {
        return {
            type: UPDATE,
            props: diffProps(newNode, oldNode),
            children: diffChildren(newNode, oldNode),
        };
    }
    return null;
}

function diffChildrenFunctions(newNode: any, oldNode: any) {
    const patches = [];
    const patchesLength = Math.max(
        newNode.children.length,
        (oldNode)?oldNode.children.length: 0
    );
    for (let i = 0; i < patchesLength; i++) {
        let df: any = diffOnlyFunction(
            newNode.children[i],
            (oldNode)?oldNode.children[i]:null
        )
        if (df) patches[i] = df;
    }
    return patches;
}

function diffPropsFun(newNode: any, oldNode: any) {
    const patches: any[] = [];
    const props = Object.assign({}, newNode.props, (oldNode)?oldNode.props || {}: {});
    Object.keys(props).forEach(name => {
        if (isEventProp(name)) {
            const newVal = newNode.props[name];
            if(oldNode) {
                const oldVal = oldNode.props[name];
                if (isEventProp(name)) {
                    if (!newVal) {
                        patches.push({ type: REMOVE_EVENT, name, value: oldVal });
                    } else if (!oldVal && newVal/*.toString() !== oldVal.toString()*/) {
                        patches.push({ type: SET_EVENT, name, value: newVal });
                    } else /*if (oldVal && newVal.toString() !== oldVal.toString())*/ {
                        //console.log(name, newNode.type);
                        patches.push({ type: REPLACE_EVENT, name, value: newVal, prevVal: oldVal });
                    }
                }
            } else {
                patches.push({ type: SET_EVENT, name, value: newVal });
            }
        }
    });
    return patches;
}
export function diffOnlyFunction(newNode: any, oldNode: any) {
    if (newNode && newNode.type) {
        return {
            type: UPDATE,
            props: diffPropsFun(newNode, oldNode),
            children: diffChildrenFunctions(newNode, oldNode),
        };
    }
    return null;
}
export function asyncDiff(newNode: any, oldNode: any) {
    if(worker) {
        return worker.call({
            newNode,
            oldNode
        })
    }
    return Promise.reject('Not worker initializated');
}
/*DOM & PATCHS*/
export function createElement(node: any, refs: any = {}) {
    if (typeof node === 'string' || typeof node === 'number') {
        return document.createTextNode(node.toString());
    }
    const frag = document.createDocumentFragment();
    const el = (precachedElements[node.type])?precachedElements[node.type].cloneNode():document.createElement(node.type);
    frag.append(el);
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
        node.children
        .map((childEl: any) => createElement(childEl, refs))
        .forEach(fragChilds.appendChild.bind(fragChilds));
        el.appendChild(fragChilds);
    }
    return frag;
}

/*if (isTwoWayDataBindingProp(name)) {
    let correctName = name.replace('q-', '');
    var mutationObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === correctName) {
                console.log('chii');
            }
        });
    });
    mutationObserver.observe(target, {
        attributes: true
    });
    target.mutation = mutationObserver;
    return setProp(target, correctName, value);
}*/

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
        return setBooleanProp(target, name, value);
    }
    if (Array.isArray(value)) {
        target.objectAttrs[name] = [...value];
        return target.setAttribute(name, 'q-json-obj://' + JSON.stringify(value));
    }
    if(isFunction(value)) {
        target.objectAttrs[name] = value;
        return target.setAttribute(name, 'q-string-func://' + value);
    }
    if (typeof value === 'object') {
        target.objectAttrs[name] = Object.assign({}, value);
        return target.setAttribute(name, 'q-json-obj://' + JSON.stringify(value));
    }
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
    target.addEventListener(eventName, event);
}

function removeEvent(target: any, event: Function, eventName: string) {
    target.removeEventListener(eventName, event);
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
            removeEvent(parent, value, name);
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
                    return -1;
                }
                return 0;
            }
        case REPLACE:
            {
                const { newNode } = patches;
                if (newNode) {
                    const newEl = createElement(newNode, refs);
                    if (el) parent.replaceChild(newEl, el);
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

/*VDOM*/
export function h(type: string, props: any, ...children: any[]) {
    if(!type)
        return undefined;
    const vElem = Object.create(null);
    // props = JSON.parse(JSON.stringify(props || {}));
    props = copyObject(props);
    purgeProps(props); //??
    Object.assign(vElem, {
        type,
        props,
        children: flatten(children.filter(ch => (ch !== null && ch !== undefined && ch !== false)))
    });
    return vElem;
}

function jsonToHyperscript(jsObject: any) {
    return h(jsObject.type, jsObject.attributes, ...jsObject.children.map((o: any) => {
        if (isObject(o)) return jsonToHyperscript(o);
        return o;
    }));

}

export function compileTemplateString(temlpate: string) {
    try {
        return jsonToHyperscript(xmlToJson(stringToXml(temlpate)));
    } catch (exp) {
        console.error(exp);
        return h('div', null, ' ')
    }
}

/*WEBCOMPONENTS*/
let registeredQElements: string[] = [];
export function isRegisteredQuantumElement(name: string) {
    return registeredQElements.indexOf(name) !== -1;
    //return document.createElement(name).constructor !== HTMLElement;
}

export function defineQuantumElement(calssEl: any, tag?: string) {
    try {
        if(tag) {
            if(!isRegisteredQuantumElement(tag)) {
                customElements.define(tag, calssEl);
                registeredQElements.push(tag);
            } else {
                console.error(tag + ' Already defined');
            }
        } else {
            if(!isRegisteredQuantumElement(calssEl.tagName)) {
                customElements.define(calssEl.tagName, calssEl);
                registeredQElements.push(calssEl.tagName);
            } else {
                console.error(calssEl.tagName + ' Already defined');
            }
        }
    } catch( exc ) { console.warn(exc); }
}


/*function customStringify(obj: any, prop: string) {
    var placeholder = '____PLACEHOLDER____';
    var fns: any[] = [];
    var json = JSON.stringify(obj, function(key, value) {
      if (typeof value === 'function') {
        fns.push(value);
        return placeholder;
      }
      return value;
    }, 2);
    json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function(_) {
      return fns.shift();
    });
    return 'this["' + prop + '"] = ' + json + ';';
}*/