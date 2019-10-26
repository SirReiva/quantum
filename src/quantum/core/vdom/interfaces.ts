export interface qNode {
    type: string;
    attrs: any;
    children: ChildrenNode[]
}

export type ChildrenNode = string | qNode;

export interface qPatchProps {
    type: string;
    name: string;
    value: any;
    prevVal?: any;
}

export interface qPatch {
    type: string;
    newNode?: ChildrenNode,
    props?: any;
    children?: any;
}