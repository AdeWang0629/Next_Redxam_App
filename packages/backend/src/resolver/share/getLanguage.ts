import { Request } from 'express';

export const getLanguage = (req: Request): 'ar' | 'en' => {
  if (req.headers.origin && req.headers.origin.includes('redxam.ae')) {
    return 'ar';
  }
  if (
    req.headers.referer &&
    (req.headers.referer.endsWith('/ar') ||
      req.headers.referer.includes('/ar/'))
  ) {
    return 'ar';
  }
  if (
    req.headers.currenturl &&
    (req.headers.currenturl.includes('/ar/') ||
      (req.headers.currenturl as string).endsWith('/ar'))
  ) {
    return 'ar';
  }
  return 'en';
};
