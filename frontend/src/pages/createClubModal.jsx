import { useEffect, useState } from "react";

const EMPTY_FORM = {
  name: "",
  description: "",
  bookTitle: "",
  author: "",
  isbn: "",
  genre: "",
  meetupType: "virtual", // "virtual" | "in-person"
  schedule: "",
  location: "",
};

export default function CreateClubModal({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState(EMPTY_FORM);

  // Reset the form whenever the modal is (re)opened
  useEffect(() => {
    if (isOpen) setForm(EMPTY_FORM);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const meetupLabel = form.schedule.trim()
      ? form.schedule.trim()
      : "Schedule TBD";

    const newClub = {
      id: `club-${Date.now()}`,
      name: form.name.trim(),
      tagline: form.description.trim(),
      members: [],
      currentBook: {
        title: form.bookTitle.trim(),
        author: form.author.trim(),
        isbn: form.isbn.trim(),
        genre: form.genre.trim(),
      },
      nextMeetup:
        form.meetupType === "virtual"
          ? `Virtual • ${meetupLabel}`
          : meetupLabel,
      location:
        form.meetupType === "in-person" ? form.location.trim() : "Virtual",
    };

    onCreate(newClub);
    onClose();
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className="club-modal-overlay"
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <div
        className="club-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="club-modal-title"
      >
        <button
          type="button"
          className="club-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <p className="club-modal__eyebrow">New chapter</p>
        <h2 id="club-modal-title" className="club-modal__title">
          Start your own club
        </h2>
        <p className="club-modal__subtitle">
          Gather your readers, pick a book, and set the terms of the meet-up.
        </p>

        <form className="club-modal__form" onSubmit={handleSubmit}>
          <div className="club-modal__section">
            <div className="club-modal__field">
              <label htmlFor="name">Club name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. The Marginalia Society"
                required
              />
            </div>

            <div className="club-modal__field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="What's this club about? Who should join?"
                rows={3}
                required
              />
            </div>
          </div>

          <div className="club-modal__section">
            <p className="club-modal__section-label">Currently reading</p>
            <div className="club-modal__grid">
              <div className="club-modal__field">
                <label htmlFor="bookTitle">Book title</label>
                <input
                  id="bookTitle"
                  name="bookTitle"
                  type="text"
                  value={form.bookTitle}
                  onChange={handleChange}
                  placeholder="Book title"
                  required
                />
              </div>
              <div className="club-modal__field">
                <label htmlFor="author">Author</label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Author name"
                  required
                />
              </div>
              <div className="club-modal__field">
                <label htmlFor="isbn">ISBN</label>
                <input
                  id="isbn"
                  name="isbn"
                  type="text"
                  value={form.isbn}
                  onChange={handleChange}
                  placeholder="978-..."
                  required
                />
              </div>
              <div className="club-modal__field">
                <label htmlFor="genre">Genre</label>
                <input
                  id="genre"
                  name="genre"
                  type="text"
                  value={form.genre}
                  onChange={handleChange}
                  placeholder="e.g. Historical fiction"
                  required
                />
              </div>
            </div>
          </div>

          <div className="club-modal__section">
            <p className="club-modal__section-label">
              Meet-ups <span>(optional)</span>
            </p>

            <div className="club-modal__toggle" role="radiogroup" aria-label="Meetup type">
              <button
                type="button"
                role="radio"
                aria-checked={form.meetupType === "virtual"}
                className={
                  form.meetupType === "virtual"
                    ? "club-modal__toggle-btn is-active"
                    : "club-modal__toggle-btn"
                }
                onClick={() =>
                  setForm((prev) => ({ ...prev, meetupType: "virtual" }))
                }
              >
                Virtual
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={form.meetupType === "in-person"}
                className={
                  form.meetupType === "in-person"
                    ? "club-modal__toggle-btn is-active"
                    : "club-modal__toggle-btn"
                }
                onClick={() =>
                  setForm((prev) => ({ ...prev, meetupType: "in-person" }))
                }
              >
                In-person
              </button>
            </div>

            <div className="club-modal__grid">
              <div className="club-modal__field">
                <label htmlFor="schedule">Timing</label>
                <input
                  id="schedule"
                  name="schedule"
                  type="text"
                  value={form.schedule}
                  onChange={handleChange}
                  placeholder="e.g. Every other Sunday, 5 PM"
                />
              </div>

              {form.meetupType === "in-person" && (
                <div className="club-modal__field">
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Chapters Café, Sector 17"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="club-modal__actions">
            <button
              type="button"
              className="club-modal__cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="club-modal__submit">
              Create club
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}