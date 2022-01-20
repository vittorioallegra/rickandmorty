import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardContent, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { ICharacterDetails } from '../../../interfaces';
import { Spinner } from '../../Spinner';
import { Episode, Location } from 'rickmortyapi/dist/interfaces';

interface IProps {
    details?: ICharacterDetails;
}

export const DetailsContent: React.FC<IProps> = (props) => {
    const { t } = useTranslation();

    if (!props.details) {
        return (
            <CardContent>
                <Spinner position="relative" />
            </CardContent>
        );
    }

    const getLocationListItems = (field: string, location: Location) => (
        <li>
            <ul>
                <ListSubheader children={t(`components.characterCard.list.titles.${field}`)} />
                <ListItem>
                    <ListItemText primary={t('components.characterCard.list.fields.name')} secondary={location.name} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={t('components.characterCard.list.fields.type')} secondary={location.type} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={t('components.characterCard.list.fields.dimension')}
                        secondary={location.dimension}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={t('components.characterCard.list.fields.residents')}
                        secondary={location.residents.length}
                    />
                </ListItem>
            </ul>
        </li>
    );

    const getEpisodesListItems = (episodes: Episode[]) => (
        <li>
            <ul>
                <ListSubheader children={t('components.characterCard.list.titles.episodes')} />
                {episodes.map((episode) => (
                    <ListItem key={episode.id}>
                        <ListItemText primary={episode.name} secondary={episode.episode} />
                    </ListItem>
                ))}
            </ul>
        </li>
    );

    return (
        <CardContent>
            <List subheader={<li />}>
                {getLocationListItems('origin', props.details.origin)}
                {getLocationListItems('location', props.details.location)}
                {getEpisodesListItems(props.details.episodes)}
            </List>
        </CardContent>
    );
};
