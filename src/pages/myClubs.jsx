import { FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaBookOpen } from "react-icons/fa";
import "../styling/myClubs.css";
import { Link } from "react-router-dom";
const joinedClubs = [
  {
    id: 1,
    clubName: "Fantasy Readers",
    genre: "Fantasy",
    members: 58,
    joinedDate: "12 July 2026",
    meetup: "Every Saturday • 7:00 PM",
    location: "Central Library, Delhi",
    bookTitle: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover:
      "https://covers.openlibrary.org/b/id/6979861-L.jpg",
  },
  {
    id: 2,
    clubName: "Weekend Classics",
    genre: "Classic",
    members: 31,
    joinedDate: "4 June 2026",
    meetup: "Every Sunday • 5:30 PM",
    location: "City Book Café",
    bookTitle: "Pride and Prejudice",
    author: "Jane Austen",
    cover:
      "https://covers.openlibrary.org/b/id/8091016-L.jpg",
  },
  {
    id: 3,
    clubName: "Mystery Society",
    genre: "Mystery",
    members: 46,
    joinedDate: "22 May 2026",
    meetup: "Every Friday • 6:30 PM",
    location: "Downtown Library",
    bookTitle: "The Silent Patient",
    author: "Alex Michaelides",
    cover:
      "https://covers.openlibrary.org/b/id/10521270-L.jpg",
  },
];

export default function MyClubs() {
  return (
    <div className="mc-page">
      <section className="mc-section">
        
        <div className="mc-eyebrow">
          <span>◉ Your Reading Communities</span>
        </div>
        
        <div className="mc-header">
          <div>
            <h1 className="mc-title">My Clubs</h1>
            <p className="mc-subtitle">
              Every story becomes richer when shared. Here are the communities
              you've joined.
            </p>

            <Link to="/" className="mc-home-btn">
                ← Back to Home
            </Link>
          </div>

          <div className="mc-count">
            <span>{joinedClubs.length}</span>
            <small>Joined Clubs</small>
          </div>
        </div>

        <div className="mc-grid">
          {joinedClubs.map((club) => (
            <article className="mc-card" key={club.id}>
              <div className="mc-book">
                <img
                  src={club.cover}
                  alt={club.bookTitle}
                  className="mc-cover"
                />

                <div className="mc-book-details">
                  <h3>{club.bookTitle}</h3>
                  <p>{club.author}</p>
                </div>
              </div>

              <div className="mc-divider"></div>

              <div className="mc-content">
                <div className="mc-top">
                  <div>
                    <h2>{club.clubName}</h2>

                    <span className="mc-chip">
                      <FaBookOpen />
                      {club.genre}
                    </span>
                  </div>

                  <button className="mc-btn mc-btn--primary">
                    Open Club
                  </button>
                </div>

                <div className="mc-info">
                  <div className="mc-info-item">
                    <FaUsers className="mc-icon" />

                    <div>
                      <label>Members</label>
                      <span>{club.members} Readers</span>
                    </div>
                  </div>

                  <div className="mc-info-item">
                    <FaCalendarAlt className="mc-icon" />

                    <div>
                      <label>Joined</label>
                      <span>{club.joinedDate}</span>
                    </div>
                  </div>

                  <div className="mc-info-item">
                    <FaCalendarAlt className="mc-icon" />

                    <div>
                      <label>Regular Meetups</label>
                      <span>{club.meetup}</span>
                    </div>
                  </div>

                  <div className="mc-info-item">
                    <FaMapMarkerAlt className="mc-icon" />

                    <div>
                      <label>Location</label>
                      <span>{club.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}