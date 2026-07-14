import { Link, useParams } from "react-router-dom";
import { clubs } from "../data/clubsData";
import "../styling/clubDetailsPage.css";

export default function ClubDetailsPage() {
  const { clubId } = useParams();
  const club = clubs.find((item) => item.id === Number(clubId)) ?? clubs[0];

  return (
    <div className="club-details-page">
      <div className="club-details-page__backdrop" />
      <div className="club-details-page__shell">
        <header className="club-details-page__hero">
          <div className="club-details-page__cover-column">
            <Link to="/clubs" className="club-details-page__back-btn">
              ← Back to clubs
            </Link>
            <div className="club-details-page__cover">
              <div className="club-details-page__cover-spine" />
              <div className="club-details-page__cover-title">
                <p>{club.name}</p>
                <span>{club.currentBook.title}</span>
              </div>
            </div>
          </div>

          <div className="club-details-page__header-content">
            <p className="club-details-page__eyebrow">Reading Club Spotlight</p>
            <h1>{club.name}</h1>
            <p className="club-details-page__tagline">{club.tagline}</p>
            <p className="club-details-page__description">{club.description}</p>

            <div className="club-details-page__meta">
              <div className="meta-card">
                <span className="meta-card__label">Members</span>
                <strong>{club.members.length}</strong>
              </div>
              <div className="meta-card">
                <span className="meta-card__label">Next meetup</span>
                <strong>{club.events[0]}</strong>
              </div>
              <div className="meta-card">
                <span className="meta-card__label">Current book</span>
                <strong>{club.currentBook.title}</strong>
              </div>
            </div>

            <Link to={`/book/${club.currentBook.bookId}`} className="club-details-page__book-btn">
              Open book page
            </Link>
          </div>
        </header>

        <main className="club-details-page__content">
          <section className="club-details-page__section">
            <h2>About this club</h2>
            <p>{club.description}</p>
          </section>

          <section className="club-details-page__section">
            <h2>Current book</h2>
            <div className="club-details-page__card">
              <strong>{club.currentBook.title}</strong>
              <span>by {club.currentBook.author}</span>
              <p>{club.currentBook.genre}</p>
              <p>ISBN: {club.currentBook.isbn}</p>
            </div>
          </section>

          <section className="club-details-page__section">
            <h2>Members</h2>
            <div className="club-details-page__chips">
              {club.members.map((member) => (
                <span className="chip" key={member}>
                  {member}
                </span>
              ))}
            </div>
          </section>

          <section className="club-details-page__section">
            <h2>Reading schedule</h2>
            <ul className="club-details-page__list">
              {club.schedule.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="club-details-page__section">
            <h2>Polls</h2>
            <ul className="club-details-page__list">
              {club.polls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="club-details-page__section">
            <h2>Events</h2>
            <ul className="club-details-page__list">
              {club.events.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="club-details-page__section">
            <h2>Club announcements</h2>
            <ul className="club-details-page__list">
              {club.announcements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
