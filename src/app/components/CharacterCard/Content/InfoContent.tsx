import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardContent, List, ListItem, ListItemText } from '@mui/material';
import { Character } from 'rickmortyapi/dist/interfaces';

interface IProps {
    info: Character;
}

export const InfoContent: React.FC<IProps> = (props) => {
    const { t } = useTranslation();

    return (
        <CardContent>
            <List>
                <ListItem>
                    <ListItemText
                        primary={t('components.characterCard.fields.type')}
                        secondary={props.info.type !== '' ? props.info.type : t('components.characterCard.typeUnknown')}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary={t('components.characterCard.fields.gender')} secondary={props.info.gender} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={t('components.characterCard.fields.origin')}
                        secondary={props.info.origin.name}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={t('components.characterCard.fields.location')}
                        secondary={props.info.location.name}
                    />
                </ListItem>
            </List>
        </CardContent>
    );
};
