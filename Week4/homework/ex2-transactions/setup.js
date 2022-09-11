export const createAccount = async (client, accountNo, balance) => {
  const account = {
    account_no: accountNo,
    balance: balance,
    account_changes: [
      {
        change_number: 0,
        amount: 0,
        changed_date: '',
        remark: '',
      },
    ],
  };
  try {
    await client.db('bankDb').collection('userAccounts').insertOne(account);
    console.log(
      `account with number ${account.account_no} been added to database`,
    );
  } catch (err) {
    console.log(`Sorry! we can't add this account because of ${err}`);
  }
};
