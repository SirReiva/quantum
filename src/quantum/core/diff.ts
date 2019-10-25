import { qPatch, qNode, qPatchProps, vNode } from "./interfaces";
import { createElementVNode, isEventProp, removeProp, setProp } from "./createElement";
import { REMOVE_EVENT, SET_EVENT, REPLACE_EVENT, REMOVE_PROP, SET_PROP, REMOVE, REPLACE, CREATE, UPDATE } from "./vDomActions";

function diffChildren(oldNode: vNode, newNode: vNode, refs: any): qPatch[] {
    const patches = [];
    const patchesLength = Math.max(
        (newNode && newNode.children)?newNode.children.length:0,
        (oldNode && oldNode.children)?oldNode.children.length:0
    );
    for (let i = 0; i < patchesLength; i++) {
        let df: any = diff(
            oldNode.children[i],
            newNode.children[i],
            refs
        )
        if (df) patches[i] = df;
    }
    return patches;
}

function diffProps(oldAttrs:any, newAttrs:any, refs:any):qPatchProps[] {
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

export function diff(oldNode: vNode, newNode: vNode, refs:any):qPatch {
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