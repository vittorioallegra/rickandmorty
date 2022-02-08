import { ActionType, getType } from 'typesafe-actions';
import { IAppStore, ICharacters } from '../../interfaces';
import * as actions from './app-actions';

const initialCharacters: ICharacters = {
    hasMore: false,
    page: 0,
    items: [],
};

const initialState: IAppStore = {
    characters: initialCharacters,
    details: {},
    isLoading: false,
    hasError: false,
};

// eslint-disable-next-line
export default function appReducer(state: IAppStore = initialState, action: ActionType<typeof actions>) {
    switch (action.type) {
        case getType(actions.loadPageRequested):
        case getType(actions.loadDetailsRequested):
            return { ...state, isLoading: true, hasError: false };
        case getType(actions.loadPageSucceeded):
            return {
                ...state,
                isLoading: false,
                hasError: false,
                characters: {
                    ...action.payload.characters,
                    items: [...state.characters.items, ...action.payload.characters.items],
                },
            };
        case getType(actions.loadDetailsSucceeded):
            return {
                ...state,
                isLoading: false,
                hasError: false,
                details: {
                    ...state.details,
                    [action.payload.character.id]: action.payload.details,
                },
            };
        case getType(actions.loadPageFailed):
        case getType(actions.loadDetailsFailed):
            return { ...state, isLoading: false, hasError: true };
        default:
            return state;
    }
}
