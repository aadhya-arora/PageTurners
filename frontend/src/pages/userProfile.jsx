import { Link } from "react-router-dom";
import "../styling/userProfile.css";

const profile = {
  name: "Maya Chen",
  username: "@maya.reads",
  location: "Toronto, Canada",
  bio: "A cozy mystery lover who believes every good book should come with a strong ending and a warm cup of tea.",
  avatar: "MC",
  favoriteGenres: ["Literary Fiction", "Mystery & Thriller", "Fantasy"],
  currentlyReading: {
    title: "The Midnight Library",
    author: "Matt Haig",
    progress: "Chapter 8 of 14",
  },
  readingGoal: 24,
  booksRead: 118,
  followers: 182,
  following: 96,
};

const recentBooks = [
  { title: "Piranesi", status: "Finished last week" },
  { title: "The House of the Spirits", status: "Currently revisiting" },
  { title: "Tomorrow, and Tomorrow", status: "On your list" },
];

export default function UserProfile() {
  return (
    <div className="up-page">
      <div className="up-shell">
        <header className="up-header">
          <Link to="/" className="up-back-link">
            ← Back to Home
          </Link>
          <button className="up-action-btn">Edit Profile</button>
        </header>

        <section className="up-hero">
          <div className="up-hero__avatar">{profile.avatar}</div>
          <div className="up-hero__content">
            <div className="up-hero__topline">
              <div>
                <h1>{profile.name}</h1>
                <p className="up-hero__username">{profile.username}</p>
              </div>
              <span className="up-location">📍 {profile.location}</span>
            </div>
            <p className="up-bio">{profile.bio}</p>
            <div className="up-stats">
              <div className="up-stat-pill">
                <strong>{profile.booksRead}</strong>
                <span>Books Read</span>
              </div>
              <div className="up-stat-pill">
                <strong>{profile.followers}</strong>
                <span>Followers</span>
              </div>
              <div className="up-stat-pill">
                <strong>{profile.following}</strong>
                <span>Following</span>
              </div>
            </div>
          </div>
        </section>

        <section className="up-grid">
          <article className="up-card">
            <div className="up-card__header">
              <h2>Favorite Genres</h2>
              <span>Curated for your shelves</span>
            </div>
            <div className="up-pill-list">
              {profile.favoriteGenres.map((genre) => (
                <span key={genre} className="up-pill">
                  {genre}
                </span>
              ))}
            </div>
          </article>

          <article className="up-card">
            <div className="up-card__header">
              <h2>Currently Reading</h2>
              <span>In motion right now</span>
            </div>
            <div className="up-book-card">
              <div className="up-book-card__cover">📖</div>
              <div>
                <h3>{profile.currentlyReading.title}</h3>
                <p>by {profile.currentlyReading.author}</p>
                <small>{profile.currentlyReading.progress}</small>
              </div>
            </div>
          </article>

          <article className="up-card">
            <div className="up-card__header">
              <h2>Reading Goal</h2>
              <span>This year</span>
            </div>
            <div className="up-goal">
              <div className="up-goal__ring">
                <span>{profile.readingGoal}</span>
              </div>
              <p>Books planned for the year</p>
            </div>
          </article>

          <article className="up-card">
            <div className="up-card__header">
              <h2>Books Read</h2>
              <span>Milestone moments</span>
            </div>
            <div className="up-number-block">{profile.booksRead}</div>
            <p className="up-card__caption">You are building a thoughtful library one story at a time.</p>
          </article>

          <article className="up-card up-card--wide">
            <div className="up-card__header">
              <h2>Recently Enjoyed</h2>
              <span>Fresh from the shelf</span>
            </div>
            <ul className="up-list">
              {recentBooks.map((book) => (
                <li key={book.title}>
                  <strong>{book.title}</strong>
                  <span>{book.status}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </div>
  );
}
