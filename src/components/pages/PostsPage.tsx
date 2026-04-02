import type { Post, User } from '../../lib/api';

type PostsPageProps = {
  users: User[];
  posts: Post[];
};

export default function PostsPage({ users, posts }: PostsPageProps) {
  return (
    <>
      <section className="data-card">
        <h2>Users</h2>
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-item">
              <div className="avatar-placeholder" />
              <div className="user-info">
                <strong>{user.name}</strong>
                <div className="muted" style={{ fontSize: '0.9rem' }}>@{user.handle}</div>
                <small className="muted">{user.bio}</small>
              </div>
            </div>
          ))}
          {users.length === 0 ? <p className="muted">No users loaded yet.</p> : null}
        </div>
      </section>

      <section className="data-card">
        <h2>Posts</h2>
        <div className="post-list">
          {posts.map((post) => {
            const author = users.find((u) => u.id === post.authorId);
            return (
              <div key={post.id} className="post-item">
                <strong>{post.title}</strong>
                <div className="muted" style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  by {author ? `${author.name} (@${author.handle})` : `author #${post.authorId}`}
                </div>
                <p style={{ margin: 0 }}>{post.body}</p>
              </div>
            );
          })}
          {posts.length === 0 ? <p className="muted">No posts loaded yet.</p> : null}
        </div>
      </section>
    </>
  );
}
