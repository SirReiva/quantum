import QuantumElement from '../core/quantumElement';
import { h, defineQuantumElement, isRegisteredQuantumElement } from '../core/quantumCore';
import { resolve } from 'path';

export interface Route{
    name: string,
    component?: QuantumElement,
    resolve?: Function 
}

/*STACK*/
export default class qStack extends QuantumElement {
    public static tagName = 'q-stack';
    template() {
        return  <div>
                    <link rel="stylesheet" href="./static/animate.min.css"/>
                    <div ref="stackview"></div>
                </div>;
    }

    public routes: any[] = [];//Crear interfaz...

    public static instances: any = [];

    styles() { return `
        :host {
            position: relative;
            display: flex;
            flex-flow: column;
            height: 100%;
            width: 100%;
        }
        div {
            height: 100%;
            width: 100%;
        }`; 
    }

    public setRoutes(rts: any) {
        this.routes = rts;
    }

    private clearStack() {
        while (this.refs.stackview.firstChild) {
            this.refs.stackview.removeChild(this.refs.stackview.firstChild);
        }
    }

    private animationIn: string[] = 'animated zoomInUp qFaster'.split(' ');//slideInRight
    private animationOut: string[] = 'animated zoomOutDown qFaster'.split(' ');//slideOutRight

    push(elem: QuantumElement):Promise<boolean> {
        return new Promise(resolve => {
            if (this.refs.stackview) {
                if(!isRegisteredQuantumElement(elem.tagName)) defineQuantumElement(elem);
                let page: HTMLElement = document.createElement(elem.tagName);
                let callbacAnim = () => {
                    page.classList.remove(...this.animationIn);
                    page.removeEventListener("animationend", callbacAnim);
                    (page.previousSibling as HTMLElement).style.display = 'none';
                };
                page.addEventListener("animationend", callbacAnim);
                page.classList.add(...this.animationIn)
                page.style.zIndex = this.refs.stackview.childElementCount + 1 ; 
                this.refs.stackview.appendChild(page);
                this.dispatchEvent(new CustomEvent('navigate', {'detail': ''}));
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    pushName(name: string):Promise<boolean> {
        return new Promise(resolve => {
            if (this.refs.stackview) {
                let route: Route;
                for (route of this.objectAttrs.routes) {
                    if (route.name  == name) {
                        if(route.component) {
                        } else if(route.resolve) {
                            route.resolve().then((m: any) => {
                                if(!isRegisteredQuantumElement(m.default.tagName)) defineQuantumElement(m.default);
                                let page: HTMLElement = document.createElement(m.default.tagName);
                                let callbacAnim = () => {
                                    page.classList.remove(...this.animationIn);
                                    page.removeEventListener("animationend", callbacAnim);
                                    (page.previousSibling as HTMLElement).style.display = 'none';
                                };
                                page.addEventListener("animationend", callbacAnim);
                                page.classList.add(...this.animationIn);
                                page.style.zIndex = this.refs.stackview.childElementCount + 1 ; 
                                this.refs.stackview.appendChild(page);
                                this.dispatchEvent(new CustomEvent('navigate', {'detail': ''}));
                                resolve(true);
                                return;
                            });  
                        }
                        resolve(false);
                        return;
                    }
                }
            }
            resolve(false);
        });
    }

    pop():Promise<boolean> {
        return new Promise(resolve => {
            if (this.refs.stackview && this.refs.stackview.childElementCount > 1) {
                let callbacAnim = () => {
                    this.refs.stackview.lastChild.removeEventListener("animationend", callbacAnim);
                    this.refs.stackview.removeChild(this.refs.stackview.lastChild);
                };
                (this.refs.stackview.lastChild.previousSibling as HTMLElement).style.display = '';
                this.refs.stackview.lastChild.addEventListener("animationend", callbacAnim);
                this.refs.stackview.lastChild.classList.add(...this.animationOut);
                this.refs.stackview.lastChild.display = 'none';
                this.dispatchEvent(new CustomEvent('navigate', {'detail': ''}));
                resolve(true);
            } else {
                console.warn('Stack Already empty');
                resolve(false);
            }
        });
    }

    setRootName(name: string):Promise<boolean> {
        return new Promise((resolve) => {
            if (this.refs.stackview) {
                this.clearStack();//cambiar position sino elimina tood ante del anim
                let route: any;
                for (route of this.objectAttrs.routes) {
                    if (route.name  == name) {
                        if(route.component) {

                        } else if(route.resolve) {
                            route.resolve().then((m: any) => {
                                if(!isRegisteredQuantumElement(m.default.tagName)) defineQuantumElement(m.default);
                                let page: HTMLElement = document.createElement(m.default.tagName);
                                let callbacAnim = () => {
                                    page.removeEventListener("animationend", callbacAnim);
                                };
                                page.style.zIndex = this.refs.stackview.childElementCount + 1 ; 
                                this.refs.stackview.appendChild(page);
                                resolve(true);
                                return;
                            });  
                        }
                        resolve(false);
                        return;
                    }
                }
            }
            resolve(false);
        });
    }

    constructor() {
        super({});
    }

    componentUnmounted() {
        if (this.attrs.stackid) delete qStack.instances[this.attrs.stackid];
    }

    componentLoaded() {
        if (this.attrs.stackid) qStack.instances[this.attrs.stackid] = this;
        this.setRootName(this.attrs.root);
    }
}