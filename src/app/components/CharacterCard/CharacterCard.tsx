import React from 'react';
import { useTranslation } from 'react-i18next';
import { Character } from 'rickmortyapi/dist/interfaces';
import { Avatar, Card, CardHeader, CardMedia, IconButton, Menu, MenuItem } from '@mui/material';
import { Close, MoreVert } from '@mui/icons-material';
import { ICharacterDetails } from '../../interfaces';
import { StatusBadge } from './StatusBadge';
import { DetailsContent, InfoContent } from './Content';

interface IProps {
    character: Character;
    details?: ICharacterDetails;
    fetchDetails: (character: Character) => void;
}

export const CharacterCard: React.FC<IProps> = (props) => {
    const { t } = useTranslation();
    const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
    const [showMore, setShowMore] = React.useState(false);

    const closeMenu = () => setMenuAnchor(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (showMore) {
            setShowMore(false);
        } else {
            setMenuAnchor(event.currentTarget);
        }
    };

    const handleOpenProfile = () => {
        closeMenu();
        window.open(props.character.url, '__blank');
    };

    const handleShowMore = () => {
        closeMenu();
        setShowMore(true);
        if (!props.details) {
            props.fetchDetails(props.character);
        }
    };

    return (
        <Card className={`character-card ${showMore ? 'details' : 'info'}`}>
            {!showMore && <CardMedia component="img" image={props.character.image} />}
            <CardHeader
                avatar={
                    <StatusBadge status={props.character.status}>
                        <Avatar alt={props.character.name} src={props.character.image} />
                    </StatusBadge>
                }
                action={<IconButton onClick={handleClick}>{showMore ? <Close /> : <MoreVert />}</IconButton>}
                title={props.character.name}
                subheader={`${props.character.status} - ${props.character.species}`}
            />
            <Menu
                anchorEl={menuAnchor}
                open={!!menuAnchor}
                onClose={closeMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleOpenProfile}>{t('components.characterCard.menu.profile')}</MenuItem>
                <MenuItem onClick={handleShowMore}>{t('components.characterCard.menu.showMore')}</MenuItem>
            </Menu>
            {showMore ? <DetailsContent details={props.details} /> : <InfoContent info={props.character} />}
        </Card>
    );
};
