import { Character, Episode, Location } from 'rickmortyapi/dist/interfaces';
import { IPagination } from './IPagination';

export interface ICharacterDetails {
    readonly origin?: Location;
    readonly location?: Location;
    readonly episodes?: Episode[];
}

export type ICharacters = IPagination<Character>;

export interface ICharactersDetails {
    [id: string]: ICharacterDetails;
}
