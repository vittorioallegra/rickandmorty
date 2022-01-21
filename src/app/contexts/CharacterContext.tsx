import React from 'react';
import { Character } from 'rickmortyapi/dist/interfaces';
import { RestApi } from '../api';
import { ICharacterDetails, ICharacters } from '../interfaces';
import { createUseFunction } from '../utils';

interface ICharacterContext {
    characters: ICharacters;
    isLoading: boolean;
    getDetails: (character: Character) => ICharacterDetails | undefined;
    loadPage: (page: number) => void;
    loadDetails: (character: Character) => void;
}

const CharacterContext = React.createContext<null | ICharacterContext>(null);
CharacterContext.displayName = 'Character Context';

export const CharacterProvider: React.FC = ({ children }) => {
    const restApi = new RestApi();

    const [isLoading, setLoading] = React.useState(false);
    const [characters, setCharacters] = React.useState<ICharacters>({
        hasMore: false,
        page: 0,
        items: [],
    });
    const [details, setDetails] = React.useState<{ [id: number]: ICharacterDetails }>({});

    React.useEffect(() => {
        loadPages(3);
    }, []);

    const getDetails = (character: Character) => {
        return details[character.id];
    };

    const loadPages = (amount: number) => {
        const load = async () => {
            setLoading(true);
            const result = await restApi.loadPages(amount);
            setCharacters(result);
            setLoading(false);
        };
        load();
    };

    const loadPage = (page: number) => {
        const load = async () => {
            const result = await restApi.loadPage(page);
            setCharacters({
                ...result,
                items: [...characters.items, ...result.items],
            });
        };
        load();
    };

    const loadDetails = (character: Character) => {
        const load = async () => {
            const result = await restApi.loadDetails(character);
            setDetails({
                ...details,
                [character.id]: result,
            });
        };
        load();
    };

    return (
        <CharacterContext.Provider
            value={{
                characters,
                isLoading,
                getDetails,
                loadPage,
                loadDetails,
            }}
        >
            {children}
        </CharacterContext.Provider>
    );
};

export const useCharacter = createUseFunction<ICharacterContext>(CharacterContext);
