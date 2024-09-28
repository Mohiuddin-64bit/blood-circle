/* eslint-disable @typescript-eslint/no-explicit-any */
import conf from "@/conf/config";
import { Client, Databases, Account } from "node-appwrite";

const createAdminClient = async () => {
  const client = new Client();
  client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
    .setKey(conf.appwriteApiKey);

  return {
    get account() {
      return new Account(client);
    },

    get databases() {
      return new Databases(client);
    },
  };
};

const createSessionClient = async (session:any) => {
  const client = new Client();
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

  if (session) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },

    get databases() {
      return new Databases(client);
    },
  };
};

export { createAdminClient, createSessionClient };
