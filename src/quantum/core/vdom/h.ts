import { qNode } from "./interfaces";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

function flatten(arr: any[]): any[] {
    return [].concat.apply([], arr);
}

export function h(type: string, attrs: any, ...children: qNode[]): qNode | null {
    if(!type || typeof type !== 'string') return null;
    return {
        type,
        attrs,
        children: flatten(children.filter(ch => (ch !== null && ch !== undefined)))
    }
}