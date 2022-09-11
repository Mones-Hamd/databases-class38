export const transferOperations = async (
  collection,
  senderAccountNo,
  receiverAccountNo,
  amount,
  describtion,
  session,
) => {
  const SenderAccountBalance = await collection.findOne({
    account_no: senderAccountNo,
  });
  if (amount < SenderAccountBalance.balance) {
    await collection.updateOne(
      { account_no: senderAccountNo },
      {
        $inc: { balance: amount * -1, 'account_changes[change_number]': 1 },
        'account_changes[amount]': -amount,
        'account_changes[change_date]': new Date(),
        'account_changes[remark]': describtion,
      },
      { session },
    );
    await collection.updateOne(
      { account_no: receiverAccountNo },
      {
        $inc: { balance: amount, 'account_changes[change_number]': 1 },
        'account_changes[amount]': +amount,
        'account_changes[change_date]': new Date(),
        'account_changes[remark]': describtion,
      },
      { session },
    );
  } else {
    console.error('You dont have enough money to transfer');
  }
};
