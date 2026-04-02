const portfolioItems = [
  {
    category: 'Editorial',
    title: 'Luxury Lingerie Campaign',
    description: 'Two-day studio shoot for a premium lingerie label. Clean lines, moody lighting, architectural composition.'
  },
  {
    category: 'Lifestyle',
    title: 'Golden Hour Rooftop Series',
    description: 'Rooftop shoot at sunset. Natural light, minimal styling, high-contrast selects.'
  },
  {
    category: 'Brand Work',
    title: 'Beauty Brand Collab',
    description: 'Paid partnership content for a skincare brand. Clean, editorial look and feel.'
  },
  {
    category: 'Editorial',
    title: 'Spring Editorial 2025',
    description: 'Full spring campaign styled by Studio B. Bold color palette with architectural backdrops.'
  },
  {
    category: 'Lifestyle',
    title: 'Street Style Diary',
    description: 'Candid series shot across downtown — unposed, movement-focused, day-in-the-life aesthetic.'
  },
  {
    category: 'Brand Work',
    title: 'Fitness Activewear Shoot',
    description: 'Athletic wear campaign shot on location at a rooftop gym. Dynamic poses, natural light.'
  }
];

export default function PortfolioPage() {
  return (
    <section className="section-card">
      <h2>Portfolio</h2>
      <div className="portfolio-grid">
        {portfolioItems.map((item) => (
          <div key={item.title} className="portfolio-card">
            <div className="portfolio-img-placeholder" />
            <div className="portfolio-card-body">
              <span className="category-badge">{item.category}</span>
              <strong style={{ display: 'block', marginBottom: '0.35rem' }}>{item.title}</strong>
              <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
