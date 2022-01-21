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
        setLoading(true);
        restApi.loadPages(amount).then(
            (result) => {
                setCharacters(result);
                setLoading(false);
            },
            (error) => {
                console.error(error);
                setLoading(false);
            },
        );
    };

    const loadPage = (page: number) => {
        restApi.loadPage(page).then(
            (result) => {
                setCharacters({
                    ...result,
                    items: [...characters.items, ...result.items],
                });
            },
            (error) => {
                console.error(error);
            },
        );
    };

    const loadDetails = (character: Character) => {
        restApi.loadDetails(character).then(
            (result) => {
                setDetails({
                    ...details,
                    [character.id]: result,
                });
            },
            (error) => {
                console.error(error);
            },
        );
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
