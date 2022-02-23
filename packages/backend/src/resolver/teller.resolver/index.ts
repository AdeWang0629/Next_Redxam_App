import { tellerAccounts } from './accounts.resolver';
import { tellerPayee } from './createPayee.resolver';
import { tellerPayment, tellerPaymentVerified } from './createPayment.resolver';
import { getPayee } from './getPayee.resolver';

export const tellerResolver = {
  tellerAccounts,
  tellerPayee,
  tellerPayment,
  tellerPaymentVerified,
  getPayee
};
