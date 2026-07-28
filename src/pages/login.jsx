import { useState } from "react";
import "../styling/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = "Enter your email address.";
    if (!password) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitting(true);
      // Hook up to real auth here.
      setTimeout(() => setSubmitting(false), 1200);
    }
  }

  return (
    <div className="lg-page">
      <a href="/" className="lg-back-logo">◈ PageTurners</a>

      <div className="lg-panel">
        <div className="lg-panel__bg" />
        <div className="lg-panel__content">
          <div className="lg-eyebrow">
            <span>◉ Welcome back</span>
          </div>
          <h1 className="lg-panel__title">
            Pick up your <em>reading</em>, right where you left it.
          </h1>

          <div className="lg-quote">
            <span className="lg-quote__mark">&#8220;</span>
            <p>
              A book club is a room full of strangers who all read the same
              sentence and felt something different.
            </p>
            <cite>— The Reading Room</cite>
          </div>

          <div className="lg-stats">
            <div className="lg-stat">
              <span className="lg-stat__num">1.2K</span>
              <span className="lg-stat__label">Members Reading</span>
            </div>
            <div className="lg-stat__divider" />
            <div className="lg-stat">
              <span className="lg-stat__num">86</span>
              <span className="lg-stat__label">Circles Open</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg-form-side">
        <div className="lg-form-wrap">
          <div className="lg-eyebrow lg-eyebrow--form">
            <span>⊛ Sign In</span>
          </div>
          <h2 className="lg-form-title">Enter your reading room</h2>
          <p className="lg-form-sub">
            New to PageTurners? <a href="/signup" className="lg-inline-link">Create an account</a>
          </p>

          <form className="lg-form" onSubmit={handleSubmit} noValidate>
            <div className={`lg-field ${errors.email ? "lg-field--error" : ""}`}>
              <label className="lg-field__label" htmlFor="lg-email">Email</label>
              <input
                id="lg-email"
                className="lg-field__input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {errors.email && <span className="lg-field__error">{errors.email}</span>}
            </div>

            <div className={`lg-field ${errors.password ? "lg-field--error" : ""}`}>
              <div className="lg-field__row">
                <label className="lg-field__label" htmlFor="lg-password">Password</label>
                <a href="/forgot-password" className="lg-forgot-link">Forgot?</a>
              </div>
              <input
                id="lg-password"
                className="lg-field__input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {errors.password && <span className="lg-field__error">{errors.password}</span>}
            </div>

            <label className="lg-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Keep me signed in</span>
            </label>

            <button
              type="submit"
              className={`lg-btn lg-btn--primary lg-btn--full lg-btn--large ${submitting ? "lg-btn--disabled" : ""}`}
            >
              {submitting ? "Signing In…" : "Sign In"}
            </button>
          </form>

          <div className="lg-divider">
            <span>or</span>
          </div>

          <button type="button" className="lg-btn lg-btn--outline lg-btn--full lg-btn--large">
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}