import QuantumElement from '../core/quantumElement';
import { h, defineQuantumElement, isRegisteredQuantumElement } from '../core/quantumCore';
import { TweenLite, TimelineLite } from 'gsap';
//import lottie from 'lottie-web';

interface animationPromise {
    cancel: Function;
    promise: Promise<any>;
    enter: boolean;
}

export abstract class AnimationTransition {
    public abstract enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement, transitionEl?: HTMLElement ): animationPromise
    public abstract out(removedPage: HTMLElement, currentPage: HTMLElement, ghostLayer: HTMLElement): animationPromise
}

export class ChevronAnimationTransitionWebAPI extends AnimationTransition {
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        let anim = pageIn.animate([
            { clipPath: "polygon(-25% 0%, 0% 50%, -25% 100%, -100% 100%, -75% 50%, -100% 0%)" },
            { clipPath: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)" },
            { clipPath: "polygon(100% 0%, 100% 50%, 100% 100%, 0% 100%, 0% 50%, 0% 0%)" }
        ], {
            duration: 500,
        });
        return {
            promise: new Promise<any>((resolve, reject) => {
                anim.onfinish = () => {
                    resolve();
                };                
                anim.oncancel = () => {
                    reject();
                };
            }),
            cancel: () => {
                anim.cancel();
            },
            enter: true
        };
        
    }
    public out(removedPage: HTMLElement, currentPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        currentPage.style.display = '';
        let anim = removedPage.animate([
            { clipPath: "polygon(100% 0%, 100% 50%, 100% 100%, 0% 100%, 0% 50%, 0% 0%)" },
            { clipPath: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)" },
            { clipPath: "polygon(175% 0%, 200% 50%, 175% 100%, 100% 100%, 125% 50%, 100% 0%)" }
        ], {
            duration: 500,
        });
        return {
            promise: new Promise<any>((resolve, reject) => {
                anim.onfinish = () => {
                    resolve();
                };
                anim.oncancel = () => {
                    reject();
                };
            }),
            cancel: () => {
                anim.cancel();
            },
            enter: true
        };
    }
}

export class SlideDownAnimationTransitionWebAPI extends AnimationTransition {
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        let anim = pageIn.animate([
            { clipPath: "inset(0 0 100% 0)" }, 
            { clipPath: "inset(0)" }
        ], {
            duration: 200,
        });
        return {
            promise: new Promise<any>((resolve, reject) => {
                anim.onfinish = () => {
                    resolve();
                };                
                anim.oncancel = () => {
                    reject();
                };
            }),
            cancel: () => {
                anim.cancel();
            },
            enter: true
        };
        
    }
    public out(removedPage: HTMLElement, currentPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        currentPage.style.display = '';
        let anim = removedPage.animate([
            { clipPath: "inset(0)" },
            { clipPath: "inset(0 0 100% 0)" }
        ], {
            duration: 200,
        });
        return {
            promise: new Promise<any>((resolve, reject) => {
                anim.onfinish = () => {
                    resolve();
                };
                anim.oncancel = () => {
                    reject();
                };
            }),
            cancel: () => {
                anim.cancel();
            },
            enter: true
        };
    }
}

export class IOSAnimationTransitionWebAPI extends AnimationTransition {
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        //pageIn.style.transform = 'translateX(' + screen.availWidth + 'px)';
        let anim = pageIn.animate([
            { transform: 'translateX(' + screen.availWidth + 'px)' }, 
            { transform: 'translateX(0px)' }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.32,0.72,0,1)'
        });
        let anim2 = lastPage.animate([ 
            { transform: 'translateX(0px)' },
            { transform: 'translateX(' + -.55 * screen.availWidth + 'px)' }
        ], {
            duration: 450,
            easing: 'cubic-bezier(0.32,0.72,0,1)',
            delay: 50
        });
        return {
            promise: new Promise<any>((resolve, reject) => {
                anim.onfinish = () => {
                    resolve();
                };                
                anim.oncancel = () => {
                    reject();
                };
            }),
            cancel: () => {
                anim.cancel();
                anim2.cancel();
            },
            enter: true
        };
        
    }
    public out(removedPage: HTMLElement, currentPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        currentPage.style.display = '';
        let anim = removedPage.animate([ 
            { transform: 'translateX(0px)' },
            { transform: 'translateX(' + screen.availWidth + 'px)' }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.32,0.72,0,1)'
        });
        let anim2 = currentPage.animate([
            { transform: 'translateX(' + -.55 * screen.availWidth + 'px)' },
            { transform: 'translateX(0px)' }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.32,0.72,0,1)'
        });
        return {
            promise: new Promise<any>((resolve, reject) => {
                anim.onfinish = () => {
                    resolve();
                };
                anim.oncancel = () => {
                    reject();
                };
            }),
            cancel: () => {
                anim.cancel();
                anim2.cancel();
            },
            enter: true
        };
    }
}

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
            cancel: tl.kill.bind(tl),
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
            cancel: tl.kill.bind(tl),
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
            cancel: tl.kill.bind(tl),
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
            cancel: tl.kill.bind(tl),
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
            cancel: tl.kill.bind(tl),
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
            cancel: tl.kill.bind(tl),
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
                tl.eventCallback('onComplete', () => {
                    if (tl.totalTime() === .3)
                        resolve();
                    else
                        reject();
                })
                tl.play();
            }),
            cancel: tl.kill.bind(tl),
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
            cancel: tl.kill.bind(tl),
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
            contain: layout size style;
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
                    this._currentEnterAnimation.cancel();
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
        this._animationTransition = new IOSAnimationTransitionWebAPI();
        if (this.attrs.stackid) qStack.instances[this.attrs.stackid] = this;
        this.setRootName(this.attrs.root);
        this._preloadRoutes();
    }
}