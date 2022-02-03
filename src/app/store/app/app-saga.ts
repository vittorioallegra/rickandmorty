import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';
import { ICharacterDetails, ICharacters, IRestApi } from '../../interfaces';
import * as actions from './app-actions';

function* loadPage(api: IRestApi, action: ActionType<typeof actions.loadPageRequested>) {
    const { page } = action.payload;

    try {
        const characters: ICharacters = yield call([api, api.loadPage], page);

        yield put(actions.loadPageSucceeded(characters));
    } catch (e) {
        yield put(actions.loadPageFailed(e));
    }
}

function* loadDetails(api: IRestApi, action: ActionType<typeof actions.loadDetailsRequested>) {
    const { character } = action.payload;

    try {
        const details: ICharacterDetails = yield call([api, api.loadDetails], character);

        yield put(actions.loadDetailsSucceeded(character, details));
    } catch (e) {
        yield put(actions.loadDetailsFailed(e));
    }
}

export default function* authSaga(api: IRestApi) {
    yield takeLatest(getType(actions.loadPageRequested), loadPage, api);
    yield takeLatest(getType(actions.loadDetailsRequested), loadDetails, api);
}
