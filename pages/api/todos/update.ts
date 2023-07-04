import clientPromise from "@/lib/mobgodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);
    if (req.method !== "PATCH") {
      return res
        .status(405)
        .json({ error: "Method not allowed, only PATCH is allowed." });
    }

    // Write the actual logic

    // 1.Update the database for IsComplete for the specific ID box that is clicked

    const data = req.body;
    const id = data.id as string;
    const is_complete = data.is_complete as boolean;
    const error_message = " ";
    if (is_complete !== false && is_complete !== true) {
      return res.status(400).json({ error: "DID NOT PASS ISCOMPLETE" });
    }
    if (id === undefined) {
      return res.status(400).json({ error: "DID NOT PASS ID" });
    }

    // 3. Add a new todo with this data into the database (MongoDB).

    const client = await clientPromise;
    const myDB = client.db("Cluster1");
    const myColl = myDB.collection("todo");
    const arrayLists = await myColl.find({}).toArray();
    let isValidId = false;
    for (const todo of arrayLists) {
      console.log(todo._id, id);
      if (todo._id.toString() === id) {
        isValidId = true;
      }
    }
    if (isValidId === false) {
      return res.status(404).json({ error: "Not valid ID in database" });
    }
    let newId = new ObjectId(id);
    const result = await myColl.updateOne(
      { _id: new ObjectId(id) },
      { $set: { is_complete: is_complete } }
    );
    console.log("Inserted", result);

    // 4. Return the it has been created successfully.
    return res.status(200).json({ status: "success", is: result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: JSON.stringify(e) });
  }
}
