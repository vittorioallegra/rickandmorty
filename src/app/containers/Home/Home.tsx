import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@mui/material';
import { CharacterCard, InfiniteList, Spinner } from '../../components';
import { IApplicationStore, ICharacters, ICharactersDetails } from '../../interfaces';
import { appActions } from '../../store';

interface IActionProps {
    loadPage: typeof appActions.loadPageRequested;
    loadDetails: typeof appActions.loadDetailsRequested;
}

interface IStoreProps {
    characters: ICharacters;
    details: ICharactersDetails;
    isLoading: boolean;
    hasError: boolean;
}

type IProps = IActionProps & IStoreProps;

const Home: React.FC<IProps> = (props) => {
    const [shouldDisplaySpinner, setDisplaySpinner] = React.useState(true);

    React.useEffect(() => {
        setDisplaySpinner(true);
        props.loadPage(1);
    }, []);

    const handleLoadNext = () => {
        setDisplaySpinner(false);
        props.loadPage(props.characters.page + 1);
    };

    return (
        <div className="home" id="home">
            {props.isLoading && shouldDisplaySpinner && <Spinner />}
            <div className="home__header">
                <img alt="logo" src={`${process.env.PUBLIC_URL}/images/logo.png`} />
            </div>
            <div className="home__content">
                <InfiniteList
                    hasMore={props.characters.hasMore}
                    items={props.characters.items.map((item) => (
                        <Grid key={item.id} item={true} xs={12} md={6} lg={4} xl={3}>
                            <CharacterCard
                                character={item}
                                details={props.details[item.id]}
                                fetchDetails={props.loadDetails}
                            />
                        </Grid>
                    ))}
                    loadNext={handleLoadNext}
                />
            </div>
        </div>
    );
};

const actions: IActionProps = {
    loadPage: appActions.loadPageRequested,
    loadDetails: appActions.loadDetailsRequested,
};

const mapStateToProps = (state: IApplicationStore): IStoreProps => ({
    characters: state.app.characters,
    details: state.app.details,
    isLoading: state.app.isLoading,
    hasError: state.app.hasError,
});

export default connect(mapStateToProps, actions)(Home);
