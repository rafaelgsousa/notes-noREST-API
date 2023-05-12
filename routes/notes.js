import { Router } from 'express';
import service from '../service/index.js';

const router = Router();

router.get('', async(_req, res) => {
    const notes = await service.getNotes();
    res.render('notes/home', { notes() { return notes } });
});

router.get('/create', (_req, res) => {
    res.render('notes/create');
});

router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const note = await service.getNoteById(id);
    res.render('notes/edit', { note });
});

router.post('', (req, res) => {

    const { title, description } = req.body;
    service.insertNode({ title, description });

    res.redirect(301,'/');
});

router.post('/delete', async(req, res) => {
    const { id } = req.body;
    await service.deleteNote(id);
    res.redirect(301,'/');
});

export default router;