import { useEffect, useMemo, useState } from 'react';
import { fetchPosts, fetchStatus, fetchUsers, type ApiStatus, type Post, type User } from '../lib/api';
import HomePage from './pages/HomePage';
import LinksPage from './pages/LinksPage';
import PortfolioPage from './pages/PortfolioPage';
import PostsPage from './pages/PostsPage';

type TabKey = 'home' | 'links' | 'portfolio' | 'posts';

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'home', label: 'Home' },
  { key: 'links', label: 'Links' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'posts', label: 'Posts & Users' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [status, setStatus] = useState<ApiStatus | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function load() {
      try {
        const [apiStatus, apiUsers, apiPosts] = await Promise.all([
          fetchStatus(),
          fetchUsers(),
          fetchPosts()
        ]);
        setStatus(apiStatus);
        setUsers(apiUsers);
        setPosts(apiPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    void load();
  }, []);

  const activePage = useMemo(() => {
    switch (activeTab) {
      case 'links':
        return <LinksPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'posts':
        return <PostsPage users={users} posts={posts} />;
      case 'home':
      default:
        return <HomePage status={status} error={error} users={users} posts={posts} />;
    }
  }, [activeTab, error, posts, status, users]);

  return (
    <div className="app-shell">
      <section className="hero">
        <div className="hero-card">
          <div>
            <span className="badge">ItsKDBB · Model &amp; Creator</span>
            <h1>Model. Creator. Aesthetic obsessive.</h1>
            <p>
              Editorial, lifestyle, and brand content. Based in Atlanta — available worldwide for campaigns, collabs, and creative projects.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => setActiveTab('links')}>Subscribe on OnlyFans</button>
              <button className="secondary-button" onClick={() => setActiveTab('portfolio')}>View Portfolio</button>
            </div>
          </div>
          <div className="hero-panel">
            <h3>Quick links</h3>
            <ul>
              <li><a href="#links" onClick={(e) => { e.preventDefault(); setActiveTab('links'); }}>OnlyFans</a></li>
              <li><a href="#links" onClick={(e) => { e.preventDefault(); setActiveTab('links'); }}>Instagram</a></li>
              <li><a href="#links" onClick={(e) => { e.preventDefault(); setActiveTab('links'); }}>TikTok</a></li>
              <li><a href="#links" onClick={(e) => { e.preventDefault(); setActiveTab('links'); }}>Bookings</a></li>
            </ul>
          </div>
        </div>
      </section>

      <nav className="tabs" aria-label="Site sections">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={tab.key === activeTab ? 'active' : ''}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="content-grid">{activePage}</main>
    </div>
  );
}
