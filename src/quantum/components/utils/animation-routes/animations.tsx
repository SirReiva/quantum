import { TweenLite, TimelineLite } from 'gsap';
//import lottie from 'lottie-web';

export interface animationPromise {
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

export class SlideAnimationTransitionWebAPI extends AnimationTransition {
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        let anim = pageIn.animate([
            { transform: 'translateX(' + screen.availWidth + 'px)' }, 
            { transform: 'translateX(0px)' }
        ], {
            duration: 450,
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
            duration: 450,
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
                    pageIn.style.transform = '';
                    pageIn.style.opacity = '';
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
                    currentPage.style.opacity = '';
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

export class SlideAnimationTransition extends AnimationTransition {
    
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        pageIn.style.transform = 'translateX(' + screen.availWidth + 'px)';
        var tl = new TimelineLite({
            paused: true
        });
        tl.add("enterios", 0).to(lastPage, 0.25, {
            scale: .95,
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
        currentPage.style.transform = 'scale(0.95)';
        var tl = new TimelineLite({
            paused: true
        });
        tl.add("outios", 0).to(currentPage, 0.5, {
            scale: 1,
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

export class TLAnimationTransition extends AnimationTransition {
   
    public enter(pageIn: HTMLElement, lastPage: HTMLElement, ghostLayer: HTMLElement): animationPromise {
        pageIn.style.transform = 'translate(40px, 0px)';
        pageIn.style.opacity = '0.01';
        const tl = TweenLite.to(pageIn, 0.3, {
            paused: true,
            x: 0,
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
            x: 40
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