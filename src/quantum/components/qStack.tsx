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

/*export class ClipPathAnimationTransition3 extends AnimationTransition {
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        pageIn.style.clipPath = "path('M0 -0.12C8.33 -8.46 16.67 -12.62 25 -12.62C37.5 -12.62 35.91 0.15 50 -0.12C64.09 -0.4 62.5 -34.5 75 -34.5C87.5 -34.5 87.17 -4.45 100 -0.12C112.83 4.2 112.71 -17.95 125 -18.28C137.29 -18.62 137.76 1.54 150.48 -0.12C163.19 -1.79 162.16 -25.12 174.54 -25.12C182.79 -25.12 191.28 -16.79 200 -0.12L200 -34.37L0 -34.37L0 -0.12Z')";
        (pageIn.style as any).webkitClipPath = "path('M0 -0.12C8.33 -8.46 16.67 -12.62 25 -12.62C37.5 -12.62 35.91 0.15 50 -0.12C64.09 -0.4 62.5 -34.5 75 -34.5C87.5 -34.5 87.17 -4.45 100 -0.12C112.83 4.2 112.71 -17.95 125 -18.28C137.29 -18.62 137.76 1.54 150.48 -0.12C163.19 -1.79 162.16 -25.12 174.54 -25.12C182.79 -25.12 191.28 -16.79 200 -0.12L200 -34.37L0 -34.37L0 -0.12Z')";
        var tl = new TimelineLite({
            paused: true
        });
        tl.add("enterios", 0).to(pageIn, 0.3, {
            webkitClipPath: "path('M0 199.88C8.33 270.71 16.67 306.13 25 306.13C37.5 306.13 35.91 231.4 50 231.13C64.09 230.85 62.5 284.25 75 284.25C87.5 284.25 87.17 208.05 100 212.38C112.83 216.7 112.71 300.8 125 300.47C137.29 300.13 137.76 239.04 150.48 237.38C163.19 235.71 162.16 293.63 174.54 293.63C182.79 293.63 191.28 262.38 200 199.88L200 0.13L0 0.13L0 199.88Z')",
            clipPath: "path('M0 199.88C8.33 270.71 16.67 306.13 25 306.13C37.5 306.13 35.91 231.4 50 231.13C64.09 230.85 62.5 284.25 75 284.25C87.5 284.25 87.17 208.05 100 212.38C112.83 216.7 112.71 300.8 125 300.47C137.29 300.13 137.76 239.04 150.48 237.38C163.19 235.71 162.16 293.63 174.54 293.63C182.79 293.63 191.28 262.38 200 199.88L200 0.13L0 0.13L0 199.88Z')"
        },"enterios");
        return {
            promise: new Promise<any>((resolve, reject) => {
                tl.eventCallback('onComplete', () => {
                    if (tl.totalTime() === tl.time())
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
        currentPage.style.display = '';
        var tl = new TimelineLite({
            paused: true
        });
        tl.add("outios", 0).to(removedPage, 0.3, {
            webkitClipPath: "",
            clipPath: ""
        }, "outios");
        return {
            promise: new Promise<any>((resolve, reject) => {
                tl.eventCallback('onComplete', (params) => {
                    if (tl.totalTime() === tl.time())
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
}*/

export class ClipPathAnimationTransition2 extends AnimationTransition {
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        pageIn.style.clipPath = "circle(1.0% at 50% 50%)";
        (pageIn.style as any).webkitClipPath = "circle(1.0% at 50% 50%)";
        var tl = new TimelineLite({
            paused: true
        });
        tl.add("enterios", 0).to(pageIn, 0.3, {
            webkitClipPath: 'circle(100% at 50% 50%)',
            clipPath: 'circle(100% at 50% 50%)'
        },"enterios");
        return {
            promise: new Promise<any>((resolve, reject) => {
                tl.eventCallback('onComplete', () => {
                    if (tl.totalTime() === tl.time())
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
        currentPage.style.display = '';
        var tl = new TimelineLite({
            paused: true
        });
        tl.add("outios", 0).to(removedPage, 0.3, {
            webkitClipPath: 'circle(1.0% at 50% 50%)',
            clipPath: 'circle(1.0% at 50% 50%)'
        }, "outios");
        return {
            promise: new Promise<any>((resolve, reject) => {
                tl.eventCallback('onComplete', (params) => {
                    if (tl.totalTime() === tl.time())
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

export class ClipPathAnimationTransition extends AnimationTransition {
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        pageIn.style.transform = 'scaleY(0)';
        var tl = new TimelineLite({
            paused: true
        });
        tl.add("enterios", 0).to(pageIn, 0.3, {
            scaleY: 1,
        },"enterios");
        return {
            promise: new Promise<any>((resolve, reject) => {
                tl.eventCallback('onComplete', () => {
                    if (tl.totalTime() === tl.time())
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
        currentPage.style.display = '';
        var tl = new TimelineLite({
            paused: true
        });
        tl.add("outios", 0).to(removedPage, 0.3, {
            scaleY: 0,
        }, "outios");
        return {
            promise: new Promise<any>((resolve, reject) => {
                tl.eventCallback('onComplete', (params) => {
                    if (tl.totalTime() === tl.time())
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

export class IOSAnimationTransition extends AnimationTransition {
    
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        pageIn.style.transform = 'translateX(' + screen.availWidth + 'px)';
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
        currentPage.style.display = '';
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

export class AndroidAnimationTransition extends AnimationTransition {

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
            opacity: 1
        });
        return {
            promise: new Promise<any>((resolve, reject) => {
                tl.eventCallback('onComplete', (params) => {
                    if (tl.totalTime() === .3)
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
        const tl = TweenLite.to(removedPage, 0.3, {
            opacity: 0.01,
            y: 40
        })
        return {
            promise: new Promise<any>((resolve, reject) => {
                tl.eventCallback('onComplete', (params) => {
                    if (tl.totalTime() === .3)
                        resolve();
                    else
                        reject();
                });
                tl.play();
            }),
            animation: tl,
            enter: false
        };
    }
}

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
                    (removed.previousSibling as HTMLElement).style.display = '';
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

    getStackPositionComponent(i: number): HTMLElement {
        if (this.refs.stackview && this._stackElements[i]) {
            return this._stackElements[i];
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
        this._animationTransition = new ClipPathAnimationTransition2();
        if (this.attrs.stackid) qStack.instances[this.attrs.stackid] = this;
        this.setRootName(this.attrs.root);
        this._preloadRoutes();
    }
}