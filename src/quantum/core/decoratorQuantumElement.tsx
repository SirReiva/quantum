import { validateSelector } from './quantumCore';
import QuantumElement from './quantumElement';
export interface qElementConfig {
    selector:string;
    template: Function;
    style?: string;
    useShadow?: boolean;
}

export const dQuantumElement = (config: qElementConfig) => (cls) => {
    validateSelector(config.selector);
    
    //QuantumElement.prototype
};