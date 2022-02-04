// @ts-ignore
import loadStripe from './stripe';

//@ts-ignore
const stripe = loadStripe(
  'sk_test_51IVEgYEPejRluWxLQtuVRwiUkGJHmztuubzqjf6bPc0SJ8Q7JShj3KxHB4DQjaiuAfO9eCnn4ZK6rHkqRftgAWM400lv9hFz0x'
);

async function CreateStripeSession(
  req: { body: { item: any } },
  res: { json: (arg0: { id: any }) => void }
) {
  const { item } = req.body;
  console.log(item);

  const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://wgmgatx.vercel.app/';

  const transformedItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        images: [item.image],
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    description: item.description,
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: redirectURL + '?status=success',
    cancel_url: redirectURL + '?status=cancel',
    metadata: {
      images: item.image,
    },
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;

// export default async function handler(
//   req: { body: { amount: number } },
//   res: { redirect: (arg0: number, arg1: any) => void }
// ) {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'Payment',
//           },
//           unit_amount: req.body.amount * 100,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: 'https://america.foundation/success',
//     cancel_url: 'https://america.foundation/cancel',
//   });

//   res.redirect(303, session.url);
// }
