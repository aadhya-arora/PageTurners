import { Link, useParams } from "react-router-dom";
import "../styling/bookPage.css";

const books = {
  "the-midnight-library": {
    title: "The Midnight Library",
    author: "Matt Haig",
    coverColor: "#7a4f3a",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book offers a chance to try another life you could have lived.",
    genres: ["Literary Fiction", "Fantasy", "Contemporary"],
    rating: 4.7,
    publicationYear: 2020,
    readers: 142,
    discussionGroups: [
      "The What-If Club",
      "Sunday Reflection Circle",
      "Life Choices & Literature",
    ],
    reviews: [
      {
        name: "Asha",
        quote: "A warm and thoughtful story that made me pause and reflect on every version of myself.",
      },
      {
        name: "Noah",
        quote: "The concept is brilliant, and the emotional payoff feels genuinely earned.",
      },
    ],
    similarBooks: [
      { id: "piranesi", title: "Piranesi", author: "Susanna Clarke" },
      { id: "the-house-in-the-cerulean-sea", title: "The House in the Cerulean Sea", author: "TJ Klune" },
      { id: "a-man-called-ove", title: "A Man Called Ove", author: "Fredrik Backman" },
    ],
  },
  piranesi: {
    title: "Piranesi",
    author: "Susanna Clarke",
    coverColor: "#b07d62",
    description:
      "A labyrinthine, dreamlike novel about a man who lives in a vast and mysterious world of endless halls.",
    genres: ["Mystery", "Fantasy", "Literary Fiction"],
    rating: 4.5,
    publicationYear: 2020,
    readers: 98,
    discussionGroups: ["The Hallway Society", "Dream Logic Readers"],
    reviews: [
      {
        name: "Mina",
        quote: "So atmospheric and strange that it stayed with me long after the final page.",
      },
    ],
    similarBooks: [
      { id: "the-midnight-library", title: "The Midnight Library", author: "Matt Haig" },
      { id: "the-house-in-the-cerulean-sea", title: "The House in the Cerulean Sea", author: "TJ Klune" },
    ],
  },
};

export default function BookPage() {
  const { bookId = "the-midnight-library" } = useParams();
  const book = books[bookId] ?? books["the-midnight-library"];

  return (
    <div className="book-page">
      <div className="book-page__backdrop" />
      <div className="book-page__shell">
        <header className="book-page__hero">
          <div className="book-page__cover-column">
            <Link to="/" className="book-page__back-btn">
              ← Back to Library
            </Link>
            <div className="book-page__cover" style={{ background: book.coverColor }}>
              <div className="book-page__cover-spine" />
              <div className="book-page__cover-title">
                <p>{book.title}</p>
                <span>{book.author}</span>
              </div>
            </div>
          </div>

          <div className="book-page__header-content">
            <p className="book-page__eyebrow">Featured Book</p>
            <h1>{book.title}</h1>
            <p className="book-page__author">by {book.author}</p>
            <p className="book-page__description">{book.description}</p>

            <div className="book-page__meta">
              <div className="meta-card">
                <span className="meta-card__label">Rating</span>
                <strong>{book.rating}/5</strong>
              </div>
              <div className="meta-card">
                <span className="meta-card__label">Published</span>
                <strong>{book.publicationYear}</strong>
              </div>
              <div className="meta-card">
                <span className="meta-card__label">Readers</span>
                <strong>{book.readers}</strong>
              </div>
            </div>
          </div>
        </header>

        <main className="book-page__content">
          <section className="book-page__section">
            <h2>Genres</h2>
            <div className="book-page__chips">
              {book.genres.map((genre) => (
                <span className="chip" key={genre}>
                  {genre}
                </span>
              ))}
            </div>
          </section>

          <section className="book-page__section">
            <h2>Discussion Groups</h2>
            <ul className="book-page__list">
              {book.discussionGroups.map((group) => (
                <li key={group}>{group}</li>
              ))}
            </ul>
          </section>

          <section className="book-page__section">
            <h2>Reviews</h2>
            <div className="book-page__reviews">
              {book.reviews.map((review) => (
                <article className="review-card" key={review.name}>
                  <p className="review-card__quote">“{review.quote}”</p>
                  <span className="review-card__author">— {review.name}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="book-page__section">
            <h2>Similar Books</h2>
            <div className="book-page__similar">
              {book.similarBooks.map((item) => (
                <Link to={`/book/${item.id}`} className="similar-card" key={item.id}>
                  <h3>{item.title}</h3>
                  <p>{item.author}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
