const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(
  req: { body: { item: any } },
  res: { json: (arg0: { id: any }) => void }
) {
  const { item } = req.body;

  const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://wgmg.vercel.app';

  const transformedItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        images: [item.image],
        name: item.name
      },
      unit_amount: item.price * 100
    },
    description: item.description,
    quantity: 1
  };

  // @ts-ignore
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: redirectURL + '?status=success',
    cancel_url: redirectURL + '?status=cancel',
    metadata: {
      images: item.image
    }
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
