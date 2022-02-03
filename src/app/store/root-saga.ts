import { all, getContext, call } from 'redux-saga/effects';
import { IRestApi } from '../interfaces';
import appSaga from './app/app-saga';

export default function* rootSaga() {
    const restApi: IRestApi = yield getContext('restApi');
    const effects = [call(appSaga, restApi)];
    yield all(effects);
}
