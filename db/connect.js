import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes';

const client = new MongoClient(url, {
    useUnifiedTopology: true,
})

const db = client.db('notes');

export { client, db };