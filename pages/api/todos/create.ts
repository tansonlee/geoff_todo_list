import clientPromise from "@/lib/mobgodb";
import Alert from "@mui/material/Alert";
import { NextApiRequest, NextApiResponse } from "next";

function isValidDate(d: Date) {
  // @ts-ignore
  return d instanceof Date && !isNaN(d);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ error: "Method not allowed, only POST is allowed." });
    }

    // Write the actual logic

    // 1. Extract the todo data from the request.
    const data = req.body;
    const title = data.title;
    const due_date = new Date(data.due_date);
    const description = data.description;
    let isValid = true;
    let errorMessage = "Missing params:";
    // 2. Validate the todo data. (make sure all required things are there
    if (title === undefined || title?.trim()?.length === 0) {
      isValid = false;
      errorMessage += " bad title";
    }
    if (description === undefined || description?.trim()?.length === 0) {
      isValid = false;
      console.log("reached");
      errorMessage += " bad description";
    }
    if (due_date === undefined || !isValidDate(due_date)) {
      isValid = false;
      errorMessage += " bad due_date";
    }
    if (!isValid) {
      return res.status(400).json({ error: errorMessage });
    }
    //    Return an error if the data is invalid.

    // 3. Add a new todo with this data into the database (MongoDB).

    const client = await clientPromise;
    const myDB = client.db("Cluster1");
    const myColl = myDB.collection("todo");
    const doc = {
      created_at: new Date(),
      title,
      due_date,
      description,
      is_complete: false,
    };
    const result = await myColl.insertOne(doc);
    console.log("Inserted", result);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    // 4. Return the it has been created successfully.
    return res.status(200).json({ status: "success", result: result });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ error: JSON.stringify(e.message) });
  }
}
