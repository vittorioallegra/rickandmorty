import { default as i18next } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from '../messages';

const init = (namespace: string) => {
    const i18n = i18next.use(initReactI18next).createInstance({
        defaultNS: namespace,
        lng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react!!
        },
        ns: [namespace],
        resources: {
            en,
        },
    });

    // eslint-disable-next-line
    i18n.init();

    return i18n;
};

export const Localization = {
    init,
};
