import { Router } from 'express';
import { posts } from '../data';

const postsRouter = Router();

postsRouter.get('/', (_req, res) => {
  res.json(posts);
});

postsRouter.get('/:id', (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.find((entry) => entry.id === postId);

  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  res.json(post);
});

postsRouter.post('/', (req, res) => {
  const { title, body, authorId } = req.body;

  if (!title || !body || typeof authorId !== 'number' || isNaN(authorId)) {
    res.status(400).json({ message: 'title, body, and authorId are required' });
    return;
  }

  const newPost = { id: posts.length + 1, title, body, authorId };
  posts.push(newPost);
  res.status(201).json(newPost);
});

export default postsRouter;
