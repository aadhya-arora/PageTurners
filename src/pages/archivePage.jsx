import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styling/archivePage.css";

const initialBooks = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    rating: "★★★★★",
    status: "currently",
    favorite: false,
    clubId: 1
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    rating: "★★★★★",
    status: "read",
    favorite: true,
    clubId: 2
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic",
    rating: "★★★★★",
    status: "want",
    favorite: false,
    clubId: 3
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Help",
    rating: "★★★★★",
    status: "currently",
    favorite: true,
    clubId: 4
  },
  {
  id: 5,
  title: "Harry Potter",
  author: "JK Rowling",
  genre: "Fictional",
  rating: "★★★★★",
  status: "revisiting",
  favorite: true,
  clubId: 5
}
];

export default function ArchivePage() {

  const [books, setBooks] = useState(initialBooks);
  const [openMenu, setOpenMenu] = useState(null);

  const updateStatus = (id, status) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === id
          ? { ...book, status }
          : book
      )
    );
  };

  const toggleFav = id =>
    setBooks(prev =>
      prev.map(book =>
        book.id === id
          ? { ...book, favorite: !book.favorite }
          : book
      )
    );

  const sections = useMemo(() => ({
    currently: books.filter(book => book.status === "currently"),
    revisiting: books.filter(book => book.status === "revisiting"),
    want: books.filter(book => book.status === "want"),
    read: books.filter(book => book.status === "read"),
    favorite: books.filter(book => book.favorite)
  }), [books]);

  const Card = ({ book }) => (

    <div className="ar-book">

      <div className="ar-book-cover">

        <div className={`ar-ribbon ${book.status}`}>
  {book.status === "currently" && "📖"}
  {book.status === "revisiting" && "🔄"}
  {book.status === "want" && "📚"}
  {book.status === "read" && "✔"}
</div>

      </div>

      <div className="ar-controls">

        <button
          className="ar-icon-btn"
          onClick={() => toggleFav(book.id)}
        >
          {book.favorite ? <FaHeart /> : <FaRegHeart />}
        </button>

        <div className="ar-menu-wrapper">

          <button
            className="ar-menu-btn"
            onClick={() =>
              setOpenMenu(openMenu === book.id ? null : book.id)
            }
          >
            ⋮
          </button>

          {openMenu === book.id && (

            <div className="ar-floating-menu">

              <button
                onClick={() => {
                  updateStatus(book.id, "currently");
                  setOpenMenu(null);
                }}
              >
                📖 Currently Reading
              </button>

              <button
  onClick={() => {
    updateStatus(book.id, "revisiting");
    setOpenMenu(null);
  }}
>
  🔄 Revisiting
</button>

              <button
                onClick={() => {
                  updateStatus(book.id, "want");
                  setOpenMenu(null);
                }}
              >
                📚 Want To Read
              </button>

              <button
                onClick={() => {
                  updateStatus(book.id, "read");
                  setOpenMenu(null);
                }}
              >
                ✔ Read
              </button>

            </div>

          )}

        </div>

      </div>

      <h4 className="ar-book-name">
        {book.title}
      </h4>

    </div>

  );

  return (

    <div className="ar-page">

      <Link to="/" className="bl-back-btn">
        ← Back to Home
      </Link>

      <h1>◈ My Archive</h1>

      <div className="ar-stats">

        <div>
          <strong>{books.length}</strong>
          <span>Books</span>
        </div>

        <div>
          <strong>{sections.currently.length}</strong>
          <span>Reading</span>
        </div>

        <div>
          <strong>{sections.read.length}</strong>
          <span>Finished</span>
        </div>

        <div>
          <strong>{sections.favorite.length}</strong>
          <span>Favorites</span>
        </div>

      </div>

      {[
  ["Currently Reading", "currently"],
  ["Revisiting", "revisiting"],
  ["Want To Read", "want"],
  ["Read", "read"],
  ["Favorites", "favorite"]
].map(([label, key]) => (

        <section key={key} className="ar-section">

          <h2>{label}</h2>

          <div className="ar-grid">

            {sections[key].length ? (

              sections[key].map(book => (
                <Card
                  key={book.id}
                  book={book}
                />
              ))

            ) : (

              <p className="empty">
                No books here yet.
              </p>

            )}

          </div>

        </section>

      ))}

    </div>

  );

}