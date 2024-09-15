import { Client, Databases, Messaging, Storage, Users } from "node-appwrite";


export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  DONNER_COLLECTION_ID,
  USER_COLLECTION_ID,
  NEXT_PUBLIC_BUCKED_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new Client();

client
  .setEndpoint(ENDPOINT!)
  .setProject(PROJECT_ID!)
  .setKey(API_KEY!);

export const databases = new Databases(client);
export const users = new Users(client);
export const messaging = new Messaging(client);
export const storage = new Storage(client);