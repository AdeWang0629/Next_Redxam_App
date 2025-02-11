import { checkRole } from './checkRole.resolver';
import { updateToken } from './updateToken.resolver';
import { user } from './user.resolver';
import { users } from './users.resolver';
import { verifyToken } from './verifyToken.resolver';
import { balanceRecords } from './balanceRecords.resolver';
import { changeAccountStatus } from './changeAccountStatus.resolver';
import { waitlistLevel } from './waitlist.resolver';
import { mxWidgetConnect } from './mxWidgetConnect.resolver';
import {
  emailValidation,
  emailValidateToken
} from './emailValidation.resolver';
import { addDiscord } from './addDiscord.resolver';
import { contactForm } from './contactForm.resolver';
import { invitationCode } from './invitationCode.resolver';
import { signup } from './signup.resolver';
import { userTransactions } from './userTransactions.resolver';

export const UserResolver = {
  checkRole,
  updateToken,
  user,
  users,
  verifyToken,
  balanceRecords,
  changeAccountStatus,
  waitlistLevel,
  mxWidgetConnect,
  emailValidation,
  emailValidateToken,
  addDiscord,
  contactForm,
  invitationCode,
  signup,
  userTransactions
};
