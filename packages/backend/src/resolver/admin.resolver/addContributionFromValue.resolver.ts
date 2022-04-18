import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import { Admin, User, Vault } from '@/database';
import { vaults } from '../vault.resolver/vaults.resolver';
import { vaultCheckIn } from '@/service/contracts';
import getAuthorizationToken from '../share/getAuthorizationToken';

const { TOKEN_SECURITY_KEY } = process.env;

interface adminToken {
  adminId: string;
}

interface Response {
  success: boolean;
  message: string;
}

export const addContributionFromValue = async (
  { arg }: { arg: { amount: number; email: string } },
  req: Request
): Promise<Response> => {
  console.debug('[Resolve] admin called');
  const auth = getAuthorizationToken(req.headers.authorization);
  if (!auth.success) return { message: auth.message, success: auth.success };

  try {
    const payload = verify(auth.token, TOKEN_SECURITY_KEY) as adminToken;

    const adminData = await Admin.findOne({ _id: payload.adminId });
    if (!adminData) return { success: false, message: 'invalid admin token' };

    const user = await User.findOne({ email: arg.email });

    if (!user) throw new Error('User does not exist');

    const { vaultBalance, totalContribution } = await getVaultBalance();
    const balance = arg.amount;
    console.log(vaultBalance);
    const vaultBalanceFinal = vaultBalance > 0 ? vaultBalance : balance;
    const totalContributionFinal =
      totalContribution > 0 ? totalContribution : 1;

    const contribution =
      (balance * totalContributionFinal) / (vaultBalanceFinal - balance);

    await user.updateOne({ $inc: { contribution } });
    await vaultCheckIn(Vault);
    return {
      success: true,
      message: 'deposit contribution updated succesfully'
    };
  } catch (err) {
    console.log(err);
    return { message: err.message, success: false };
  }
};

const getVaultBalance = async (): Promise<{
  vaultBalance: number;
  totalContribution: number;
}> => {
  const lastVault = await vaults();
  let vaultBalance = 0;
  const totalContribution = lastVault.totalContribution;
  for (const vault in lastVault.vaults) {
    vaultBalance += lastVault.vaults[vault].balance;
  }
  return { vaultBalance, totalContribution };
};
