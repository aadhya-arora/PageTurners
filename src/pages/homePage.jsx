import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styling/homePage.css";

const featuredBook = {
  title: "The Midnight Library",
  author: "Matt Haig",
  genre: "Literary Fiction",
  description:
    "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
  rating: 4.7,
  members: 142,
  chapter: "Chapters 1–8",
  coverColor: "#7a4f3a",
};

const upcomingBooks = [
  {
    id: 1,
    title: "Piranesi",
    author: "Susanna Clarke",
    month: "July",
    genre: "Mystery",
    accent: "#b07d62",
  },
  {
    id: 2,
    title: "Demon Copperhead",
    author: "Barbara Kingsolver",
    month: "August",
    genre: "Historical",
    accent: "#6b8c6e",
  },
  {
    id: 3,
    title: "Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    month: "September",
    genre: "Contemporary",
    accent: "#8c7b6b",
  },
];

const members = [
  { name: "Priya S.", books: 24, avatar: "P", color: "#c49a72" },
  { name: "Arjun M.", books: 18, avatar: "A", color: "#8faa8b" },
  { name: "Leila K.", books: 31, avatar: "L", color: "#b07d62" },
  { name: "Sam T.", books: 15, avatar: "S", color: "#9b8ea0" },
];

const quotes = [
  { text: "A reader lives a thousand lives before he dies.", author: "George R.R. Martin" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
];

export default function HomePage() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="app">
      {/* NAV */}
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__logo">
          <span className="navbar__logo-icon">◈</span>
          PageTurners
        </div>
        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          <li><Link to="/clubs">Clubs</Link></li>
          <li><a href="#">Archive</a></li>
          <li><a href="#">Members</a></li>
          <li><a href="#">Discussions</a></li>
          <li className="navbar__actions">
            <Link to="/signup" className="navbar__join">Join Club</Link>
            <Link to="/profile" className="navbar__profile-link" aria-label="View profile">
              <svg viewBox="0 0 24 24" className="navbar__profile-icon" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M5 19c1.5-3 4.2-4.5 7-4.5s5.5 1.5 7 4.5" />
              </svg>
            </Link>
          </li>
        </ul>
        <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      <header className="hero">
        <div className="hero__texture" />
        <div className="hero__content">
          <p className="hero__eyebrow">✦ Your Reading Circle ✦</p>
          <h1 className="hero__title">
            Words that <em>gather</em><br />minds together
          </h1>
          <p className="hero__subtitle">
            A curated book club for curious readers. One book, one month,
            a hundred conversations worth having.
          </p>
          <div className="hero__cta-group">
            <button className="btn btn--primary">Explore Books →</button>
            <Link to="/clubs" className="btn btn--ghost">Explore Clubs →</Link>
          </div>
        </div>
        <div className="hero__ornament">
          <div className="hero__book-stack">
            <div className="book book--back" />
            <div className="book book--mid" />
            <div className="book book--front">
              <span>The Midnight Library</span>
            </div>
          </div>
        </div>
        <div className="hero__scroll-hint">scroll</div>
      </header>

      {/* QUOTE TICKER */}
      <div className="quote-band">
        <div className="quote-band__inner">
          <span className="quote-band__mark">"</span>
          <p className="quote-band__text" key={quoteIndex}>
            {quotes[quoteIndex].text}
          </p>
          <span className="quote-band__author">— {quotes[quoteIndex].author}</span>
        </div>
      </div>

      {/* FEATURED BOOK */}
      <section className="featured">
        <div className="featured__label">
          <span>◉ Currently Reading</span>
        </div>
        <div className="featured__grid">
          <div className="featured__cover" style={{ background: featuredBook.coverColor }}>
            <div className="featured__cover-spine" />
            <div className="featured__cover-title">
              <p>{featuredBook.title}</p>
              <small>{featuredBook.author}</small>
            </div>
            <div className="featured__cover-shimmer" />
          </div>
          <div className="featured__info">
            <p className="featured__genre">{featuredBook.genre}</p>
            <h2 className="featured__title">{featuredBook.title}</h2>
            <p className="featured__author">by {featuredBook.author}</p>
            <p className="featured__desc">{featuredBook.description}</p>
            <div className="featured__meta">
              <div className="meta-pill">
                <span className="meta-pill__icon">★</span>
                {featuredBook.rating} rating
              </div>
              <div className="meta-pill">
                <span className="meta-pill__icon">◉</span>
                {featuredBook.members} reading
              </div>
              <div className="meta-pill">
                <span className="meta-pill__icon">⊛</span>
                {featuredBook.chapter}
              </div>
            </div>
            <div className="featured__actions">
              <button className="btn btn--primary">Join Discussion</button>
              <button className="btn btn--outline">View Notes</button>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="upcoming">
        <div className="section-header">
          <h2>Coming Up Next</h2>
          <a href="#" className="section-header__link">View full calendar →</a>
        </div>
        <div className="upcoming__grid">
          {upcomingBooks.map((book) => (
            <div className="upcoming__card" key={book.id}>
              <div className="upcoming__card-month" style={{ color: book.accent }}>
                {book.month}
              </div>
              <div
                className="upcoming__card-cover"
                style={{ borderColor: book.accent }}
              >
                <div className="upcoming__card-cover-inner" style={{ background: book.accent }}>
                  <p>{book.title}</p>
                </div>
              </div>
              <div className="upcoming__card-info">
                <p className="upcoming__card-title">{book.title}</p>
                <p className="upcoming__card-author">{book.author}</p>
                <span className="upcoming__card-genre">{book.genre}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERS */}
      <section className="members-section">
        <div className="members-section__bg" />
        <div className="members-section__content">
          <div className="section-header section-header--light">
            <h2>Active Readers</h2>
            <a href="#" className="section-header__link section-header__link--light">
              Meet all members →
            </a>
          </div>
          <div className="members-grid">
            {members.map((m, i) => (
              <div className="member-card" key={i}>
                <div className="member-card__avatar" style={{ background: m.color }}>
                  {m.avatar}
                </div>
                <p className="member-card__name">{m.name}</p>
                <p className="member-card__stat">{m.books} books read</p>
              </div>
            ))}
          </div>
          <div className="members-section__stats">
            <div className="stat">
              <span className="stat__num">248</span>
              <span className="stat__label">Members</span>
            </div>
            <div className="stat__divider" />
            <div className="stat">
              <span className="stat__num">36</span>
              <span className="stat__label">Books Read</span>
            </div>
            <div className="stat__divider" />
            <div className="stat">
              <span className="stat__num">1,200+</span>
              <span className="stat__label">Discussions</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="cta-band__deco">◈</div>
        <h2>Ready to find your next favourite book?</h2>
        <p>Join PageTurners and start reading with people who love stories as much as you do.</p>
        <button className="btn btn--primary btn--large">Become a Member</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__logo">◈ PageTurners</div>
        <div className="footer__links">
          <a href="#">About</a>
          <a href="#">How It Works</a>
          <a href="#">Newsletter</a>
          <a href="#">Contact</a>
        </div>
        <p className="footer__copy">© 2026 PageTurners. Made for readers, by readers.</p>
      </footer>
    </div>
  );
}