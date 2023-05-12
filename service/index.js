import { db } from '../db/connect.js';
import { ObjectId } from 'mongodb';

const insertNode = async (note) => {
    const result = await db.collection('notes').insertOne(note);
    return result;
}

const getNotes = async () => {
    const data = db.collection('notes').find({});
    const notes = await data.toArray();
    return notes;
}
const getNoteById = async (id) => {
    const _id = new ObjectId(id);
    const note = await db.collection('notes').findOne({ _id });
    return note;
}

const updateNoteById = async (id, note) => {
    const _id = new ObjectId(id);
    const result = await db.collection('notes').updateOne({ _id }, { $set: note });
    return result;
}

const deleteNote = async (id) => {
    const _id = new ObjectId(id);
    const result = await db.collection('notes').deleteOne({ _id });
    return result;
}

const service = {
    insertNode,
    getNotes,
    getNoteById,
    updateNoteById,
    deleteNote,
}

export default service;