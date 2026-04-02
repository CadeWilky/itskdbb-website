const links = [
  {
    label: 'OnlyFans',
    url: 'https://onlyfans.com/itskdbb',
    description: '🔥 Subscribe · Exclusive content, weekly drops, and direct access.',
    featured: true
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com/itskdbb',
    description: '📸 @itskdbb · Daily content, behind-the-scenes, and updates.',
    featured: false
  },
  {
    label: 'TikTok',
    url: 'https://tiktok.com/@itskdbb',
    description: '🎬 @itskdbb · Short clips, trending looks, and behind-the-lens.',
    featured: false
  },
  {
    label: 'Snapchat Premium',
    url: 'https://snapchat.com/add/itskdbb',
    description: '👻 Premium Snap · Exclusive snaps and subscriber-only stories.',
    featured: false
  },
  {
    label: 'X / Twitter',
    url: 'https://x.com/itskdbb',
    description: '✦ @itskdbb · Thoughts, updates, and uncurated moments.',
    featured: false
  },
  {
    label: 'Book a Collab',
    url: 'mailto:hello@itskdbb.com',
    description: '📩 Bookings · Brand campaigns, editorial shoots, and partnerships.',
    featured: false
  }
];

export default function LinksPage() {
  return (
    <section className="section-card">
      <h2>Find me everywhere</h2>
      <p className="muted">All links in one place.</p>
      <div className="link-list">
        {links.map((link) => (
          <div key={link.label} className={link.featured ? 'link-item link-featured' : 'link-item'}>
            <div><a href={link.url} target="_blank" rel="noreferrer">{link.label}</a></div>
            <small className="muted">{link.description}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
