import cors from 'cors';
import express from 'express';
import postsRouter from './routes/posts';
import usersRouter from './routes/users';

const app = express();
const port = Number(process.env.API_PORT ?? 3001);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    appName: 'ItsKDBB API',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`API listening on http://0.0.0.0:${port}`);
});
