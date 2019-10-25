export interface vNode {
    type: string;
    attrs: any;
    children: qNode[]
}

export type qNode = string | vNode;

export interface qPatchProps {
    type: string;
    name: string;
    value: any;
    prevVal?: any;
}

export interface qPatch {
    type: string;
    newNode?: qNode,
    props?: any;
    children?: any;
}