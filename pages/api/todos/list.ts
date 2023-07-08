import clientPromise from '@/lib/mobgodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log('STARTING REQUEST TO /api/todos/list');
	try {
		if (req.method !== 'GET') {
			return res.status(405).json({ error: 'Method not allowed, only GET is allowed.' });
		}

		// Write the actual logic
		// 1. Extract the data from the database.
		const client = await clientPromise;
		const myDB = client.db('Cluster1');
		const myColl = myDB.collection('todo');
		const todos = await myColl.find({}).toArray();
		// 2. Return the data.
		return res.status(200).json({ todos: todos });
		//List the TODO
	} catch (e) {
		return res.status(500).json({ error: e });
	}
}
