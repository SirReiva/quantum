import { qPatch, qNode, qPatchProps, ChildrenNode } from './interfaces';
import { isEventProp } from "./createElement";
import { REMOVE_EVENT, SET_EVENT, REPLACE_EVENT, REMOVE_PROP, SET_PROP, REMOVE, REPLACE, CREATE, UPDATE } from "./vDomActions";

function changed(node1: any, node2: any): boolean {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type;
}

function diffChildren(oldNode: qNode, newNode: qNode): qPatch[] {
    const patches = [];
    const patchesLength = Math.max(
        (newNode && newNode.children)?newNode.children.length:0,
        (oldNode && oldNode.children)?oldNode.children.length:0
    );
    for (let i = 0; i < patchesLength; i++) {
        let df: any = diff(
            oldNode.children[i],
            newNode.children[i],
        )
        if (df) patches[i] = df;
    }
    return patches;
}

function diffProps(oldAttrs:any, newAttrs:any):qPatchProps[] {
    let patches: qPatchProps[] = [];
    const props = Object.assign({}, newAttrs, oldAttrs);
    Object.keys(props).forEach(name => {
        const newVal = newAttrs[name];
        const oldVal = oldAttrs[name];
        if (isEventProp(name)) {
            if (!newVal) {
                patches.push({ type: REMOVE_EVENT, name, value: oldVal });
            } else if (!oldVal && newVal) {
                patches.push({ type: SET_EVENT, name, value: newVal });
            } else {
                patches.push({ type: REPLACE_EVENT, name, value: newVal, prevVal: oldVal });
            }
        } else {
            if (newVal === null || newVal === false) {
                patches.push({ type: REMOVE_PROP, name, value: oldVal });
            } else if (oldVal === undefined || JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                patches.push({ type: SET_PROP, name, value: newVal });
            }
        }

    });
    if(patches.length === 0) patches = null;
    return patches;
  }

export function diff(oldNode: ChildrenNode, newNode: ChildrenNode):qPatch {
    if (typeof oldNode === 'string' || typeof newNode === 'string' || typeof oldNode === 'number' || typeof newNode === 'number') {
        if (oldNode !== newNode) {
            return { type: REPLACE, newNode };
        }
        return;
    }
    if(!oldNode && newNode) {
        return { type: CREATE, newNode };
    }
    if(oldNode && !newNode) {
        return { type: REMOVE };
    }
    if(oldNode.type !== newNode.type) {
        return { type: REPLACE, newNode };
    }
    if (newNode && !(newNode instanceof String)) {
        return {
            type: UPDATE,
            props: diffProps((newNode as qNode).attrs, (oldNode as qNode).attrs),
            children: diffChildren(newNode as qNode, oldNode as qNode),
        };
    }
    return null;
}