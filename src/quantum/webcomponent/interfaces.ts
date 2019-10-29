export interface QDecoratorOptions {
    selector: string;
    template?: string;
    templateUrl?: string;
    styles?: string;
    styleUrl?: string;
    useShadow?: boolean;
}

export const DEFAULT_DECORATOR_OPTIONS: QDecoratorOptions = {
    selector: '',
    useShadow: true
};