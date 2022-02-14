import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { i18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { IApplicationStore } from '../interfaces';
import { Home } from './Home/Home';

interface IProps {
    i18n: i18n;
    store: Store<IApplicationStore>;
}

const App: React.FC<IProps> = (props) => (
    <I18nextProvider i18n={props.i18n}>
        <Provider store={props.store}>
            <Home />
        </Provider>
    </I18nextProvider>
);

export default App;
