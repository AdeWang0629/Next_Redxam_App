import { CardResolver } from './card.resolver';
import { ContributionResolver } from './contribution.resolver';
import { ManualUserResolver } from './manualUser.resolver';
import { ReferralResolver } from './referral.resolver';
import { UserResolver } from './user.resolver';
import { vaultsResolver } from './vault.resolver';
import { AdminResolver } from './admin.resolver';
import { changeRequestResolver } from './changeRequest.resolver';
import { HomeResolver } from './home.resolver';
import { featureFlagResolver } from './featureFlag.resolver';
import { twilioResolver } from './twilio.resolver';
import { tellerResolver } from './teller.resolver';
import { leanResolver } from './lean.resolver';
import { withdrawalsResolver } from './withdrawals.resolver';

export const resolver = {
  ...CardResolver,
  ...ContributionResolver,
  ...ManualUserResolver,
  ...ReferralResolver,
  ...UserResolver,
  ...vaultsResolver,
  ...AdminResolver,
  ...changeRequestResolver,
  ...HomeResolver,
  ...featureFlagResolver,
  ...twilioResolver,
  ...tellerResolver,
  ...leanResolver,
  ...withdrawalsResolver
};
