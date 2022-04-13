const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  ns: ['common', 'agency-landing'],
  otherLanguages: ['fr'],
  fallbackLng: 'en',
  localePath: 'public/locales',
  localeSubpaths: {
    en: 'en',
    fr: 'fr',
  },
});
