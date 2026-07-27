import { useState } from "react";
import { Link } from "react-router-dom";
import "../styling/bookLibrary.css";


const books = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Mystery",
    rating: 4.7,
    description:
      "A psychological thriller about a woman who refuses to speak after committing a shocking crime.",
    clubId: 1,
    club: "Mystery Society",
    members: 146,
    color: "mystery",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic",
    rating: 4.9,
    description:
      "A timeless novel exploring love, pride, family and social expectations.",
    clubId: 2,
    club: "Classic Readers",
    members: 213,
    color: "classic",
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    rating: 4.8,
    description:
      "Epic political intrigue, prophecy and survival on the desert planet Arrakis.",
    clubId: 3,
    club: "Sci-Fi Circle",
    members: 184,
    color: "scifi",
  },
  {
    id: 4,
    title: "Harry Potter",
    author: "J.K. Rowling",
    genre: "Fantasy",
    rating: 4.9,
    description:
      "A young wizard discovers friendship, courage and destiny at Hogwarts.",
    clubId: 4,
    club: "Fantasy Realm",
    members: 298,
    color: "fantasy",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Help",
    rating: 4.8,
    description:
      "Practical strategies to build good habits and eliminate bad ones.",
    clubId: 5,
    club: "Growth Club",
    members: 109,
    color: "selfhelp",
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    rating: 4.9,
    description:
      "Bilbo Baggins begins an unforgettable adventure through Middle-earth.",
    clubId: 6,
    club: "Adventure Guild",
    members: 172,
    color: "fantasy",
  },
];

export default function BooksLibrary() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [archived, setArchived] = useState([]);

  const genres = [
    "All",
    "Fantasy",
    "Mystery",
    "Classic",
    "Science Fiction",
    "Self Help",
  ];

  const archiveBook = (id) => {
    if (!archived.includes(id)) {
      setArchived([...archived, id]);
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesGenre =
      genre === "All" || book.genre === genre;

    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    return matchesGenre && matchesSearch;
  });

  return (
    <div className="bl-page">
        <Link to="/" className="bl-back-btn">
        ← Back to Home
        </Link>
      <section className="bl-hero">

        <p className="bl-eyebrow">
          ◈ BOOK LIBRARY
        </p>

        <h1>
          Discover Books & Reading Clubs
        </h1>

        <p className="bl-subtitle">
          Archive books you've enjoyed or discover
          reading clubs built around your favourite stories.
        </p>

        <input
          className="bl-search"
          placeholder="Search books or authors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="bl-filters">

          {genres.map((item) => (
            <button
              key={item}
              onClick={() => setGenre(item)}
              className={
                genre === item
                  ? "bl-chip active"
                  : "bl-chip"
              }
            >
              {item}
            </button>
          ))}

        </div>

      </section>

      <section className="bl-grid">

        {filteredBooks.map((book) => (

          <div className="bl-card" key={book.id}>

            <div
              className={`bl-cover ${book.color}`}
            >
              <div className="bl-spine"></div>

              <div className="bl-cover-content">

                <h3>{book.title}</h3>

                <span>{book.author}</span>

              </div>

            </div>

            <div className="bl-info">

              <span className="bl-genre">
                {book.genre}
              </span>

              <h2>{book.title}</h2>

              <p className="bl-author">
                {book.author}
              </p>

              <p className="bl-rating">
                ★ {book.rating}
              </p>

              <p className="bl-description">
                {book.description}
              </p>

              {/* <div className="bl-club">

                <strong>{book.club}</strong>

                <span>
                  {book.members} members
                </span>

              </div> */}

              <div className="bl-buttons">

                <button
                  className={
                    archived.includes(book.id)
                      ? "bl-archive archived"
                      : "bl-archive"
                  }
                  onClick={() =>
                    archiveBook(book.id)
                  }
                >
                  {archived.includes(book.id)
                    ? "✓ Archived"
                    : "Archive"}
                </button>

                <Link
                  to={`/clubs`}
                  className="bl-explore"
                >
                  Explore Clubs
                </Link>

              </div>

            </div>

          </div>

        ))}

      </section>

    </div>
  );
}