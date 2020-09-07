import NextI18Next, { InitConfig } from 'next-i18next';

const config: InitConfig = {
  localePath:
    typeof window === 'undefined' ? 'public/static/locales' : 'static/locales',
  strictMode: false,
  defaultLanguage: 'en',
  otherLanguages: ['ru'],
};

const i18next = new NextI18Next(config);

export const i18n = i18next;
export const i18nInitPromise = i18next.initPromise;
export const appWithTranslation = i18next.appWithTranslation;
export const useTranslation = i18next.useTranslation;
export const withTranslation = i18next.withTranslation;
export const Link = i18next.Link;
