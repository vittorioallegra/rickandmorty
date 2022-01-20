import { Badge } from '@mui/material';

interface IProps {
    status: 'Dead' | 'Alive' | 'unknown';
}

export const StatusBadge: React.FC<IProps> = (props) => (
    <Badge
        className={`status-badge status-badge--${props.status.toLowerCase()}`}
        overlap="circular"
        badgeContent=" "
        variant="dot"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
        {props.children}
    </Badge>
);
