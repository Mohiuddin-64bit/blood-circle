import { createAdminClient } from "@/appwrite/config";
import { Query } from "node-appwrite";

export async function GET() {
  const { databases } = await createAdminClient();
  const { documents: donner, total } = await databases.listDocuments(
    process.env.DATABASE_ID!,
    process.env.DONNER_COLLECTION_ID!,
    [Query.orderDesc("$createdAt")]
  );
  return Response.json({ donner, total });
}
