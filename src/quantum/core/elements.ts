let registeredQElements: string[] = [];
export function isRegisteredQuantumElement(name: string): boolean {
    return registeredQElements.indexOf(name) !== -1;
    //return document.createElement(name).constructor !== HTMLElement;
}

export function defineQuantumElement(calssEl: any, tag?: string) {
    try {
        if(tag) {
            if(!isRegisteredQuantumElement(tag)) {
                customElements.define(tag, calssEl);
                registeredQElements.push(tag);
            } else {
                console.error(tag + ' Already defined');
            }
        } else {
            if(!isRegisteredQuantumElement(calssEl.tagName)) {
                customElements.define(calssEl.tagName, calssEl);
                registeredQElements.push(calssEl.tagName);
            } else {
                console.error(calssEl.tagName + ' Already defined');
            }
        }
    } catch( exc ) { console.warn(exc); }
}