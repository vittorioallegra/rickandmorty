import { getCharacters } from 'rickmortyapi';
import { Character, Episode, Location } from 'rickmortyapi/dist/interfaces';
import { ICharacterDetails, ICharacters } from '../interfaces';

export class RestApi {
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

    async loadPages(amount: number): Promise<ICharacters> {
        const responses = await Promise.all(Array.from(Array(amount)).map((_, page) => this.loadPage(page + 1)));
        const result = responses.reduce(
            (acc, response) => ({
                ...response,
                items: [...(acc.items || []), ...response.items],
            }),
            {} as ICharacters,
        );

        return result;
    }

    async loadDetails(character: Character): Promise<ICharacterDetails> {
        const origin: Location = await this.loadResource(character.location.url);
        const location: Location = await this.loadResource(character.location.url);
        const episodes: Episode[] = await Promise.all(character.episode.map((url) => this.loadResource(url)));

        return {
            origin,
            location,
            episodes,
        };
    }

    private async loadResource(url: string): Promise<any> {
        return (await fetch(url)).json();
    }
}
