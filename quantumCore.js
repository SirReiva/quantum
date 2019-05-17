const CREATE = 'CREATE'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
const UPDATE = 'UPDATE'
const SET_PROP = 'SET_PROP'
const REMOVE_PROP = 'REMOVE PROP'

//// DIFF

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type
}

function diffProps(newNode, oldNode) {
    const patches = []
    const props = Object.assign({}, newNode.props, oldNode.props)
    Object.keys(props).forEach(name => {
        const newVal = newNode.props[name]
        const oldVal = oldNode.props[name]
        if (!newVal) {
            patches.push({ type: REMOVE_PROP, name, value: oldVal })
        } else if (!oldVal || newVal !== oldVal) {
            patches.push({ type: SET_PROP, name, value: newVal })
        }
    })
    return patches
}

function diffChildren(newNode, oldNode) {
    const patches = []
    const patchesLength = Math.max(
        newNode.children.length,
        oldNode.children.length
    )
    for (let i = 0; i < patchesLength; i++) {
        patches[i] = diff(
            newNode.children[i],
            oldNode.children[i]
        )
    }
    return patches
}

function diff(newNode, oldNode) {
    if (!oldNode) {
        return { type: CREATE, newNode }
    }
    if (!newNode) {
        return { type: REMOVE }
    }
    if (changed(newNode, oldNode)) {
        return { type: REPLACE, newNode }
    }
    if (newNode.type) {
        return {
            type: UPDATE,
            props: diffProps(newNode, oldNode),
            children: diffChildren(newNode, oldNode),
        }
    }
}

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node)
    }
    const el = document.createElement(node.type)
    setProps(el, node.props)
    node.children
        .map(createElement)
        .forEach(el.appendChild.bind(el))
    return el
}

function setProp(target, name, value) {
    if (name === 'className') {
        return target.setAttribute('class', value)
    }
    target.setAttribute(name, value)
}

function setProps(target, props) {
    Object.keys(props).forEach(name => {
        setProp(target, name, props[name])
    })
}

function removeProp(target, name, value) {
    if (name === 'className') {
        return target.removeAttribute('class')
    }
    target.removeAttribute(name)
}

function patchProps(parent, patches) {
    for (let i = 0; i < patches.length; i++) {
        const propPatch = patches[i]
        const { type, name, value } = propPatch
        if (type === SET_PROP) {
            setProp(parent, name, value)
        }
        if (type === REMOVE_PROP) {
            removeProp(parent, name, value)
        }
    }
}

function patch(parent, patches, index = 0) {
    if (!patches) { return }
    const el = parent.childNodes[index]
    switch (patches.type) {
        case CREATE:
            {
                const { newNode } = patches
                const newEl = createElement(newNode)
                return parent.appendChild(newEl)
            }
        case REMOVE:
            {
                return parent.removeChild(el)
            }
        case REPLACE:
            {
                const { newNode } = patches
                const newEl = createElement(newNode)
                return parent.replaceChild(newEl, el)
            }
        case UPDATE:
            {
                const { props, children } = patches
                patchProps(el, props)
                for (let i = 0; i < children.length; i++) {
                    patch(el, children[i], i)
                }
            }
    }
}

function flatten(arr) {
    return [].concat.apply([], arr)
}

function h(type, props, ...children) {
    props = props || {}
    return { type, props, children: flatten(children) }
}