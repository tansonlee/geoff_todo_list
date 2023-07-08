import clientPromise from '@/lib/mobgodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log('STARTING REQUEST TO /api/todos/list');
	try {
		if (req.method !== 'GET') {
			return res.status(405).json({ error: 'Method not allowed, only GET is allowed.' });
		}
		console.log(1);

		// Write the actual logic
		// 1. Extract the data from the database.
		const client = await clientPromise;
		console.log(2);
		const myDB = client.db('Cluster1');
		console.log(3);
		const myColl = myDB.collection('todo');
		console.log(4);
		const todos = await myColl.find({}).toArray();
		console.log(5);
		// 2. Return the data.
		return res.status(200).json({ todos: todos });
		//List the TODO
	} catch (e) {
		console.log(6);
		return res.status(500).json({ error: e });
	}
}
