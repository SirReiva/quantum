import { DIFF_TYPE } from './vDomActions';
import { setProp, removeProp, addEvent, extractEventName, removeEvent, createElementVNode, replaceEvent } from './createElement';
import { qPatch } from './interfaces';

const PATCHSFPS = 40;
let PATCHS_DOM: Function[] = [];

declare var window: any;
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        doPatchsHidden();
    }
});

function patchProps(parent: any, patches: any) {
    if (!patches) return;
    for (let i = 0; i < patches.length; i++) {
        const propPatch = patches[i];
        const { type, name, value, prevVal } = propPatch;
        if (type === DIFF_TYPE.SET_PROP) {
            PATCHS_DOM.push(() => {
                setProp(parent, name, value);
            });
        } else if (type === DIFF_TYPE.REMOVE_PROP) {
            PATCHS_DOM.push(() => {
                removeProp(parent, name/*, value*/);
            });
        } else if (type === DIFF_TYPE.REMOVE_EVENT) {
            PATCHS_DOM.push(() => {
                removeEvent(parent, value, extractEventName(name));
            });
        } else if (type === DIFF_TYPE.SET_EVENT) {
            PATCHS_DOM.push(() => {
                addEvent(parent, value, extractEventName(name));
            });
        } else if (type === DIFF_TYPE.REPLACE_EVENT) {
            PATCHS_DOM.push(() => {
                replaceEvent(parent, prevVal, value, extractEventName(name));
            });
        }
    }
}

export function queuPatch(el: HTMLElement, patch: qPatch, refs: any) {
    recursivePatch(el, el.parentElement, patch, refs);
}

let changesDo = 0;

function recursivePatch(el: HTMLElement, parent: HTMLElement, patch: qPatch, refs: any) {
    switch (patch.type) {
        case DIFF_TYPE.CREATE:
            {
                PATCHS_DOM.push(() => {
                    parent.appendChild(createElementVNode(patch.newNode, refs));
                });
                return;
            }
        case DIFF_TYPE.REMOVE:
            {
                PATCHS_DOM.push(() => {
                    if (el.hasAttribute && el.hasAttribute('ref')) {
                        delete refs[el.getAttribute('ref')];
                    }
                    el.remove();
                });
                return;
            }
        case DIFF_TYPE.REPLACE:
            {
                PATCHS_DOM.push(() => {
                    el.replaceWith(createElementVNode(patch.newNode, refs));
                });
                return;
            }
        case DIFF_TYPE.UPDATE:
            {
                const { props } = patch;
                patchProps(el, props);
                for(let i = patch.children.length - 1; i > -1; i --) {
                    if(patch.children[i])
                        recursivePatch(el.childNodes[i] as HTMLElement, el, patch.children[i], refs);
                }
                return;
            }
    }
}

function doPatchs() {
    changesDo = 0;
    while(changesDo < PATCHSFPS && PATCHS_DOM.length > 0) {
        changesDo++;
        let fn = PATCHS_DOM.shift();
        Promise.resolve().then(() => fn())
        //fn();
    }
    requestAnimationFrame(doPatchs);
}

function doPatchsHidden() {
    changesDo = 0;
    while(changesDo < PATCHSFPS && PATCHS_DOM.length > 0) {
        changesDo++;
        let fn = PATCHS_DOM.shift();
        fn();
    }
    if (document.visibilityState === 'hidden') {
        setTimeout(doPatchsHidden, 1000);
    }

}


requestAnimationFrame(doPatchs);