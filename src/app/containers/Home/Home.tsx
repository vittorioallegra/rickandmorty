import React from 'react';
import { Grid } from '@mui/material';
import { CharacterCard, InfiniteList, Spinner } from '../../components';
import { useCharacter } from '../../contexts';

export const Home: React.FC = () => {
    const { characters, isLoading, getDetails, loadPage, loadDetails } = useCharacter();

    const handleLoadNext = () => {
        loadPage(characters.page + 1);
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
                            <CharacterCard character={item} details={getDetails(item)} fetchDetails={loadDetails} />
                        </Grid>
                    ))}
                    loadNext={handleLoadNext}
                />
            </div>
        </div>
    );
};
