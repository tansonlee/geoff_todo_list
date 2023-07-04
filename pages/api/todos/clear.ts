import clientPromise from "@/lib/mobgodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function hand(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query);
  return res.status(200).json({ message: "ok" });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("CALLING /api/todos/delete");
    if (req.method !== "DELETE") {
      return res
        .status(405)
        .json({ error: "Method not allowed, only DELETE is allowed." });
    }

    // Write the actual logic

    // Delete a todo from database

    const client = await clientPromise;
    const myDB = client.db("Cluster1");
    const myColl = myDB.collection("todo");
    const arrayLists = await myColl.find({}).toArray();

    const result = await myColl.deleteMany();
    console.log("Deleted", result);

    // 4. Return the it has been created successfully.
    return res.status(200).json({ status: "success", is: result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: JSON.stringify(e) });
  }
}
