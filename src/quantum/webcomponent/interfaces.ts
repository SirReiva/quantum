export interface QDecoratorOptions {
    selector: string;
    template?: string;
    templateUrl?: string;
    styles?: string;
    styleUrl?: string;
    useShadow?: boolean;
    automaticDetection?: boolean;
}

export const DEFAULT_DECORATOR_OPTIONS: QDecoratorOptions = {
    selector: '',
    useShadow: true,
    automaticDetection: true
};

export class TemplateScope {
    public selfScope: any = {};
    public parentScope: TemplateScope = null;
    public locals = {};
    constructor(sS: any = {}, lcls: any = {} ,parenScope: TemplateScope = null) {
        this.selfScope = sS;
        this.parentScope = parenScope;
        this.locals = lcls;
    }

    getLocals() {
        let actScope:TemplateScope = this;
        let res = Object.assign({}, actScope.locals);
        while(actScope.parentScope) {
            actScope = actScope.parentScope;
            Object.assign({}, actScope.locals);
        }
        return res;
    }
}