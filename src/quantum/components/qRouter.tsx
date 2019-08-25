import QuantumElement from '../core/quantumElement';
import { h, defineQuantumElement, isRegisteredQuantumElement } from '../core/quantumCore';
import { AnimationTransition, animationPromise, AndroidAnimationTransition } from './utils/animation-routes/animations';
import { Route } from './utils/routes/index';

interface arrRouter {
    [key: string]: qRouter;
}

/*STACK*/
export default class qRouter extends QuantumElement {
    public static tagName = 'q-router';
    automaticDetection = false;
    template() {
        return  false;
    }

    public static instances: arrRouter = {};
    private _animationTransition: AnimationTransition;

    styles() { return `
        :host {}`; 
    }

    private clearStack() {
        while (this._stackElements.length > 0) {
            const el = this._stackElements.pop();
            el.style.visibility = 'hidden';
            this.shadowRoot.removeChild(el);
        }
    }

    push(elem: QuantumElement, args: any =  {}):Promise<boolean> {
        return new Promise(resolve => {
            this._args = Object.assign({}, args);
            this._pushComponent(elem);
            resolve(true);
        });
    }

    private _pushComponent(comp: QuantumElement) {
        if(!isRegisteredQuantumElement(comp.tagName)) defineQuantumElement(comp);
        let page: QuantumElement = (document.createElement(comp.tagName) as QuantumElement);
        page.isReady.then(() => {
            page.style.zIndex = this._stackElements.length + 1 + "" ;
            this._stackElements.push(page);
            this.shadowRoot.appendChild(page);
            page.style.willChange = 'opacity, transform, contents';
            (page.previousSibling as HTMLElement).style.willChange = 'opacity, transform, contents';
            this._currentEnterAnimation = this._animationTransition.enter(page, (page.previousSibling as HTMLElement), this.refs.ghostLayer);
            this._currentEnterAnimation.promise.then(() => {
                (page.previousSibling as HTMLElement).style.display = 'none';
                page.style.willChange = '';
                (page.previousSibling as HTMLElement).style.willChange = '';
            });
            this.dispatchEvent(new CustomEvent('navigate', {'detail': ''}));
        });
        
    }

    pushName(name: string, args: any =  {}):Promise<boolean> {
        return new Promise(resolve => {
            let route: Route;
            for (route of this.objectAttrs.routes) {
                if (route.name  == name) {
                    if(route.component) {
                        this._args = Object.assign({}, args);;
                        this._pushComponent(route.component);
                        resolve(true);
                        return;
                    } else if(route.resolve) {
                        route.resolve().then((c: any) => {
                            this._args = Object.assign({}, args);;
                            this._pushComponent(c);
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
        });
    }

    pop():Promise<boolean> {
        return new Promise(resolve => {
            if (this.canGoBack()) {
                if (this._currentEnterAnimation && this._currentEnterAnimation.enter) {
                    this._currentEnterAnimation.cancel();
                }
                let removed = this._stackElements.pop();
                removed.style.willChange = 'opacity, transform, contents';
                (removed.previousSibling as HTMLElement).style.willChange = 'opacity, transform, contents';
                this._currentOutAnimation = this._animationTransition.out(removed, (removed.previousSibling as HTMLElement), this.refs.ghostLayer);
                this._currentOutAnimation.promise.then(() => {
                    removed.style.visibility = 'hidden';
                    removed.style.willChange = '';
                    (removed.previousSibling as HTMLElement).style.willChange = '';
                    (removed.previousSibling as HTMLElement).style.display = '';
                    this.shadowRoot.removeChild(removed);
                    this._currentOutAnimation = null;
                }).catch((err:any) => {
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
        let page: QuantumElement = (document.createElement(comp.tagName) as QuantumElement);
        this.clearStack();
        page.isReady.then(() => {
            page.style.zIndex = this._stackElements.length + 1 + "";
            page.style.willChange = 'opacity, transform, contents';
            this._stackElements.push(page);
            this.shadowRoot.appendChild(page);
            setTimeout(() => {//mientras no hay animacion de root
                page.style.willChange = '';
            }, 10);
        });
        
    }

    getStackPositionComponent(i: number): HTMLElement {
        if (this._stackElements[i]) {
            return this._stackElements[i];
        }
        return null;
    }

    setRootName(name: string):Promise<boolean> {
        return new Promise((resolve) => {
            let route: Route;
            for (route of this.objectAttrs.routes) {
                if (route.name  == name) {
                    if(route.component) {
                        this._setRootComponent(route.component);
                        resolve(true);
                        return;
                    } else if(route.resolve) {
                        route.resolve().then((c: any) => {
                            this._setRootComponent(c);
                            resolve(true);
                            return;
                        }).catch(() => resolve(false));  
                    } else {
                        resolve(false);
                    }
                    break;
                }
            }
        });
    }

    private _args = {};

    public getParams():any {
        return Object.assign({}, this._args);
    }

    public canGoBack() :Boolean {
        return this._stackElements.length > 1;
    }

    constructor() {
        super({});
    }
    
    private _currentEnterAnimation: animationPromise = null;
    private _currentOutAnimation:  animationPromise = null;

    componentUnmounted() {
        let keys = Object.keys(qRouter.instances);
        const pos = Object.values(qRouter.instances).indexOf(this);
        if(pos > -1) {
            delete qRouter.instances[keys[pos]];
        }
        this._stackElements = null;
    }

    private _stackElements: HTMLElement[] = [];

    private _preloadRoutes() {
        let route: Route;
        for (route of this.objectAttrs.routes) {
            if(route.resolve && route.preload) {
                route.resolve().then((c: any) => {
                    if(!isRegisteredQuantumElement(c.tagName))
                        defineQuantumElement(c);
                });
            }
        }
    }

    componentLoaded() {
        this._animationTransition = new AndroidAnimationTransition();
        if (this.attrs.stackid) qRouter.instances[this.attrs.stackid] = this;
        this.setRootName(this.attrs.root);
        this._preloadRoutes();
    }
}