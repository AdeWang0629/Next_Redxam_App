const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// const {Firestore} = require("@google-cloud/firestore");

exports.create_user = functions.auth.user().onCreate(async (user) => {
  try {
    await admin.firestore().collection("users").doc(user.uid).set(
        {
          current_balance: 0,
          af_card_applied: false,
          co2_captured: 0,
        },
        {merge: true},
    );
    console.log(`User ${user.uid} created successfully`);
  } catch (error) {
    console.error(`Error creating user ${user.uid}: ${error}`);
  }
});

exports.investment_purchase = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  const costInvestment = data.costInvestment;

  try {
    const IRef = admin.firestore().collection("investments").doc("Agriculture");
    const userDo2 = await IRef.get();
    const pph = userDo2.data().trees.balsa.pph;
    const ichart = userDo2.data().trees.balsa.chart;
    const lastItem = ichart.slice(-1)[0];
    const hec = Number(costInvestment) / Number(lastItem.cost);

    const userRef = admin.firestore().collection("users").doc(uid);
    const userDoc = await userRef.get();
    const currentBalance = userDoc.data().current_balance;
    const updatedBalance = Number(currentBalance) - Number(costInvestment);
    const orderData = {
      cost: parseInt(costInvestment),
      hectares: hec,
      date: admin.firestore.Timestamp.now(),
      state: "Unplanted",
    };
    const to = {
      name: "Bought Balsa",
      amount: `-${costInvestment}`,
      hectares: `Hectares: ${hec}`,
      timestamp: admin.firestore.Timestamp.now(),
      state: "Unplanted",
    };
    const ctree = Number(lastItem.cost) / Number(pph);
    const trees = Number(costInvestment) / Number(ctree);
    const orderDatat = {
      cost: parseInt(costInvestment),
      trees: trees,
      date: admin.firestore.Timestamp.now(),
      state: "Unplanted",
    };
    const tot = {
      name: "Bought Balsa",
      amount: `-${costInvestment}`,
      trees: `Trees: ${trees}`,
      timestamp: admin.firestore.Timestamp.now(),
      state: "Unplanted",
    };
    if (currentBalance > costInvestment) {
      if (hec < 1) {
        await userRef.update({current_balance: updatedBalance});
        await userRef.set(
            {
              transactionList: admin.firestore.FieldValue.arrayUnion(tot),
              investments: {
                balsa: {
                  orders: admin.firestore.FieldValue.arrayUnion(orderDatat),
                },
              },
            },
            {merge: true},
        );
        return {message: `Success: ${updatedBalance}`};
      } else if (hec >= 1) {
        await userRef.set(
            {
              transactionList: admin.firestore.FieldValue.arrayUnion(to),
              investments: {
                balsa: {
                  orders: admin.firestore.FieldValue.arrayUnion(orderData),
                },
              },
            },
            {merge: true},
        );

        await userRef.update({current_balance: updatedBalance});

        return {message: `Success: ${updatedBalance}`};
      }
    } else if (currentBalance < costInvestment) {
      const missingBalance = Number(costInvestment) - Number(currentBalance);
      return {message: `Missing: ${missingBalance}`};
    }
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError(
        `${error}`,
        "internal",
        "Error updating current balances",
    );
  }
});
