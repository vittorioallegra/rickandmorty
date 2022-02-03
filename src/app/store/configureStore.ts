import { applyMiddleware, CombinedState, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { IApplicationStore, IStoreContext } from '../interfaces';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';

export function configureStore(initialState: CombinedState<IApplicationStore>, context: IStoreContext) {
    const sagaMiddleware = createSagaMiddleware({ context });

    const configuredStore = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(rootSaga as Saga);

    return configuredStore;
}
