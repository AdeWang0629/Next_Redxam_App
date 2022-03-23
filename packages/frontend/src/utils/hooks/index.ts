import { useRouter } from 'next/router';
import useFeatureFlag from './useFeatureFlag';

function useLocale(): string {
  const { locale } = useRouter();
  return locale || 'en';
}

export { useLocale, useFeatureFlag };
