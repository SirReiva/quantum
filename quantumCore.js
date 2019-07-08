const CREATE = 'CREATE';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
const UPDATE = 'UPDATE';
const SET_PROP = 'SET_PROP';
const REMOVE_PROP = 'REMOVE PROP';
const SET_EVENT = 'SET EVENT';
const REPLACE_EVENT = 'REPLACE EVENT';
const REMOVE_EVENT = 'REMOVE EVENT';
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        doPatchsHidden();
    }
});

export function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function isObject(objectToCheck) {
    return typeof objectToCheck === 'object'
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type;
}

function diffProps(newNode, oldNode) {
    const patches = [];
    const props = Object.assign({}, newNode.props, oldNode.props);
    Object.keys(props).forEach(name => {
        const newVal = newNode.props[name];
        const oldVal = oldNode.props[name];
        if (isEventProp(name)) {
            if (!newVal) {
                patches.push({ type: REMOVE_EVENT, name, value: oldVal });
            } else if (!oldVal && newVal.toString() !== oldVal.toString()) {
                patches.push({ type: SET_EVENT, name, value: newVal });
            } else if (oldVal && newVal.toString() !== oldVal.toString()) {
                patches.push({ type: REPLACE_EVENT, name, value: newVal, prevVal: oldVal });
            }
        } else {
            if (!newVal && newVal !== '') {
                patches.push({ type: REMOVE_PROP, name, value: oldVal });
            } else if (!oldVal || JSON.stringify(newVal) !== JSON.stringify(oldVal)) { //comparar valor??
                patches.push({ type: SET_PROP, name, value: newVal });
            }
        }

    });
    return patches;
}

function diffChildren(newNode, oldNode) {
    const patches = [];
    const patchesLength = Math.max(
        newNode.children.length,
        oldNode.children.length
    );
    for (let i = 0; i < patchesLength; i++) {
        let df = diff(
            newNode.children[i],
            oldNode.children[i]
        )
        if (df) patches[i] = df;
    }
    return patches;
}

export function diff(newNode, oldNode) {
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

export function createElement(node, refs) {
    if (typeof node === 'string' || typeof node === 'number') {
        return document.createTextNode(node.toString());
    }
    const el = document.createElement(node.type);
    if (node.props && node.props.ref) {
        refs[node.props.ref] = el;
    }
    setProps(el, node.props);
    addEventListeners(el, node.props);
    if (node.children && node.children.length > 0)
        node.children
        .map(childEl => createElement(childEl, refs))
        .forEach(el.appendChild.bind(el));
    return el;
}

function isEventProp(name) {
    return /^on/.test(name);
}

function extractEventName(name) {
    return name.slice(2).toLowerCase();
}

function isTwoWayDataBindingProp(name) {
    return /^q-/.test(name);
}

function addEventListeners(target, props) {
    if (!props) return;
    Object.keys(props).forEach(name => {
        if (isEventProp(name)) {
            // target[name.toLowerCase()] = props[name];
            addEvent(target, props[name], extractEventName(name));
        }
    });
}

function setBooleanProp(target, name, value) {
    if (value) {
        target.setAttribute(name, '');
    } else {
        target.removeAttribute(name);
    }
}

function setProp(target, name, value) {
    if (isEventProp(name)) {
        return;
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
    if (name === 'className') {
        return target.setAttribute('class', value);
    }
    if (typeof value === 'boolean') {
        return setBooleanProp(target, name, value);
    }
    if (typeof value === 'object') {
        return target.setAttribute(name, 'q-json-obj://' + JSON.stringify(value));
    }
    target.setAttribute(name, value);
}

function setProps(target, props) {
    if (!props) return;
    Object.keys(props).forEach(name => {
        setProp(target, name, props[name]);
    });
}

function removeProp(target, name, value) {
    if (name === 'className') {
        return target.removeAttribute('class');
    }
    target[name] = null;
    return target.removeAttribute(name);
}

function addEvent(target, event, eventName) {
    target.addEventListener(eventName, event);
}

function removeEvent(target, event, eventName) {
    target.removeEventListener(eventName, event);
}

function patchProps(parent, patches) {
    if (!patches) return;
    for (let i = 0; i < patches.length; i++) {
        const propPatch = patches[i];
        const { type, name, value, prevVal } = propPatch;
        if (type === SET_PROP) {
            setProp(parent, name, value);
        } else if (type === REMOVE_PROP) {
            removeProp(parent, name, value);
        } else if (type === REMOVE_EVENT) {
            removeEvent(parent, value, name);
        } else if (SET_EVENT) {
            addEvent(parent, value, name);
        } else if (REPLACE_EVENT) {
            removeEvent(parent, prevVal, name);
            addEvent(parent, value, name);
        }
    }
}

let domUpdates = [];
export function queuPatches(parent, patches, refs, index = 0) {
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
            if (i > 20) break;
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
            if (i > 20) break;
        }
    }
    if (document.visibilityState === 'hidden') {
        setTimeout(doPatchsHidden, 1000);
    }

}

requestAnimationFrame(doPatchs);

function patch(parent, patches, refs, index = 0) {
    if (!patches || patches.length == 0) { return 0; }
    const el = parent.childNodes[index];
    switch (patches.type) {
        case CREATE:
            {
                const { newNode } = patches;
                const newEl = createElement(newNode, refs);
                parent.appendChild(newEl);
                return 0;
            }
        case REMOVE:
            {
                if (el) {
                    parent.removeChild(el);
                    if (el.hasAttribute('ref')) {
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
                const { props, children } = patches;
                if (!children) return;
                patchProps(el, props);
                for (let i = 0; i < children.length; i++) {
                    if (children[i]) {
                        let df = patch(el, children[i], refs, i);
                        i += df;
                    }
                }
                return 0;
            }
    }
}

function flatten(arr) {
    return [].concat.apply([], arr);
}

function copyObject(src) {
    return Object.assign({}, src);
}

function purgeProps(obj) {
    Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : '');
}

export function h(type, props, ...children) {
    const vElem = Object.create(null);
    // props = JSON.parse(JSON.stringify(props || {}));
    props = copyObject(props);
    purgeProps(props); //??
    Object.assign(vElem, {
        type,
        props,
        children: flatten(children)
    });
    return vElem;
}

export function defineQuantumElement(tag, calssEl) {
    customElements.define(tag, calssEl);
}

function xmlToJson(xml) {

    var obj = { type: xml.tagName, children: [], attributes: null };

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

function stringToXml(value) {
    return new window.DOMParser().parseFromString(value, "text/xml");
}

function jsonToHyperscript(jsObject) {
    return h(jsObject.type, jsObject.attributes, ...jsObject.children.map(o => {
        if (isObject(o)) return jsonToHyperscript(o);
        return o;
    }));

}

export function compileTemplateString(temlpate) {
    try {
        return jsonToHyperscript(xmlToJson(stringToXml(temlpate)));
    } catch (exp) {
        console.error(exp);
        return h('div', null, ' ')
    }
}

export function debounce(callback, wait) {
    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
}