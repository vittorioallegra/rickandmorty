import { combineReducers } from 'redux';
import { IApplicationStore } from '../interfaces';
import appReducer from './app/app-reducer';

const rootReducer = combineReducers<IApplicationStore>({
    app: appReducer,
});

export default rootReducer;
