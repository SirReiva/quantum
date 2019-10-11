import { copyObject, purgeProps, flatten, isObject, xmlToJson, stringToXml, isString } from './utils';
import { qVNode } from './interfaces';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

export function h(type: string, props: any, ...children: any[]): qVNode {
    if(!type)
        return undefined;
    const vElem = Object.create(null);
    // props = JSON.parse(JSON.stringify(props || {}));
    props = copyObject(props);
    purgeProps(props); //??
    Object.assign(vElem, {
        type,
        props,
        children: flatten(children.filter(ch => (ch !== null && ch !== undefined && ch !== false)))
    });
    return vElem;
}

function jsonToHyperscript(jsObject: any) {
    return h(jsObject.type, jsObject.attributes, ...jsObject.children.map((o: any) => {
        if(isString(o)) {
            //console.log(o);
        }
        if (isObject(o)) return jsonToHyperscript.call(this, o);
        return o;
    }));

}

export function compileTemplateString(temlpate: string, context: any): qVNode | false {
    try {
        return jsonToHyperscript.call(context ,xmlToJson(stringToXml(temlpate)));
    } catch (exp) {
        console.error(exp);
        return false;
    }
}