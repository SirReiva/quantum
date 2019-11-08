import { DIFF_TYPE } from "./vDomActions";

export interface qNode {
    type: string;
    attrs: any;
    children: ChildrenNode[];
}

export type ChildrenNode = string | qNode;

export interface qPatchProps {
    type: string;
    name: string;
    value: any;
    prevVal?: any;
}

export interface qPatch {
    type: DIFF_TYPE;
    newNode?: ChildrenNode,
    props?: any;
    children?: any;
}

export interface qPatchType {
    type: DIFF_TYPE;
    parent: HTMLElement | Text;
    target: HTMLElement | Text;
    name: any;
    value: any;
}