import { tellerAccounts } from './accounts.resolver';
import { tellerPayee } from './createPayee.resolver';
import { tellerPayment, tellerPaymentVerified } from './createPayment.resolver';

export const tellerResolver = {
  tellerAccounts,
  tellerPayee,
  tellerPayment,
  tellerPaymentVerified
};
