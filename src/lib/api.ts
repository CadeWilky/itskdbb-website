export type User = {
  id: number;
  name: string;
  handle: string;
  bio: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  authorId: number;
};

export type ApiStatus = {
  ok: boolean;
  appName: string;
  timestamp: string;
};

const apiBase = (): string => {
  if (typeof window === 'undefined') {
    return 'http://localhost:3001';
  }

  if (window.location.hostname === 'localhost') {
    return 'http://localhost:3001';
  }

  return '';
};

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBase()}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const fetchStatus = () => getJson<ApiStatus>('/api/health');
export const fetchUsers = () => getJson<User[]>('/api/users');
export const fetchPosts = () => getJson<Post[]>('/api/posts');
