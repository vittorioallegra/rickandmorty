import { createAction } from 'typesafe-actions';
import { Character } from 'rickmortyapi/dist/interfaces';
import { ICharacterDetails, ICharacters } from '../../interfaces';

const LOAD_PAGE_REQUESTED = 'LOAD PAGE REQUESTED';
export const loadPageRequested = createAction(LOAD_PAGE_REQUESTED, (page: number) => ({ page }))();

const LOAD_PAGE_SUCCEEDED = 'LOAD PAGE SUCCEEDED';
export const loadPageSucceeded = createAction(LOAD_PAGE_SUCCEEDED, (characters: ICharacters) => ({ characters }))();

const LOAD_PAGE_FAILED = 'LOAD PAGE FAILED';
export const loadPageFailed = createAction(LOAD_PAGE_FAILED, (err: any) => err)();

const LOAD_DETAILS_REQUESTED = 'LOAD DETAILS REQUESTED';
export const loadDetailsRequested = createAction(LOAD_DETAILS_REQUESTED, (character: Character) => ({ character }))();

const LOAD_DETAILS_SUCCEEDED = 'LOAD DETAILS SUCCEEDED';
export const loadDetailsSucceeded = createAction(
    LOAD_DETAILS_SUCCEEDED,
    (character: Character, details: ICharacterDetails) => ({ character, details }),
)();

const LOAD_DETAILS_FAILED = 'LOAD DETAILS FAILED';
export const loadDetailsFailed = createAction(LOAD_DETAILS_FAILED, (err: any) => err)();
