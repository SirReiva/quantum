console.log('Woker init');
const CREATE = 'CREATE';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
const UPDATE = 'UPDATE';
const SET_PROP = 'SET_PROP';
const REMOVE_PROP = 'REMOVE PROP';
const SET_EVENT = 'SET EVENT';
const REPLACE_EVENT = 'REPLACE EVENT';
const REMOVE_EVENT = 'REMOVE EVENT';

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type;
}

function isEventProp(name) {
    return /^on/.test(name);
}

function diffProps(newNode, oldNode) {
    const patches = [];
    const props = Object.assign({}, newNode.props, oldNode.props);
    Object.keys(props).forEach(name => {
        const newVal = newNode.props[name];
        const oldVal = oldNode.props[name];
        if (isEventProp(name)) {} else {
            if (newVal === null || newVal === false) {
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

function diff(newNode, oldNode) {
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
self.addEventListener('message', function(e) {
    //console.time("diff" + e.data.id);
    const { id, payload } = e.data;
    const msg = {
        id,
        payload: diff(payload.newNode, payload.oldNode)
    }
    self.postMessage(msg);
    //console.timeEnd("diff" + e.data.id);
}, false);