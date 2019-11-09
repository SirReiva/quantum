import { qNode } from '../core/vdom/interfaces';
import { h } from '../core/vdom/h';
export function xmlToJson(xml: any) {

    var obj: any = { type: xml.tagName, children: [], attributes: null };

    if (xml.nodeType == 1) {
        if (xml.attributes.length > 0) {
            obj.attributes = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj.attributes[attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) {
        obj.children.push(xml.nodeValue);
    }

    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            if (item.nodeType == 3) {
                obj.children.push(item.nodeValue);
            } else if (item.nodeType == 1) {
                obj.children.push(xmlToJson(item));
            }
        }
    }
    if (xml.nodeType == 9) {
        obj = obj.children[0];
    }
    return obj;
}

export function stringToXml(value: string) {
    return new (window as any).DOMParser().parseFromString(value, "text/xml");
}

function jsonToHyperscript(jsObject: any) {
    return h(jsObject.type, jsObject.attributes, ...jsObject.children.map((o: any) => {
        if(typeof o === 'string')
            return o;
        return jsonToHyperscript.call(this, o);
    }));

}

export function compileTemplateString(temlpate: string, context: any): qNode {
    try {
        return jsonToHyperscript.call(context ,xmlToJson(stringToXml(temlpate)));
    } catch (exp) {
        console.error(exp);
        return null;
    }
}