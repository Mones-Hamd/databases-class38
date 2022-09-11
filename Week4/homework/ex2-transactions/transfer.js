//import { transferOperations } from './transferOperations.js';
let i = 0;
export const transfer = async (
  client,
  senderAccount,
  receiverAccount,
  amount,
  describtion,
) => {
  const accountCollection = client.db('bankDb').collection('userAccounts');
  const session = client.startSession();
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
  };
  try {
    await session.withTransaction(async () => {
      const senderAccountDetails = await accountCollection.findOne({
        account_no: senderAccount,
      });

      const receiverAccountDetails = await accountCollection.findOne({
        account_no: receiverAccount,
      });
      if (amount < senderAccountDetails.balance) {
        let senderChangeNumber = senderAccountDetails['account_changes'].length;
        let receveiverChangeNumber =
          receiverAccountDetails['account_changes'].length;
        await accountCollection.updateOne(
          { account_no: senderAccount },
          {
            $inc: {
              balance: amount * -1,
            },
            $push: {
              account_changes: {
                change_number: senderChangeNumber++,
                amount: -amount,
                changed_date: `${new Date()}`,
                remark: describtion,
              },
            },
          },
          { session },
        );
        await accountCollection.updateOne(
          { account_no: receiverAccount },
          {
            $inc: { balance: amount },
            $push: {
              account_changes: {
                change_number: receveiverChangeNumber++,
                amount: amount,
                changed_date: `${new Date()}`,
                remark: describtion,
              },
            },
          },
          { session },
        );
      } else {
        await session.abortTransaction();
        console.error('You dont have enough money to transfer');
      }
    }, transactionOptions);
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
};
