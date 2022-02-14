import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Character } from 'rickmortyapi/dist/interfaces';
import { Grid } from '@mui/material';
import { CharacterCard, InfiniteList, Spinner } from '../../components';
import { IApplicationStore } from '../../interfaces';
import { appActions } from '../../store';

export const Home: React.FC = () => {
    const [shouldDisplaySpinner, setDisplaySpinner] = React.useState(true);
    const characters = useSelector((state: IApplicationStore) => state.app.characters);
    const details = useSelector((state: IApplicationStore) => state.app.details);
    const isLoading = useSelector((state: IApplicationStore) => state.app.isLoading);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setDisplaySpinner(true);
        dispatch(appActions.loadPageRequested(1));
    }, []);

    const handleLoadNext = () => {
        setDisplaySpinner(false);
        dispatch(appActions.loadPageRequested(characters.page + 1));
    };

    const handleLoadDetails = (character: Character) => {
        setDisplaySpinner(false);
        dispatch(appActions.loadDetailsRequested(character));
    };

    return (
        <div className="home" id="home">
            {isLoading && shouldDisplaySpinner && <Spinner />}
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
                                details={details[item.id]}
                                fetchDetails={handleLoadDetails}
                            />
                        </Grid>
                    ))}
                    loadNext={handleLoadNext}
                />
            </div>
        </div>
    );
};
