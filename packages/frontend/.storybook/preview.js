import * as NextImage from 'next/image';
import i18n from './i18next.js';
import '../src/styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    es: 'Spanish'
  }
};

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => (
    <OriginalNextImage {...props} unoptimized loader={({ src }) => src} />
  )
});
