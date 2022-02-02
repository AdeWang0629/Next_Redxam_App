import express, { Request, Response } from 'express';
import { User, UserProps } from '@/database';
import { dataHandler } from '@/resolver/home.resolver/homeResolver';

const router = express.Router();

router.post('/balance', async (req: Request, res: Response) => {
  try {
    const { discordId } = req.body;
    const user = await User.findOne({ discordId }, { _id: 1 });
    if (!user) return res.status(404).json({ success: false, message: 'user not found' });
    const { balance } = await dataHandler(user._id);
    res.status(200).json({ success: true, message: 'operation successfull', balance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
