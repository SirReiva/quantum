export interface qVNode {
    type: string;
    props: any;
    children: qVNode[] | undefined;
}
export interface qPatchProps {
    type: string;
    name: string;
    value: any;
    prevVal?: any;
}

export interface qPatch {
    type: string;
    newNode?: qVNode,
    props?: any;
    children?: any;
}