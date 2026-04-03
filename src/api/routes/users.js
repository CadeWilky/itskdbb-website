import { Router } from 'express';
import { users } from '../data';
const usersRouter = Router();
usersRouter.get('/', (_req, res) => {
    res.json(users);
});
usersRouter.get('/:id', (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find((entry) => entry.id === userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json(user);
});
usersRouter.post('/', (req, res) => {
    const { name, handle, bio } = req.body;
    if (!name || !handle || !bio) {
        res.status(400).json({ message: 'name, handle, and bio are required' });
        return;
    }
    const newUser = { id: users.length + 1, name, handle, bio };
    users.push(newUser);
    res.status(201).json(newUser);
});
export default usersRouter;
