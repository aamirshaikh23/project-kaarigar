import { useMemo, useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Sunrise stoneware mug',
    category: 'Home & Living',
    ngo: 'Sahaara Collective',
    ngoId: 'sahaara',
    price: 680,
    oldPrice: 850,
    image:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85',
    color: 'sand',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Everyday handwoven tote',
    category: 'Accessories',
    ngo: 'Threads of Hope',
    ngoId: 'threads',
    price: 950,
    image:
      'https://images.unsplash.com/photo-1590736969955-71cc9496d63e?auto=format&fit=crop&w=900&q=85',
    color: 'sage',
    badge: 'Made by hand',
  },
  {
    id: 3,
    name: 'Wildflower soy candle',
    category: 'Home & Living',
    ngo: 'Udaan Foundation',
    ngoId: 'udaan',
    price: 540,
    image:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85',
    color: 'rose',
  },
  {
    id: 4,
    name: 'Indigo block-print scarf',
    category: 'Clothing',
    ngo: 'Threads of Hope',
    ngoId: 'threads',
    price: 1200,
    image:
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=85',
    color: 'blue',
    badge: 'Small batch',
  },
  {
    id: 5,
    name: 'Little moments journal',
    category: 'Stationery',
    ngo: 'Nayi Disha',
    ngoId: 'nayi-disha',
    price: 420,
    image:
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85',
    color: 'yellow',
  },
  {
    id: 6,
    name: 'Terracotta table planter',
    category: 'Home & Living',
    ngo: 'Sahaara Collective',
    ngoId: 'sahaara',
    price: 760,
    image:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85',
    color: 'terracotta',
    badge: 'Low stock',
  },
  {
    id: 7,
    name: 'Sunbeam beaded earrings',
    category: 'Accessories',
    ngo: 'Udaan Foundation',
    ngoId: 'udaan',
    price: 490,
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85',
    color: 'pink',
  },
  {
    id: 8,
    name: 'Slow Sunday table runner',
    category: 'Home & Living',
    ngo: 'Threads of Hope',
    ngoId: 'threads',
    price: 1450,
    image:
      'https://images.unsplash.com/photo-1600217792488-9e76f9f8c5c6?auto=format&fit=crop&w=900&q=85',
    color: 'cream',
    badge: 'New arrival',
  },
]

const ngos = [
  {
    id: 'sahaara',
    name: 'Sahaara Collective',
    location: 'Jaipur, Rajasthan',
    image:
      'https://images.unsplash.com/photo-1455390582262-044c42f1365e?auto=format&fit=crop&w=1000&q=85',
    initials: 'SC',
    tint: 'peach',
    story: 'Creating dignified livelihoods through traditional craft.',
  },
  {
    id: 'threads',
    name: 'Threads of Hope',
    location: 'Kutch, Gujarat',
    image:
      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=85',
    initials: 'TH',
    tint: 'green',
    story: 'Keeping generations of handloom artistry alive.',
  },
  {
    id: 'udaan',
    name: 'Udaan Foundation',
    location: 'Pune, Maharashtra',
    image:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=85',
    initials: 'UF',
    tint: 'lavender',
    story: 'Opening new possibilities through skill and community.',
  },
  {
    id: 'nayi-disha',
    name: 'Nayi Disha',
    location: 'Lucknow, Uttar Pradesh',
    image:
      'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?auto=format&fit=crop&w=1000&q=85',
    initials: 'ND',
    tint: 'yellow',
    story: 'Helping young makers turn ideas into independent futures.',
  },
]

const categories = ['All finds', 'Home & Living', 'Accessories', 'Clothing', 'Stationery']
const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`

function Icon({ name, size = 20, ...props }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    heart: <path d="M20.8 8.7c0 4.2-8.8 10-8.8 10S3.2 12.9 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />,
    close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All finds')
  const [activeNgo, setActiveNgo] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    const filtered = products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All finds' || product.category === activeCategory
      const matchesNgo = activeNgo === 'all' || product.ngoId === activeNgo
      const matchesSearch =
        !query ||
        `${product.name} ${product.ngo} ${product.category}`
          .toLowerCase()
          .includes(query)
      return matchesCategory && matchesNgo && matchesSearch
    })

    if (sortBy === 'price-low') return filtered.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') return filtered.sort((a, b) => b.price - a.price)
    if (sortBy === 'newest') return filtered.sort((a, b) => b.id - a.id)
    return filtered
  }, [activeCategory, activeNgo, search, sortBy])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  function showToast(message) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  function addToCart(product) {
    if (cart.length && cart[0].ngoId !== product.ngoId) {
      showToast(`Your bag is from ${cart[0].ngo}. Start a new bag to shop here.`)
      return
    }

    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
    showToast(`${product.name} added to your bag`)
  }

  function updateQuantity(productId, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function chooseNgo(ngoId) {
    setActiveNgo(ngoId)
    setActiveCategory('All finds')
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleCheckout() {
    setIsCartOpen(false)
    showToast('Checkout demo: connect the backend to place a real order.')
  }

  return (
    <div className="app-shell">
      <div className="announcement">
        <span>Thoughtful things, made with purpose</span>
        <span className="announcement-note">Every purchase supports a community</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Kaarigar home">
          <img
            className="brand-logo"
            src="/kaarigar-logo.png"
            alt="Kaarigar — Every Purchase Has a Story"
          />
        </a>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <Icon name={mobileMenuOpen ? 'close' : 'menu'} />
        </button>

        <nav className={`main-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#shop" onClick={() => setMobileMenuOpen(false)}>Shop</a>
          <a href="#makers" onClick={() => setMobileMenuOpen(false)}>Our makers</a>
          <a href="#story" onClick={() => setMobileMenuOpen(false)}>Our story</a>
        </nav>

        <div className="header-actions">
          <label className="search-box">
            <Icon name="search" size={18} />
            <input
              type="search"
              placeholder="Find something lovely"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
              }}
              aria-label="Search products"
            />
            <kbd>⌘ K</kbd>
          </label>
          <button
            type="button"
            className="bag-button"
            aria-label={`Open bag, ${cartCount} items`}
            onClick={() => setIsCartOpen(true)}
          >
            <Icon name="bag" size={20} />
            <span>Bag</span>
            <span className="bag-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> Crafted by hand, carried with care</div>
            <h1>Every purchase<br /><em>has a story.</em></h1>
            <p className="hero-description">
              Meet the hands and heritage behind what you bring home.
              Thoughtful pieces connect everyday moments to the makers,
              skills, and communities that give them meaning.
            </p>
            <div className="hero-actions">
              <a href="#shop" className="button button-dark">Shop the collection <Icon name="arrow" size={17} /></a>
              <a href="#makers" className="text-link">Meet our makers <span>↗</span></a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>R</span><span>M</span><span>A</span><span>+</span>
              </div>
              <p><strong>Made by a person, not a process.</strong><br />Every maker deserves to be seen.</p>
            </div>
          </div>
          <div className="hero-visual">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1500&q=90"
              alt="Tools and materials on an artisan's work table"
            />
            <div className="hero-image-shade" />
            <div className="hero-sticker">
              <span className="sticker-star">✳</span>
              <span>Made by hand.<br />Made to matter.</span>
            </div>
            <div className="hero-caption">
              <span>01 / THE HANDS BEHIND THE WORK</span>
              <span className="caption-dot" />
            </div>
            <div className="floating-note">
              <span className="note-icon">✳</span>
              <span><strong>A name behind every piece.</strong><br />A story beyond the shelf.</span>
            </div>
          </div>
          <div className="hero-bottom">
            <span>HONOURING HANDS. CARRYING STORIES.</span>
            <a href="#shop" aria-label="Scroll to shop">↓</a>
            <span>JAIPUR · KUTCH · PUNE · EVERYWHERE</span>
          </div>
        </section>

        <section className="impact-strip" aria-label="Our impact">
          <div><strong>01</strong><span>one shared purpose</span></div>
          <span className="impact-divider" />
          <div><strong>∞</strong><span>stories in every stitch</span></div>
          <span className="impact-divider" />
          <div><strong>♥</strong><span>people at the heart</span></div>
          <p>Objects with purpose.<br /><em>People at the centre.</em></p>
        </section>

        <section className="shop-section section-wrap" id="shop">
          <div className="section-heading shop-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> MADE WITH PURPOSE</div>
              <h2>Keep a little <em>meaning</em> close.</h2>
            </div>
            <p>Handmade, thoughtfully sourced, and ready to become part of your everyday.</p>
          </div>

          <div className="shop-controls">
            <div className="category-tabs" role="tablist" aria-label="Product categories">
              {categories.map((category) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  className={activeCategory === category ? 'active' : ''}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <label className="sort-control">
              <span>Sort by</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>

          {activeNgo !== 'all' && (
            <div className="active-filter">
              <span>Showing finds from {ngos.find((ngo) => ngo.id === activeNgo)?.name}</span>
              <button type="button" onClick={() => setActiveNgo('all')}>Clear filter <Icon name="close" size={14} /></button>
            </div>
          )}

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className={`product-image ${product.color}`}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <button
                    type="button"
                    className="quick-add"
                    aria-label={`Add ${product.name} to bag`}
                    onClick={() => addToCart(product)}
                  ><Icon name="plus" size={19} /></button>
                </div>
                <div className="product-meta">
                  <span>{product.ngo}</span>
                  <span>{product.category}</span>
                </div>
                <h3>{product.name}</h3>
                <div className="product-price">
                  <strong>{formatPrice(product.price)}</strong>
                  {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
                  {product.oldPrice && <span className="sale-tag">20% off</span>}
                </div>
              </article>
            ))}
            {!visibleProducts.length && (
              <div className="empty-products">
                <span>✳</span>
                <h3>No finds just yet.</h3>
                <p>Try another search or choose a different category.</p>
                <button type="button" className="text-link" onClick={() => { setSearch(''); setActiveCategory('All finds'); setActiveNgo('all') }}>See all finds <span>↗</span></button>
              </div>
            )}
          </div>
          <p className="catalog-note">A small selection from our growing community of makers.</p>
        </section>

        <section className="maker-section" id="makers">
          <div className="section-wrap">
            <div className="section-heading maker-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-line" /> PEOPLE, NOT JUST PRODUCTS</div>
                <h2>Meet the <em>makers.</em></h2>
              </div>
              <p>Not just what they make. The knowledge they carry, the lives they shape, and the futures they are building.</p>
            </div>
            <div className="ngo-grid">
              {ngos.map((ngo) => (
                <article className={`ngo-card ngo-${ngo.tint}`} key={ngo.id}>
                  <button type="button" className="ngo-card-button" onClick={() => chooseNgo(ngo.id)} aria-label={`Explore ${ngo.name} products`}>
                    <div className="ngo-card-image"><img src={ngo.image} alt="" loading="lazy" /><span className="ngo-arrow"><Icon name="arrow" size={18} /></span></div>
                    <div className="ngo-card-content">
                      <div className="ngo-card-top"><span className="ngo-monogram">{ngo.initials}</span><span className="ngo-location"><Icon name="pin" size={13} /> {ngo.location}</span></div>
                      <h3>{ngo.name}</h3>
                      <p>{ngo.story}</p>
                      <span className="ngo-discover">Discover their work <span>↗</span></span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
            <button type="button" className="button button-outline" onClick={() => { setActiveNgo('all'); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Explore all community partners <Icon name="arrow" size={16} />
            </button>
          </div>
        </section>

        <section className="story-section section-wrap" id="story">
          <div className="story-image-wrap">
            <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85" alt="Handmade objects arranged in a bright, welcoming home" loading="lazy" />
            <div className="story-image-caption">A little more good, in every day.</div>
          </div>
          <div className="story-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> WHY KAARIGAR</div>
            <h2>A purchase is a small act of <em>belonging.</em></h2>
            <p>Kaarigar means artisan: a person whose hands hold knowledge passed from one generation to the next. We bring their work closer to the people who value the care, patience, and skill in every piece.</p>
            <p>Choose something useful. Learn whose hands made it. Let its story travel with you—and let the value of that work find its way back to its maker.</p>
            <a href="#makers" className="text-link">Spend time with their stories <span>↗</span></a>
            <div className="signature">Every purchase has a story.</div>
          </div>
        </section>

        <section className="newsletter">
          <div className="newsletter-flower">✳</div>
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> GOOD THINGS, OCCASIONALLY</div>
            <h2>A little inspiration<br /><em>for your inbox.</em></h2>
            <p>New makers, meaningful finds, and small ways to do good.</p>
          </div>
          <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); showToast('Thanks for joining our community!'); event.currentTarget.reset() }}>
            <label htmlFor="newsletter-email">Your email address</label>
            <div><input id="newsletter-email" type="email" placeholder="you@example.com" required /><button type="submit" aria-label="Subscribe"><Icon name="arrow" size={19} /></button></div>
            <span>By subscribing, you agree to receive the occasional thoughtful note.</span>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand footer-logo" href="#home" aria-label="Kaarigar home">
              <img
                className="brand-logo"
                src="/kaarigar-logo.png"
                alt="Kaarigar — Every Purchase Has a Story"
              />
            </a>
            <p>Honouring the hands behind the work.<br />Every purchase carries a story.</p>
          </div>
          <div className="footer-column"><span>EXPLORE</span><a href="#shop">Shop all</a><a href="#makers">Our makers</a><a href="#story">Our story</a></div>
          <div className="footer-column"><span>NEED A HAND?</span><a href="mailto:hello@kaarigar.example">Contact us</a><a href="mailto:hello@kaarigar.example">Shipping & returns</a><a href="mailto:hello@kaarigar.example">FAQs</a></div>
          <div className="footer-note"><span>✳</span><p>Made with care.<br /><em>And a little more meaning.</em></p></div>
        </div>
        <div className="footer-bottom"><span>© 2025 Kaarigar Marketplace</span><span>Made slowly. Means more.</span><div><a href="#home">Privacy</a><a href="#home">Terms</a></div></div>
      </footer>

      {isCartOpen && (
        <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsCartOpen(false) }}>
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="drawer-header"><div><span className="eyebrow">YOUR GOOD FINDS</span><h2 id="cart-title">Your bag <span>({cartCount})</span></h2></div><button type="button" className="icon-button" aria-label="Close bag" onClick={() => setIsCartOpen(false)}><Icon name="close" /></button></div>
            {cart.length ? (
              <>
                <p className="cart-vendor-note">Your order supports <strong>{cart[0].ngo}</strong>.</p>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <div className="cart-item-info"><span>{item.ngo}</span><h3>{item.name}</h3><strong>{formatPrice(item.price)}</strong><div className="quantity-control"><button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, -1)}><Icon name="minus" size={14} /></button><span>{item.quantity}</span><button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, 1)}><Icon name="plus" size={14} /></button></div></div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div><p>Shipping and any applicable taxes are calculated at checkout.</p><button type="button" className="button button-dark checkout-button" onClick={handleCheckout}>Continue to checkout <Icon name="arrow" size={17} /></button><button type="button" className="continue-shopping" onClick={() => setIsCartOpen(false)}>Keep exploring</button><div className="direct-payment-note">Direct payment to your NGO partner is supported at checkout.</div></div>
              </>
            ) : (
              <div className="empty-cart"><span>✳</span><h3>Your bag is taking a little break.</h3><p>Find something lovely, made with meaning.</p><button type="button" className="button button-dark" onClick={() => { setIsCartOpen(false); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }}>Explore the collection <Icon name="arrow" size={17} /></button></div>
            )}
          </aside>
        </div>
      )}

      {toast && <div className="toast" role="status"><span><Icon name="check" size={16} /></span>{toast}</div>}
    </div>
  )
}

export default App
