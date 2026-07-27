import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { clubs as initialClubs } from "../data/clubsData";
import CreateClubModal from "./CreateClubModal";
import "../styling/clubsPage.css";

export default function ClubsPage() {
  const [query, setQuery] = useState("");
  const [clubList, setClubList] = useState(initialClubs);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredClubs = useMemo(() => {
    const searchValue = query.trim().toLowerCase();

    if (!searchValue) return clubList;

    return clubList.filter((club) => {
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
  }, [query, clubList]);

  const handleCreateClub = (newClub) => {
    setClubList((prev) => [newClub, ...prev]);
  };

  return (
    <div className="clubs-page">
      <nav className="clubs-page__topbar">
        <Link to="/" className="bl-back-btn">← Back to home</Link>
        <div className="clubs-page__headline-wrap">
          <div className="clubs-page__headline">
            <h1>Available clubs</h1>
            <p>Search by book title, author, genre, or ISBN.</p>
          </div>
          <button
            type="button"
            className="clubs-page__create-btn"
            onClick={() => setIsModalOpen(true)}
          >
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
                  <span className="club-card__label">ISBN</span>
                  <strong>{club.currentBook.isbn}</strong>
                </div>
              </div>

              <div className="club-card__footer">
                <p>
                  <strong>Meetups On:</strong><br/> {club.nextMeetup}
                </p>
                <p>
                  <strong>Genre:</strong> {club.currentBook.genre}
                </p>
                {club.location && (
                  <p>
                    <strong>Location:</strong> {club.location}
                  </p>
                )}
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

      <CreateClubModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateClub}
      />
    </div>
  );
}