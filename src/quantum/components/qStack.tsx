import QuantumElement from '../core/quantumElement';
import { h, defineQuantumElement, isRegisteredQuantumElement } from '../core/quantumCore';
import { TweenLite, TimelineLite } from 'gsap';


interface animationPromise {
    animation: TweenLite | TimelineLite;
    promise: Promise<any>;
    enter: boolean;
}

export abstract class AnimationTransition {
    public abstract enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement, transitionEl?: HTMLElement ): animationPromise
    public abstract out(removedPage: HTMLElement, currentPage: HTMLElement, ghostLayer: HTMLElement): animationPromise
}

export class IOSAnimationTransition extends AnimationTransition {
    
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        pageIn.style.transform = 'translateX(' + screen.availWidth + 'px)';
        //pageIn.style.opacity = '0.8';
        var tl = new TimelineLite({
            paused: true
        });
        tl.add("enterios", 0).to(lastPage, 0.5, {
            x: -0.6 * screen.availWidth,
        },"enterios").to(pageIn, 0.5, {
            x: 0,
        }, "enterios");
        return {
            promise: new Promise<any>((resolve, reject) => {
                tl.eventCallback('onComplete', () => {
                    if (tl.totalTime() === .5)
                        resolve();
                    else
                        reject();
                })
                tl.play();
            }),
            animation: tl,
            enter: true
        };
        
    }
    public out(removedPage: HTMLElement, currentPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        currentPage.style.display = 'block';
        var tl = new TimelineLite({
            paused: true
        });
        tl.add("outios", 0).to(currentPage, 0.5, {
            x: 0,
        }, "outios").to(removedPage, 0.5, {
            x: screen.availWidth,
        }, "outios");
        return {
            promise: new Promise<any>((resolve, reject) => {
                tl.eventCallback('onComplete', (params) => {
                    if (tl.totalTime() === .5)
                        resolve();
                    else
                        reject();
                })
                tl.play();
            }),
            animation: tl,
            enter: false
        };
    }
}

/*export class AndroidAnimationTransition extends AnimationTransition {

    private heroAnimation(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement, el: HTMLElement) {
        const coords = el.getBoundingClientRect();
        let cloneEL = (el.cloneNode(true) as HTMLElement);
        cloneEL.style.position = 'absolute';
        cloneEL.style.left = coords.left + 'px';
        cloneEL.style.top = coords.top + 'px';
        cloneEL.style.width = coords.width + 'px';
        cloneEL.style.height = coords.height + 'px';
        ghostLayer.innerHTML = '';
        ghostLayer.appendChild(cloneEL);
        ghostLayer.style.opacity = "1";
        const animOpts = JSON.parse(cloneEL.getAttribute('hero').replace(/\'/g, '"'));
        TweenLite.to(cloneEL, 0.3, animOpts);
    }
    
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        pageIn.style.transform = 'translate(0px, 40px)';
        pageIn.style.opacity = '0.01';
        const tl = TweenLite.to(pageIn, 0.3, {
            paused: true,
            y: 0,
            opacity: 1,
            onComplete: () => {
                lastPage.style.display = 'none';
                ghostLayer.innerHTML = '';
                //ghostLayer.style.opacity = '0';
                resolve()
            }
        });
        return new Promise(resolve => {
            
        });
        
    }

    public out(removedPage: HTMLElement, currentPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        currentPage.style.display = 'initial';
        return new Promise(resolve => {
            TweenLite.to(removedPage, 0.3, {
                opacity: 0.01,
                y: 40,
                onComplete: () => {
                    resolve()
                }
            });
        });
    }
}*/

/*export class AnimateCSSAnimationTransition extends AnimationTransition {
    private animationIn: string[] = 'animated zoomInUp qFaster'.split(' ');
    private animationOut: string[] = 'animated zoomOutDown qFaster'.split(' ');
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): Promise<any> {

        return new Promise((resolve) => {
            let callbacAnim = () => {
                pageIn.classList.remove(...this.animationIn);
                (pageIn.previousSibling as HTMLElement).style.display = 'none';
                resolve();
            };
            pageIn.addEventListener("animationend", callbacAnim, { once: true });
            pageIn.classList.add(...this.animationIn);
        });
        
    }
    public out(removedPage: HTMLElement, currentPage: HTMLElement, ghostLayer: HTMLElement) {
        return new Promise((resolve) => {
            let callbacAnim = () => {
                resolve();
            };
            (removedPage.previousSibling as HTMLElement).style.display = 'initial';
            removedPage.addEventListener("animationend", callbacAnim, { once: true });
            removedPage.classList.add(...this.animationOut);
            (removedPage as any).display = 'none';
        });
    }
}*/

export interface Route{
    name: string,
    component?: QuantumElement,
    resolve?: Function,
    preload?: boolean
}

interface arrStack {
    [key: string]: qStack;
}

/*STACK*/
export default class qStack extends QuantumElement {
    public static tagName = 'q-stack';
    automaticDetection = false;
    template() {
        return  <div className="baseStack">
                    <link rel="stylesheet" href="./static/animate.min.css"/>
                    <div ref="ghostLayer" className="ghostLayer"></div>
                    <div ref="stackview" className="stackview"></div>
                </div>;
    }

    public static instances: arrStack = {};
    private _animationTransition: AnimationTransition;

    styles() { return `
        :host {
            display: block;
            height: 100%;
            width: 100%;
        }
        .stackview {
            height: 100%;
            width: 100%;
            z-index: 1;
        }
        .baseStack {
            height: 100%;
            width: 100%;
        }
        .ghostLayer {
            height: 100%;
            width: 100%;
            position: absolute;
            background-color: transparent;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            will-change: opacity;
        }`; 
    }

    private clearStack() {
        this._stackElements = [];
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
        page.style.zIndex = this._stackElements.length + 1 + "" ;
        this._stackElements.push(page);
        this.refs.stackview.appendChild(page);
        this._currentEnterAnimation = this._animationTransition.enter(page, (page.previousSibling as HTMLElement), this.refs.ghostLayer);
        this._currentEnterAnimation.promise.then(() => (page.previousSibling as HTMLElement).style.display = 'none');
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
            if (this.canGoBack()) {
                if (this._currentEnterAnimation && this._currentEnterAnimation.enter) {
                    this._currentEnterAnimation.animation.kill();
                }
                let removed = this._stackElements.pop();
                this._currentOutAnimation = this._animationTransition.out(removed, (removed.previousSibling as HTMLElement), this.refs.ghostLayer);
                this._currentOutAnimation.promise.then(() => {
                    (removed.previousSibling as HTMLElement).style.display = 'block';
                    this.refs.stackview.removeChild(removed);
                    this._currentOutAnimation = null;
                }).catch(err => {
                    console.log(err);
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
        this.clearStack();
        page.style.zIndex = this._stackElements.length + 1 + "";
        this._stackElements.push(page);
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
        return (this.refs.stackview && this._stackElements.length > 1);
    }

    constructor() {
        super({});
    }
    
    private _currentEnterAnimation: animationPromise = null;
    private _currentOutAnimation:  animationPromise = null;

    componentUnmounted() {
        let keys = Object.keys(qStack.instances);
        const pos = Object.values(qStack.instances).indexOf(this);
        if(pos > -1) {
            delete qStack.instances[keys[pos]];
        }
    }

    private _stackElements: HTMLElement[];

    private _preloadRoutes() {
        let route: Route;
        for (route of this.objectAttrs.routes) {
            if(route.resolve && route.preload) {
                route.resolve().then((m: any) => {
                    if(!isRegisteredQuantumElement(m.default.tagName))
                        defineQuantumElement(m.default);
                });
            }
        }
    }

    componentLoaded() {
        this._animationTransition = new IOSAnimationTransition();
        if (this.attrs.stackid) qStack.instances[this.attrs.stackid] = this;
        this.setRootName(this.attrs.root);
        this._preloadRoutes();
    }
}