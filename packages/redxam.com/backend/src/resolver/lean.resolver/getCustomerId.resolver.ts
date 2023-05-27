import { Request } from 'express';
import { User } from '@/database';
import axios from 'axios';

const { LEAN_DEV_BASE_URL, LEAN_BASE_URL, LEAN_APP_TOKEN, NODE_ENV } =
  process.env;
const baseUrl = NODE_ENV === 'production' ? LEAN_BASE_URL : LEAN_DEV_BASE_URL;

export const getLeanCustomerId = async (
  { userId }: { userId: string },
  req: Request
) => {
  try {
    const user = await User.findOne({ _id: userId });
    const customerId =
      user.leanCustomerId || (await createLeanCustomerId(userId));

    return {
      success: true,
      message: '',
      customerId
    };
  } catch (err) {
    return { message: err.message };
  }
};

const createLeanCustomerId = async (userId: string): Promise<string> => {
  const res = await axios.post(
    `${baseUrl}/customers/v1/`,
    {
      app_user_id: userId
    },
    {
      headers: {
        'lean-app-token': LEAN_APP_TOKEN
      }
    }
  );
  console.log(res);
  const leanCustomerId = res.data.customer_id;
  await User.updateOne(
    { _id: userId },
    {
      $set: {
        leanCustomerId
      }
    }
  );
  return leanCustomerId;
};
