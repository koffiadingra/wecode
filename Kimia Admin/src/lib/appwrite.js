import { Client, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("691f49570023f5cf2ac2"); 

export const databases = new Databases(client);
export const storage = new Storage(client);
