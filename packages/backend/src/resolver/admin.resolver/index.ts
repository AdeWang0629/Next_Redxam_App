import { adminLogin } from './adminLogin.resolver';
import { admin } from './admin.resolver';
import { createAdmin } from './createAdminResolver';
import { overview } from './overview.resolver';
import { updateReferral } from './updateReferral.resolver';
import { updateUserStatus } from './updateUserStatus.resolver';

export const AdminResolver = {
  adminLogin,
  admin,
  createAdmin,
  overview,
  updateReferral,
  updateUserStatus,
};
