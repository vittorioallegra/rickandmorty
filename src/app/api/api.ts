import { getCharacters, getEpisode, getLocation } from 'rickmortyapi';
import { Character } from 'rickmortyapi/dist/interfaces';
import { ICharacterDetails, ICharacters, IRestApi } from '../interfaces';

export class RestApi implements IRestApi {
    async loadPage(page: number): Promise<ICharacters> {
        const response = await getCharacters({ page });
        const { info, results } = response.data;
        if (!info || !results) {
            return Promise.reject();
        }

        return {
            hasMore: info.pages !== page,
            page,
            items: results,
        };
    }

    async loadDetails(character: Character): Promise<ICharacterDetails> {
        const origin = await getLocation(this.getIdFromUrl(character.origin.url));
        const location = await getLocation(this.getIdFromUrl(character.location.url));
        const episodes = await getEpisode(character.episode.map((url) => this.getIdFromUrl(url)));

        return {
            origin: origin.status === 200 ? origin.data : undefined,
            location: location.status === 200 ? location.data : undefined,
            episodes: episodes.status === 200 ? episodes.data : undefined,
        };
    }

    private getIdFromUrl(url: string): number {
        const parts = url.split('/');
        return +parts[parts.length - 1];
    }
}
