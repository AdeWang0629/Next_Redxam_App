import { adminLogin } from './adminLogin.resolver';
import { admin } from './admin.resolver';
import { createAdmin } from './createAdminResolver';
import { overview } from './overview.resolver';
import { updateReferral } from './updateReferral.resolver';
import { updateUserStatus } from './updateUserStatus.resolver';
import { updateDepositStatus } from './updateDepositStatus.resolver';
import { updateWallets } from './updateWallets.resolver';
import { inviteUser } from './inviteUser.resolver';
import { getDeposits } from './getDeposits.resolver';

export const AdminResolver = {
  adminLogin,
  admin,
  createAdmin,
  overview,
  updateReferral,
  updateUserStatus,
  updateDepositStatus,
  updateWallets,
  inviteUser,
  getDeposits
};
