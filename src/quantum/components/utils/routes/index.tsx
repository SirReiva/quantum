import QuantumElement from '../../../core/quantumElement';
export interface Route {
    name: string,
    component?: QuantumElement,
    resolve?: Function,
    preload?: boolean
}

export interface TabRoute {
    component?: QuantumElement,
    resolve?: Function,
    preload?: boolean
}

export interface TabBarItem {
    icon?: string;
    text?: string; 
}
