import { useState } from "react";
import "../styling/signUp.css";

const GENRES = [
  "Literary Fiction",
  "Mystery & Thriller",
  "Historical Fiction",
  "Science Fiction",
  "Non-Fiction",
  "Fantasy",
  "Biography",
  "Poetry",
];

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    readingGoal: "12",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your name.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Enter a valid email address.";
    if (form.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleNext = () => {
    if (validate()) setStep(2);
  };

  const handleSubmit = () => {
    if (selectedGenres.length === 0) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="su-page">
        <a href="/" className="su-back-logo">◈ PageTurners</a>
        <div className="su-success">
          <div className="su-success__icon">◈</div>
          <h2>Welcome to the circle, {form.fullName.split(" ")[0]}.</h2>
          <p>
            Your reading journey starts now. We've sent a confirmation to{" "}
            <strong>{form.email}</strong>.
          </p>
          <a href="/" className="su-btn su-btn--primary">Go to your shelf →</a>
        </div>
      </div>
    );
  }

  return (
    <div className="su-page">
      {/* Left Panel */}
      <aside className="su-panel">
        <div className="su-panel__inner">
          <a href="/" className="su-panel__logo">◈ PageTurners</a>

          <div className="su-panel__quote">
            <span className="su-panel__quote-mark">"</span>
            <p>Reading is the sole means by which we slip, involuntarily, often helplessly, into another's skin.</p>
            <cite>— Joyce Carol Oates</cite>
          </div>

          <div className="su-panel__books">
            <div className="su-panel__book su-panel__book--c" />
            <div className="su-panel__book su-panel__book--b" />
            <div className="su-panel__book su-panel__book--a">
              <span>The Midnight Library</span>
            </div>
          </div>

          <div className="su-panel__stats">
            <div className="su-panel__stat">
              <span className="su-panel__stat-num">248</span>
              <span className="su-panel__stat-label">Members</span>
            </div>
            <div className="su-panel__stat-divider" />
            <div className="su-panel__stat">
              <span className="su-panel__stat-num">36</span>
              <span className="su-panel__stat-label">Books read</span>
            </div>
            <div className="su-panel__stat-divider" />
            <div className="su-panel__stat">
              <span className="su-panel__stat-num">1.2k</span>
              <span className="su-panel__stat-label">Discussions</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Right / Form Side */}
      <main className="su-form-side">
        <div className="su-form-wrap">

          {/* Step indicator */}
          <div className="su-steps">
            <div className={`su-step-dot ${step >= 1 ? "su-step-dot--active" : ""}`}>
              <span>1</span>
            </div>
            <div className={`su-step-line ${step === 2 ? "su-step-line--filled" : ""}`} />
            <div className={`su-step-dot ${step === 2 ? "su-step-dot--active" : ""}`}>
              <span>2</span>
            </div>
          </div>

          {step === 1 && (
            <div className="su-step" key="step1">
              <div className="su-header">
                <p className="su-eyebrow">✦ Step 1 of 2</p>
                <h1>Create your account</h1>
                <p className="su-sub">
                  Already a member?{" "}
                  <a href="/login" className="su-link">Sign in</a>
                </p>
              </div>

              <div className="su-fields">
                {/* Full Name */}
                <div className={`su-field ${errors.fullName ? "su-field--error" : ""}`}>
                  <label className="su-field__label" htmlFor="fullName">Full name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="su-field__input"
                    placeholder="Jane Austen"
                    value={form.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.fullName && (
                    <span className="su-field__error">{errors.fullName}</span>
                  )}
                </div>

                {/* Email */}
                <div className={`su-field ${errors.email ? "su-field--error" : ""}`}>
                  <label className="su-field__label" htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="su-field__input"
                    placeholder="jane@folio.club"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="su-field__error">{errors.email}</span>
                  )}
                </div>

                {/* Password */}
                <div className={`su-field ${errors.password ? "su-field--error" : ""}`}>
                  <label className="su-field__label" htmlFor="password">Password</label>
                  <div className="su-field__input-wrap">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="su-field__input su-field__input--padded"
                      placeholder="8+ characters"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="su-field__toggle"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? "hide" : "show"}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="su-field__error">{errors.password}</span>
                  )}
                  <div className="su-pwd-strength">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`su-pwd-bar ${
                          form.password.length >= i * 3
                            ? form.password.length >= 10
                              ? "su-pwd-bar--strong"
                              : "su-pwd-bar--mid"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Reading goal */}
                <div className="su-field">
                  <label className="su-field__label" htmlFor="readingGoal">
                    Books goal this year
                  </label>
                  <div className="su-goal-select">
                    {["6", "12", "24", "52"].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`su-goal-btn ${form.readingGoal === n ? "su-goal-btn--active" : ""}`}
                        onClick={() => setForm((p) => ({ ...p, readingGoal: n }))}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <span className="su-field__hint">books per year</span>
                </div>
              </div>

              <button className="su-btn su-btn--primary su-btn--full" onClick={handleNext}>
                Continue →
              </button>

              <p className="su-terms">
                By joining, you agree to our{" "}
                <a href="#" className="su-link">Terms</a> and{" "}
                <a href="#" className="su-link">Privacy Policy</a>.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="su-step" key="step2">
              <div className="su-header">
                <p className="su-eyebrow">✦ Step 2 of 2</p>
                <h1>What do you love to read?</h1>
                <p className="su-sub">
                  Pick at least one genre so we can tailor your picks.
                </p>
              </div>

              <div className="su-genre-grid">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    className={`su-genre-chip ${
                      selectedGenres.includes(genre) ? "su-genre-chip--selected" : ""
                    }`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {selectedGenres.includes(genre) && (
                      <span className="su-genre-chip__check">✓</span>
                    )}
                    {genre}
                  </button>
                ))}
              </div>

              {selectedGenres.length === 0 && (
                <p className="su-genre-hint">Select at least one to continue.</p>
              )}

              <div className="su-step2-actions">
                <button
                  type="button"
                  className="su-btn su-btn--outline"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  className={`su-btn su-btn--primary ${
                    selectedGenres.length === 0 ? "su-btn--disabled" : ""
                  }`}
                  onClick={handleSubmit}
                  disabled={selectedGenres.length === 0}
                >
                  Join PageTurners
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}