import React from 'react';
import { CircularProgress } from '@mui/material';

interface IProps {
    position?: 'relative' | 'fixed';
}

export const Spinner: React.FC<IProps> = ({ position = 'fixed' }) => (
    <div className={`spinner ${position}`}>
        <CircularProgress disableShrink={true} />
    </div>
);
