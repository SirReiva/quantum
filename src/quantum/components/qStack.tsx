import QuantumElement from '../core/quantumElement';
import { h, defineQuantumElement, isRegisteredQuantumElement } from '../core/quantumCore';
import anime from '../../../node_modules/animejs/lib/anime.es';

export abstract class AnimationTransition {
    public abstract enter(pageIn: HTMLElement, lastPage: HTMLElement): Promise<any>
    public abstract out(removedPage: HTMLElement, currentPage: HTMLElement): Promise<any>
}

export class IOSAnimationTransition extends AnimationTransition{
    public enter(pageIn: HTMLElement, lastPage: HTMLElement): Promise<any> {
        pageIn.style.transform = 'translateX(99.5%)';
        pageIn.style.opacity = '0.8';
        return Promise.all([
            ((anime({
                targets: pageIn,
                translateX: '0%',
                opacity: 1,
                easing: 'cubicBezier(0.36,0.66,0.04,1)',
                duration: 500,
            }) as any).finished as Promise<any>),
            ((anime({
                targets: lastPage,
                translateX: '-100%',
                easing: 'cubicBezier(0.36,0.66,0.04,1)',
                duration: 500,
            }) as any).finished as Promise<any>)
        ]).then(() => {
            lastPage.style.display = 'none';
        });
    }
    public out(removedPage: HTMLElement, currentPage: HTMLElement) {
        currentPage.style.display = 'initial';
        return Promise.all([
            ((anime({
                targets: removedPage,
                translateX: "99.5%",
                opacity: 0.8,
                easing: 'cubicBezier(0.36,0.66,0.04,1)',
                duration: 500,
            }) as any).finished as Promise<any>),
            ((anime({
                targets: currentPage,
                translateX: "0%",
                easing: 'cubicBezier(0.36,0.66,0.04,1)',
                duration: 500,
            }) as any).finished as Promise<any>)
        ]).then(() => {
            /*currentPage.style.opacity = '0.99';
            setTimeout(() => {
                currentPage.style.opacity = '1';
            }, 1);*/
        });
    }
}

export class AndroidAnimationTransition extends AnimationTransition{
    private animationIn: string[] = 'animated zoomInUp qFaster'.split(' ');
    private animationOut: string[] = 'animated zoomOutDown qFaster'.split(' ');
    public enter(pageIn: HTMLElement, lastPage: HTMLElement): Promise<any> {
        pageIn.style.transform = 'translate(0px, 40px)';
        pageIn.style.opacity = '0.01';
        return ((anime({
            targets: pageIn,
            translateY: -40,
            opacity: 1,
            easing: 'cubicBezier(0.47,0,0.745,0.715)',
            duration: 225,
        }) as any).finished as Promise<any>).then(() => {
            lastPage.style.display = 'none';
        });
        
    }
    public out(removedPage: HTMLElement, currentPage: HTMLElement) {
        currentPage.style.display = 'initial';
        return ((anime({
            targets: removedPage,
            translateY: 40,
            opacity: 0.01,
            easing: 'cubicBezier(0.47,0,0.745,0.715)',
            duration: 225,
        }) as any).finished as Promise<any>);
    }
}

export class AnimateCSSAnimationTransition extends AnimationTransition{
    private animationIn: string[] = 'animated zoomInUp qFaster'.split(' ');
    private animationOut: string[] = 'animated zoomOutDown qFaster'.split(' ');
    public enter(pageIn: HTMLElement, lastPage: HTMLElement): Promise<any> {

        return new Promise((resolve) => {
            let callbacAnim = () => {
                pageIn.classList.remove(...this.animationIn);
                pageIn.removeEventListener("animationend", callbacAnim);
                (pageIn.previousSibling as HTMLElement).style.display = 'none';
                resolve();
            };
            pageIn.addEventListener("animationend", callbacAnim);
            pageIn.classList.add(...this.animationIn);
        });
        
    }
    public out(removedPage: HTMLElement, currentPage: HTMLElement) {
        return new Promise((resolve) => {
            let callbacAnim = () => {
                removedPage.removeEventListener("animationend", callbacAnim);
                resolve();
            };
            (removedPage.previousSibling as HTMLElement).style.display = 'initial';
            removedPage.addEventListener("animationend", callbacAnim);
            removedPage.classList.add(...this.animationOut);
            (removedPage as any).display = 'none';
        });
    }
}

export interface Route{
    name: string,
    component?: QuantumElement,
    resolve?: Function 
}

interface arrStrack {
    [key: string]: qStack;
}

/*STACK*/
export default class qStack extends QuantumElement {
    public static tagName = 'q-stack';
    automaticDetection = false;
    template() {
        return  <div>
                    <link rel="stylesheet" href="./static/animate.min.css"/>
                    <div ref="stackview"></div>
                </div>;
    }

    public static instances: arrStrack = {};
    private _animationTransition: AnimationTransition;

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

    private clearStack() {
        while (this.refs.stackview.firstChild) {
            this.refs.stackview.removeChild(this.refs.stackview.firstChild);
        }
    }

    push(elem: QuantumElement, args: any =  {}):Promise<boolean> {
        return new Promise(resolve => {
            if (this.refs.stackview) {
                this._args = Object.assign({}, args);
                this._pushComponent(elem);
                resolve(true);
            } else {
                this._args = {};
                resolve(false);
            }
        });
    }

    private _pushComponent(comp: QuantumElement) {
        if(!isRegisteredQuantumElement(comp.tagName)) defineQuantumElement(comp);
        let page: HTMLElement = document.createElement(comp.tagName);
        page.style.zIndex = this.refs.stackview.childElementCount + 1 ; 
        this.refs.stackview.appendChild(page);
        this._animationTransition.enter(page, (page.previousSibling as HTMLElement));
        this.dispatchEvent(new CustomEvent('navigate', {'detail': ''}));
    }

    pushName(name: string, args: any =  {}):Promise<boolean> {
        return new Promise(resolve => {
            if (this.refs.stackview) {
                let route: Route;
                for (route of this.objectAttrs.routes) {
                    if (route.name  == name) {
                        if(route.component) {
                            this._args = Object.assign({}, args);;
                            this._pushComponent(route.component);
                            resolve(true);
                            return;
                        } else if(route.resolve) {
                            route.resolve().then((m: any) => {
                                this._args = Object.assign({}, args);;
                                this._pushComponent(m.default);
                                resolve(true);
                                return;
                            }).catch(() => resolve(false));  
                        } else {
                            this._args = {};
                            resolve(false);
                        }
                        break;
                    }
                }
            }
            this._args = {};
            resolve(false);
        });
    }

    pop():Promise<boolean> {
        return new Promise(resolve => {
            if (this.refs.stackview && this.refs.stackview.childElementCount > 1) {

                let removed = this.refs.stackview.lastChild;
                this._animationTransition.out(removed, (removed.previousSibling as HTMLElement)).then(() => {
                    this.refs.stackview.removeChild(removed);
                });

                this.dispatchEvent(new CustomEvent('navigate', {'detail': ''}));
                resolve(true);
            } else {
                console.warn('Stack Already empty');
                resolve(false);
            }
        });
    }

    private _setRootComponent(comp: QuantumElement) {
        if(!isRegisteredQuantumElement(comp.tagName)) defineQuantumElement(comp);
        let page: HTMLElement = document.createElement(comp.tagName);
        page.style.zIndex = this.refs.stackview.childElementCount + 1 ;
        this.clearStack();
        this.refs.stackview.appendChild(page);
    }

    getStackPositionComponent(i: number): QuantumElement {
        if (this.refs.stackview && this.refs.stackviewchildNodes[i]) {
            return this.refs.stackviewchildNodes[i];
        }
        return null;
    }

    setRootName(name: string):Promise<boolean> {
        return new Promise((resolve) => {
            if (this.refs.stackview) {
                let route: Route;
                for (route of this.objectAttrs.routes) {
                    if (route.name  == name) {
                        if(route.component) {
                            this._setRootComponent(route.component);
                            resolve(true);
                            return;
                        } else if(route.resolve) {
                            route.resolve().then((m: any) => {
                                this._setRootComponent(m.default);
                                resolve(true);
                                return;
                            }).catch(() => resolve(false));  
                        } else {
                            resolve(false);
                        }
                        break;
                    }
                }
            }
            resolve(false);
        });
    }

    private _args = {};

    public getParams():any {
        return Object.assign({}, this._args);
    }

    public canGoBack() :Boolean {
        return (this.refs.stackview && this.refs.stackview.childElementCount > 1);
    }

    constructor() {
        super({});
    }

    componentUnmounted() {
        if (this.attrs.stackid) delete qStack.instances[this.attrs.stackid];
    }

    componentLoaded() {
        this._animationTransition = new AndroidAnimationTransition();
        if (this.attrs.stackid) qStack.instances[this.attrs.stackid] = this;
        this.setRootName(this.attrs.root);
    }
}