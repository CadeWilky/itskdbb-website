import type { ApiStatus, Post, User } from '../../lib/api';

type HomePageProps = {
  status: ApiStatus | null;
  error: string;
  users: User[];
  posts: Post[];
};

export default function HomePage({ error, users, posts }: HomePageProps) {
  const previewPosts = posts.slice(0, 3);

  return (
    <>
      <section className="section-card">
        <h2>About ItsKDBB</h2>
        <div className="about-grid">
          <div className="profile-placeholder" />
          <div>
            <p>
              I'm a model and digital creator with a focus on editorial, lifestyle, and premium content. I've worked
              with brands across fashion, beauty, and wellness — and I create exclusive content for my subscribers
              every week.
            </p>
            <div className="about-actions">
              <a href="#links">Join OnlyFans</a>
              <a href="mailto:hello@itskdbb.com">Book Me</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-card">
        <h2>Latest from the feed</h2>
        {error ? (
          <p className="muted">Unable to load posts: {error}</p>
        ) : previewPosts.length === 0 ? (
          <p className="muted">Loading latest posts...</p>
        ) : (
          <div className="post-list">
            {previewPosts.map((post) => {
              const author = users.find((u) => u.id === post.authorId);
              return (
                <div key={post.id} className="post-preview">
                  <strong>{post.title}</strong>
                  <p className="muted">{post.body.slice(0, 100)}{post.body.length > 100 ? '…' : ''}</p>
                  <div className="post-preview-meta">
                    {author ? `by ${author.name} (@${author.handle})` : `by author #${post.authorId}`}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
