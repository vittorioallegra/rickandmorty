import React from 'react';
import ReactDOM from 'react-dom';
import './app/styles/index.scss';
import App from './app/containers/App';
import { Localization } from './app/config';

const i18n = Localization.init('app');
ReactDOM.render(
    <React.StrictMode>
        <App i18n={i18n} />
    </React.StrictMode>,
    document.getElementById('root'),
);
