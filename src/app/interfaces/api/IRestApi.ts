import { Character } from 'rickmortyapi/dist/interfaces';
import { ICharacterDetails, ICharacters } from '..';

export interface IRestApi {
    loadPage: (page: number) => Promise<ICharacters>;
    loadDetails: (character: Character) => Promise<ICharacterDetails>;
}
