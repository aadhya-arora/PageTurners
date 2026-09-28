import { useState, useRef, useEffect } from "react";
import "../styling/chatPage.css";

const MEMBERS = [
  { id: 1, name: "Mira Okafor", initials: "MO", color: "#c49a72" },
  { id: 2, name: "Théo Laurent", initials: "TL", color: "#8faa8b" },
  { id: 3, name: "Priya Nandan", initials: "PN", color: "#b07d62" },
  { id: 4, name: "Sam Whitfield", initials: "SW", color: "#9b8ea0" },
  { id: 5, name: "Ines Bergman", initials: "IB", color: "#c49a72" },
  { id: 6, name: "Jo Alcott", initials: "JA", color: "#8faa8b" },
];

const SEED_MESSAGES = [
  {
    id: 1,
    memberId: 3,
    text: "The way the House keeps its own weather in Piranesi got me — those tides that flood the lower halls on a schedule nobody controls. It reframed the whole opening chapter for me on a reread.",
    time: "7:04 PM",
  },
  {
    id: 2,
    memberId: 2,
    text: "Agreed. I think the House functions almost like a second protagonist. It has moods.",
    time: "7:06 PM",
  },
  {
    id: 3,
    memberId: 1,
    text: "Right, and that's what makes the reveal about the Other land so hard — you've spent 150 pages trusting the House's logic as much as the narrator does.",
    time: "7:09 PM",
  },
  {
    id: 4,
    memberId: 4,
    text: "Question for Thursday: do we think the narrator's naivety is a symptom of isolation, or something closer to a coping mechanism he built on purpose?",
    time: "7:11 PM",
  },
  {
    id: 5,
    memberId: 5,
    text: "Coping mechanism, for sure. The cataloguing, the ritual care for the statues and the dead — it's a structure he built to survive something unbearable. He just doesn't remember that's what it is.",
    time: "7:14 PM",
  },
];

function memberFor(id) {
  return MEMBERS.find((m) => m.id === id);
}

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function ChatPage() {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef(null);
  const currentUserId = 6; // "you" for this demo

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, memberId: currentUserId, text: trimmed, time: formatTime() },
    ]);
    setDraft("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function newThread() {
    setMessages([]);
    setDraft("");
  }

  return (
    <div className="cp-page">
      <a href="/" className="cp-back-logo"> ← Back to Home</a>

      <aside className="cp-sidebar">
        <div className="cp-sidebar__bg" />
        <div className="cp-sidebar__content">
          <div className="cp-eyebrow"><span>◉ Now Discussing</span></div>

          <div className="cp-book">
            <div className="cp-book-cover">
              <div className="cp-book-cover__spine" />
              <div className="cp-book-cover__title">Piranesi</div>
              <div className="cp-book-cover__author">Susanna Clarke</div>
            </div>
            <h1 className="cp-book__title">Piranesi</h1>
            <p className="cp-book__author">Susanna Clarke</p>

            <div className="cp-progress">
              <div className="cp-progress__label">
                <span>Chapters 1–9</span>
                <span>62%</span>
              </div>
              <div className="cp-progress__track">
                <div className="cp-progress__fill" style={{ width: "62%" }} />
              </div>
            </div>
          </div>

          <div className="cp-stats">
            <div className="cp-stat">
              <span className="cp-stat__num">6</span>
              <span className="cp-stat__label">Members</span>
            </div>
            <div className="cp-stats__divider" />
            <div className="cp-stat">
              <span className="cp-stat__num">{messages.length}</span>
              <span className="cp-stat__label">Messages</span>
            </div>
            
          </div>

          <div className="cp-members">
            <div className="cp-members__label">✦ In the discussion</div>
            <ul className="cp-members__list">
              {MEMBERS.map((m) => (
                <li className="cp-member" key={m.id}>
                  <span className="cp-avatar cp-avatar--sm" style={{ background: m.color }}>
                    {m.initials}
                  </span>
                  <span className="cp-member__name">{m.name}</span>
                  <span className="cp-member__dot" />
                </li>
              ))}
            </ul>
          </div>

          
        </div>
      </aside>

      <main className="cp-main">
        <header className="cp-chat-header">
          <div>
            <div className="cp-eyebrow cp-eyebrow--light"><span>⊛ Club Thread</span></div>
            <h2 className="cp-chat-header__title">Weekly Discussion <em>·</em> Chapters 1–9</h2>
          </div>
        </header>

        <div className="cp-thread" ref={scrollRef}>
          {messages.map((msg) => {
            const member = memberFor(msg.memberId);
            const isYou = msg.memberId === currentUserId;
            return (
              <div className={`cp-msg${isYou ? " cp-msg--you" : ""}`} key={msg.id}>
                <span className="cp-avatar" style={{ background: member.color }}>
                  {member.initials}
                </span>
                <div className="cp-msg__body">
                  <div className="cp-msg__meta">
                    <span className="cp-msg__name">{isYou ? "You" : member.name}</span>
                    <span className="cp-msg__time">{msg.time}</span>
                  </div>
                  <p className="cp-msg__text">{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cp-composer">
          <div className="cp-composer__box">
            <textarea
              className="cp-composer__input"
              placeholder="Share a thought on this chapter…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
            />
            <button
              className="cp-btn cp-btn--primary cp-composer__send"
              onClick={sendMessage}
              disabled={!draft.trim()}
            >
              Send
            </button>
          </div>
          <button
            className="cp-btn cp-btn--outline cp-composer__new-thread"
            onClick={newThread}
            type="button"
          >
            ✦ New Thread
          </button>
        </div>
      </main>
    </div>
  );
}