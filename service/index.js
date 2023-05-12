import { db } from '../db/connect.js';
import { ObjectId } from 'mongodb';

const insertNote = async (note) => {
    try {
        const result = await db.collection('notes').insertOne(note);
        return result;
    } catch (error) {
        console.error('Erro ao inserir a nota:', error);
        throw error;
    }
}

const getNotes = async () => {
    try {
        const notes = await db.collection('notes').find({}).toArray();
        return notes;
    } catch (error) {
        console.error('Erro ao buscar as notas:', error);
        throw error;
    }
}
const getNoteById = async (id) => {
    try {
        const _id = new ObjectId(id);
        const note = await db.collection('notes').findOne({ _id });
        return note;
    } catch (error) {
        console.error('Erro ao buscar a nota por ID:', error);
        throw error;
    }
}

const updateNoteById = async (id, note) => {
    try {
        const _id = new ObjectId(id);
        const result = await db.collection('notes').updateOne({ _id }, { $set: note });
        return result;
    } catch (error) {
        console.error('Erro ao atualizar a nota por ID:', error);
        throw error;
    }
}

const deleteNote = async (id) => {
    try {
        const _id = new ObjectId(id);
        const result = await db.collection('notes').deleteOne({ _id });
        return result;
    } catch (error) {
        console.error('Erro ao excluir a nota por ID:', error);
        throw error;
    }
}

const service = {
    insertNote,
    getNotes,
    getNoteById,
    updateNoteById,
    deleteNote,
}

export default service;