import { qNode } from '../core/vdom/interfaces';
import { h } from '../core/vdom/h';
export function xmlToJson(xml: any,  check = true) {

    if (check && xml.querySelectorAll('parsererror').length > 0)
        throw new Error('Multiple root elements no allowed');

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
        const val = xml.nodeValue.trim();
        if(val !== '')
            obj.children.push(val);
    }
    
    let lastString = false;
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            if (item.nodeType == 3) {
                const val = item.nodeValue.trim();
                if (val !== '') {
                    if (lastString) {
                        obj.children[obj.children.length - 1] += val;
                    } else {
                        obj.children.push(val);
                    }
                }
                lastString = true;
            } else if (item.nodeType == 1) {
                lastString = false;
                obj.children.push(xmlToJson(item, false));
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

    //q-if
    if (jsObject.attributes && jsObject.attributes['q-if']) {
        const f = new Function('return ' + jsObject.attributes['q-if']);
        const res = f.call(this);
        delete jsObject.attributes['q-if'];
        if([null, false, undefined].includes(res))
            return null;
    }

    if (jsObject.attributes && jsObject.attributes['q-for']) {
        
    }
        
    return h(jsObject.type, jsObject.attributes, ...(jsObject.children.map((o: any) => {
        if(typeof o === 'string')
            return ReplaceData(o.trim(), this);
        return jsonToHyperscript.call(this, o);
    })));

}

function ReplaceData(tpl: string, data: any): string {
    var re = /{{([^%>]+)?}}/g, match: RegExpExecArray;
    while(match = re.exec(tpl)) {
        const fn = new Function('return ' + match[0].substr(2, match[0].length - 4));
        tpl = tpl.replace(match[0], fn.call(data));
    }
    return tpl;
}

export function compileTemplateString(temlpate: string, context: any): qNode {
    try {
        return  jsonToHyperscript.call(context ,xmlToJson(stringToXml(temlpate.replace(/\n/g,''))));
    } catch (exp) {
        console.error(exp);
        return null;
    }
}