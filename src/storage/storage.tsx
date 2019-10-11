import { createStore } from 'redux';

const reducer = function(initState:any = { posts: [] }, action: any) {
    console.log('init');
    return initState;
}

export const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
