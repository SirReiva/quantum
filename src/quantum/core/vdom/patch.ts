import { SET_PROP, REMOVE_PROP, REMOVE_EVENT, SET_EVENT, REPLACE_EVENT, CREATE, REMOVE, REPLACE, UPDATE } from './vDomActions';
import { setProp, removeProp, addEvent, extractEventName, removeEvent, createElementVNode, replaceEvent } from './createElement';
import { qPatch } from './interfaces';

const PATCHSFPS = 40;
let PATCHS_DOM: Function[] = [];

declare var window: any;
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

function patchProps(parent: any, patches: any) {
    if (!patches) return;
    for (let i = 0; i < patches.length; i++) {
        const propPatch = patches[i];
        const { type, name, value, prevVal } = propPatch;
        if (type === SET_PROP) {
            PATCHS_DOM.push(() => {
                setProp(parent, name, value);
            });
        } else if (type === REMOVE_PROP) {
            PATCHS_DOM.push(() => {
                removeProp(parent, name/*, value*/);
            });
        } else if (type === REMOVE_EVENT) {
            PATCHS_DOM.push(() => {
                removeEvent(parent, value, extractEventName(name));
            });
        } else if (type === SET_EVENT) {
            PATCHS_DOM.push(() => {
                addEvent(parent, value, extractEventName(name));
            });
        } else if (type === REPLACE_EVENT) {
            PATCHS_DOM.push(() => {
                replaceEvent(parent, prevVal, value, extractEventName(name));
            });
        }
    }
}

export function addPatch(el:HTMLElement, patch: qPatch, refs: any) {
    recursivePatch(el, el.parentElement, patch, refs);
}
const MAX_CHANGES = 40;
let changesDo = 0;

function recursivePatch(el: HTMLElement, parent: HTMLElement, patch: qPatch, refs: any) {
    switch (patch.type) {
        case CREATE:
            {
                PATCHS_DOM.push(() => {
                    parent.appendChild(createElementVNode(patch.newNode, refs));
                });
                return;
            }
        case REMOVE:
            {
                PATCHS_DOM.push(() => {
                    if (el.hasAttribute && el.hasAttribute('ref')) {
                        delete refs[el.getAttribute('ref')];
                    }
                    el.remove();
                });
                return;
            }
        case REPLACE:
            {
                PATCHS_DOM.push(() => {
                    el.replaceWith(createElementVNode(patch.newNode, refs));
                });
                return;
            }
        case UPDATE:
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
        fn();
    }
    requestAnimationFrame(doPatchs);
}

requestAnimationFrame(doPatchs);