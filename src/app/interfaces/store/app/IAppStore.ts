import { ICharacters, ICharactersDetails } from '../..';

export interface IAppStore {
    characters: ICharacters;
    details: ICharactersDetails;

    isLoading: boolean;
    hasError: boolean;
}
