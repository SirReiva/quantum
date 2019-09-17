import qWorker from './qWorker';
import { qVNode, qPatch, qPatchProps } from './interfaces';
import { isEventProp } from './utils';
import { REMOVE_EVENT, SET_EVENT, REPLACE_EVENT, REMOVE_PROP, SET_PROP, CREATE, REMOVE, REPLACE, UPDATE } from './vDomActions';

export const DIFF_MODE_WOKER = true && (typeof(Worker) !== "undefined");

let worker:qWorker = null;
if(DIFF_MODE_WOKER) {
    worker = new qWorker();
}

/*DIFF*/
function changed(node1: any, node2: any): boolean {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type;
}

function diffProps(newNode: qVNode, oldNode: qVNode): qPatchProps[] {
    const patches: qPatchProps[] = [];
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

function diffChildren(newNode: qVNode, oldNode: qVNode): qPatch[] {
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

export function diff(newNode: qVNode, oldNode: qVNode): qPatch | null {
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