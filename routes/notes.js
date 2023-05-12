import { Router } from 'express';

import service from '../service/index.js';

const router = Router();

router.get('', async (_req, res) => {
    const notes = await service.getNotes();
    res.render('notes/home', { notes });
});

router.get('/create', (_req, res) => {
    res.render('notes/create');
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const note = await service.getNoteById(id);
    res.render('notes/detail', { note });
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const note = await service.getNoteById(id);
    res.render('notes/edit', { note });
});

router.post('', async (req, res) => {
    const { title, description } = req.body;
    await service.insertNote({ title, description });
    res.redirect(301, '/');
});

router.post('/update', async (req, res) => {
    const { id, title, description } = req.body;
    await service.updateNoteById(id, { title, description });
    res.redirect(301, '/');
});
  
router.post('/delete', async (req, res) => {
    const { id } = req.body;
    await service.deleteNote(id);
    res.redirect(301, '/');
});

export default router;