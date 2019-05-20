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

export function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
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
            } else if (!oldVal && newVal !== oldVal) {
                patches.push({ type: SET_EVENT, name, value: newVal });
            } else if (oldVal && newVal !== oldVal) {
                patches.push({ type: REPLACE_EVENT, name, value: newVal, prevVal: oldVal });
            }
        } else {
            if (!newVal) {
                patches.push({ type: REMOVE_PROP, name, value: oldVal });
            } else if (!oldVal || newVal !== oldVal) {
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
        patches[i] = diff(
            newNode.children[i],
            oldNode.children[i]
        );
    }
    return patches;
}

export function diff(newNode, oldNode) {
    if (!oldNode) {
        return { type: CREATE, newNode };
    }
    if (!newNode) {
        return { type: REMOVE };
    }
    if (changed(newNode, oldNode)) {
        return { type: REPLACE, newNode };
    }
    if (newNode.type) {
        return {
            type: UPDATE,
            props: diffProps(newNode, oldNode),
            children: diffChildren(newNode, oldNode),
        };
    }
}

export function createElement(node) {
    if (typeof node === 'string' || typeof node === 'number') {
        return document.createTextNode(node.toString());
    }
    const el = document.createElement(node.type);
    setProps(el, node.props);
    addEventListeners(el, node.props);
    if (node.children)
        node.children
        .map(createElement)
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
        target.setAttribute(name, value);
        target[name] = true;
    } else {
        target[name] = false;
    }
}

function setProp(target, name, value) {
    if (isEventProp(name)) {
        return;
    }
    if (isTwoWayDataBindingProp(name)) {
        /*let correctName = name.replace('q-', '');
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
        return setProp(target, correctName, value);*/
    }
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
    target.removeAttribute(name);
}

function addEvent(target, event, eventName) {
    target.addEventListener(eventName, event);
}

function removeEvent(target, event, eventName) {
    target.removeEventListener(eventName, event);
}

function patchProps(parent, patches) {
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
export function queuPatches(parent, patches, index = 0) {
    domUpdates.push({ parent, patches, index });
}

function doPatchs() {
    let ptch = null;
    if (domUpdates.length === 0) {} else {
        let i = 0;
        while (ptch = domUpdates.shift()) {
            let { parent, patches, index } = ptch;
            patch(parent, patches, index);
            i++;
            if (i > 20) break;
        }
    }
    requestAnimationFrame(doPatchs);
}

requestAnimationFrame(doPatchs);

function patch(parent, patches, index = 0) {
    if (!patches) { return; }
    const el = parent.childNodes[index];
    switch (patches.type) {
        case CREATE:
            {
                const { newNode } = patches;
                const newEl = createElement(newNode);
                return parent.appendChild(newEl);
            }
        case REMOVE:
            {
                return parent.removeChild(el);
            }
        case REPLACE:
            {
                const { newNode } = patches;
                const newEl = createElement(newNode);
                return parent.replaceChild(newEl, el);
            }
        case UPDATE:
            {
                const { props, children } = patches;
                patchProps(el, props);
                for (let i = 0; i < children.length; i++) {
                    patch(el, children[i], i);
                }
            }
    }
}

function flatten(arr) {
    return [].concat.apply([], arr);
}

export function h(type, props, ...children) {
    props = props || {};
    return { type, props, children: flatten(children) };
}

export function defineQuantumElement(tag, calssEl) {
    customElements.define(tag, calssEl);
}