import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { clubs } from "../data/clubsData";
import "../styling/clubsPage.css";

export default function ClubsPage() {
  const [query, setQuery] = useState("");

  const filteredClubs = useMemo(() => {
    const searchValue = query.trim().toLowerCase();

    if (!searchValue) return clubs;

    return clubs.filter((club) => {
      const searchableText = [
        club.name,
        club.currentBook.title,
        club.currentBook.author,
        club.currentBook.genre,
        club.currentBook.isbn,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchValue);
    });
  }, [query]);

  return (
    <div className="clubs-page">
      <nav className="clubs-page__topbar">
        <Link to="/" className="clubs-page__back">← Back to home</Link>
        <div className="clubs-page__headline-wrap">
          <div className="clubs-page__headline">
            <h1>Available clubs</h1>
            <p>Search by book title, author, genre, or ISBN.</p>
          </div>
          <button type="button" className="clubs-page__create-btn">
            Create your own club
          </button>
        </div>
      </nav>

      <div className="clubs-page__search-row">
        <div className="clubs-page__search-wrapper">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by book title, author, genre, or ISBN"
            className="clubs-page__search"
          />
          <span className="clubs-page__search-icon" aria-hidden="true">⌕</span>
        </div>
        <span className="clubs-page__hint">
          Showing {filteredClubs.length} club{filteredClubs.length === 1 ? "" : "s"}
        </span>
      </div>

      <section className="clubs-page__list">
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club) => (
            <article className="club-card" key={club.id}>
              <div className="club-card__overlay">
                <Link to={`/clubs/${club.id}`} className="club-card__action">
                  Explore this club
                </Link>
              </div>
              <div className="club-card__header">
                <div>
                  <p className="clubs-page__eyebrow">{club.name}</p>
                  <h3>{club.tagline}</h3>
                </div>
                <span className="club-card__members">{club.members.length} members</span>
              </div>

              <div className="club-card__meta">
                <div>
                  <span className="club-card__label">Book title</span>
                  <strong>{club.currentBook.title}</strong>
                </div>
                <div>
                  <span className="club-card__label">Author</span>
                  <strong>{club.currentBook.author}</strong>
                </div>
                <div>
                  <span className="club-card__label">Genre</span>
                  <strong>{club.currentBook.genre}</strong>
                </div>
                <div>
                  <span className="club-card__label">ISBN</span>
                  <strong>{club.currentBook.isbn}</strong>
                </div>
              </div>

              <div className="club-card__footer">
                <p>
                  <strong>Next meetup:</strong> {club.nextMeetup}
                </p>
                <p>
                  <strong>Focus:</strong> {club.focus}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="clubs-page__empty">
            <h3>No clubs found</h3>
            <p>Try a different title, author, genre, or ISBN.</p>
          </div>
        )}
      </section>
    </div>
  );
}
