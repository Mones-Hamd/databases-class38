import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { transfer } from './transfer.js';
import { createAccount } from './setup.js';

dotenv.config();

const client = new MongoClient(process.env.URI);
const main = async () => {
  await client.connect();
  try {
    //await createAccount(client, 101, 30000);
    //await createAccount(client, 102, 5000);
    await transfer(client, 101, 102, 1000, 'web service');
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
};
main();
