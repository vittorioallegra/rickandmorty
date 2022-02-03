import React from 'react';
import ReactDOM from 'react-dom';
import { CombinedState } from 'redux';
import './app/styles/index.scss';
import App from './app/containers/App';
import { Localization } from './app/config';
import { configureStore } from './app/store/configureStore';
import { IApplicationStore } from './app/interfaces';
import { RestApi } from './app/api';

const i18n = Localization.init('app');
const store = configureStore({} as CombinedState<IApplicationStore>, {
    restApi: new RestApi(),
});

ReactDOM.render(
    <React.StrictMode>
        <App i18n={i18n} store={store} />
    </React.StrictMode>,
    document.getElementById('root'),
);
