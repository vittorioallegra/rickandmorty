import React from 'react';
import { Character } from 'rickmortyapi/dist/interfaces';
import { Grid } from '@mui/material';
import { RestApi } from '../../api';
import { CharacterCard, InfiniteList, Spinner } from '../../components';
import { ICharacters, ICharacterDetails } from '../../interfaces';

export const Home: React.FC = () => {
    const restApi = new RestApi();

    const [isLoading, setLoading] = React.useState(false);
    const [characters, setCharacters] = React.useState<ICharacters>({
        hasMore: false,
        page: 0,
        items: [],
    });
    const [characterDetails, setCharacterDetails] = React.useState<{ [id: number]: ICharacterDetails }>({});

    React.useEffect(() => {
        init();
    }, []);

    const init = () => {
        loadInitialPages(3);
    };

    const loadInitialPages = async (amount: number) => {
        setLoading(true);
        const result = await restApi.loadPages(amount);
        setCharacters(result);
        setLoading(false);
    };

    const loadPage = async (page: number) => {
        const result = await restApi.loadPage(page);
        setCharacters({
            ...result,
            items: [...characters.items, ...result.items],
        });
    };

    const handleLoadNext = () => {
        loadPage(characters.page + 1);
    };

    const loadDetails = async (character: Character) => {
        const details = await restApi.loadDetails(character);
        setCharacterDetails({
            ...characterDetails,
            [character.id]: details,
        });
    };

    const handleFetchDetails = (character: Character) => {
        loadDetails(character);
    };

    return (
        <div className="home" id="home">
            {isLoading && <Spinner />}
            <div className="home__header">
                <img alt="logo" src={`${process.env.PUBLIC_URL}/images/logo.png`} />
            </div>
            <div className="home__content">
                <InfiniteList
                    hasMore={characters.hasMore}
                    items={characters.items.map((item) => (
                        <Grid key={item.id} item={true} xs={12} md={6} lg={4} xl={3}>
                            <CharacterCard
                                character={item}
                                details={characterDetails[item.id]}
                                fetchDetails={handleFetchDetails}
                            />
                        </Grid>
                    ))}
                    loadNext={handleLoadNext}
                />
            </div>
        </div>
    );
};
