import { useRouter } from 'next/router';

function useLocale(): string {
  const { locale } = useRouter();
  return locale || 'en';
}

export { useLocale };
