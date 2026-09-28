import { useState, useRef, useEffect } from "react";
import "../styling/discussionPage.css";
/* ── Static data ─────────────────────────────────────────────── */

const GIF_REACTIONS = [
  { id: "g1", label: "Mind Blown", emoji: "🤯", gradient: "linear-gradient(135deg,#c49a44,#b05c3a)" },
  { id: "g2", label: "Plot Twist!", emoji: "📖", gradient: "linear-gradient(135deg,#6b8c6e,#3d2314)" },
  { id: "g3", label: "Shook", emoji: "😱", gradient: "linear-gradient(135deg,#b05c3a,#7a4f3a)" },
  { id: "g4", label: "Love This", emoji: "❤️", gradient: "linear-gradient(135deg,#9b7c5a,#7a5c3a)" },
  { id: "g5", label: "LOL", emoji: "😂", gradient: "linear-gradient(135deg,#c9b99a,#7a4f3a)" },
];

const AVATAR_COLORS = ["#c49a72", "#8faa8b", "#b07d62", "#9b8ea0"];

let idcounter = 100;
function nextId() {
  idcounter += 1;
  return idcounter;
}

function initialsOf(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function countComments(list) {
  return list.reduce((sum, c) => sum + 1 + countComments(c.replies), 0);
}

function seedPosts() {
  return [
    {
      id: nextId(),
      author: { name: "Mira Alston", avatarColor: AVATAR_COLORS[1] },
      timestamp: new Date(Date.now() - 1000 * 60 * 40),
      bookTag: "Piranesi",
      title: "That ending completely reframed the House for me",
      content:
        "<p>I went back and reread the first chapter after finishing and it hit so differently the second time. The <i>House</i> isn't just a setting, it's basically a character with its own logic.</p>",
      image: null,
      gif: GIF_REACTIONS[0],
      spoiler: true,
      likes: 14,
      likedByMe: false,
      bookmarked: false,
      comments: [
        {
          id: nextId(),
          author: { name: "Theo Banks", avatarColor: AVATAR_COLORS[2] },
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          content: "Same, I had to sit with it for a full day before I could even start the next book.",
          spoiler: false,
          likes: 5,
          likedByMe: false,
          replies: [
            {
              id: nextId(),
              author: { name: "Mira Alston", avatarColor: AVATAR_COLORS[1] },
              timestamp: new Date(Date.now() - 1000 * 60 * 22),
              content: "Right?? I still think about the tides scene weekly.",
              spoiler: false,
              likes: 2,
              likedByMe: false,
              replies: [],
            },
          ],
        },
      ],
    },
    {
      id: nextId(),
      author: { name: "Jules Ferreira", avatarColor: AVATAR_COLORS[3] },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      bookTag: "Circe",
      title: "Anyone else want an entire spin-off just for Penelope?",
      content:
        "<p>Her chapters were so quietly devastating. Curious what everyone thought about the choice to keep her offstage for most of the book.</p>",
      image: null,
      gif: null,
      spoiler: false,
      likes: 9,
      likedByMe: true,
      bookmarked: true,
      comments: [],
    },
  ];
}

/* ── Composer ────────────────────────────────────────────────── */

function PostComposer({ onSubmit, onCancel }) {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [bookTag, setBookTag] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [image, setImage] = useState(null);
  const [gif, setGif] = useState(null);
  const [gifPickerOpen, setGifPickerOpen] = useState(false);

  function applyFormat(cmd, value = null) {
    editorRef.current?.focus();
    document.execCommand(cmd, false, value);
  }

  function applySpoilerWrap() {
    editorRef.current?.focus();
    const selection = window.getSelection();
    const text = selection && selection.toString();
    if (text) {
      document.execCommand("insertHTML", false, `<span class="dc-spoiler-inline">${text}</span>`);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  function handleSubmit() {
    const content = editorRef.current ? editorRef.current.innerHTML.trim() : "";
    if (!title.trim() || !content) return;
    onSubmit({
      id: nextId(),
      author: { name: "You", avatarColor: AVATAR_COLORS[2] },
      timestamp: new Date(),
      bookTag: bookTag.trim() || "General",
      title: title.trim(),
      content,
      image,
      gif,
      spoiler,
      likes: 0,
      likedByMe: false,
      bookmarked: false,
      comments: [],
    });
    setTitle("");
    setBookTag("");
    setSpoiler(false);
    setImage(null);
    setGif(null);
    if (editorRef.current) editorRef.current.innerHTML = "";
  }

  return (
    <div className="dc-composer">
      <div className="dc-field">
        <label className="dc-field__label">Title</label>
        <input
          className="dc-field__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind about the book?"
        />
      </div>

      <div className="dc-composer__meta-row">
        <div className="dc-field dc-field--tag">
          <label className="dc-field__label">Book</label>
          <input
            className="dc-field__input"
            value={bookTag}
            onChange={(e) => setBookTag(e.target.value)}
            placeholder="Type a book title..."
          />
        </div>
        <label className="dc-spoiler-toggle">
          <input type="checkbox" checked={spoiler} onChange={(e) => setSpoiler(e.target.checked)} />
          <span>Contains spoilers</span>
        </label>
      </div>

      <div className="dc-editor">
        <div className="dc-editor__toolbar">
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat("bold")}>
            <b>B</b>
          </button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat("italic")}>
            <i>I</i>
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat("formatBlock", "blockquote")}
          >
            &ldquo; &rdquo;
          </button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={applySpoilerWrap}>
            ⚠ Spoiler
          </button>
        </div>
        <div
          ref={editorRef}
          className="dc-editor__area"
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Share your thoughts, theories, or a full-blown rant..."
        />
      </div>

      <div className="dc-editor__actions">
        <button type="button" className="dc-editor__tool-btn" onClick={() => fileInputRef.current?.click()}>
          🖼 Image
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
        <button type="button" className="dc-editor__tool-btn" onClick={() => setGifPickerOpen((o) => !o)}>
          ▦ GIF
        </button>
      </div>

      {gifPickerOpen && (
        <div className="dc-gif-picker">
          {GIF_REACTIONS.map((g) => (
            <button
              type="button"
              key={g.id}
              className="dc-gif-chip"
              style={{ background: g.gradient }}
              onClick={() => {
                setGif(g);
                setGifPickerOpen(false);
              }}
            >
              <span className="dc-gif-chip__emoji">{g.emoji}</span>
              <span className="dc-gif-chip__label">{g.label}</span>
            </button>
          ))}
        </div>
      )}

      {image && (
        <div className="dc-attachment-preview">
          <img src={image} alt="attachment" />
          <button type="button" onClick={() => setImage(null)}>
            ✕
          </button>
        </div>
      )}

      {gif && (
        <div className="dc-attachment-preview dc-attachment-preview--gif" style={{ background: gif.gradient }}>
          <span>
            {gif.emoji} {gif.label}
          </span>
          <button type="button" onClick={() => setGif(null)}>
            ✕
          </button>
        </div>
      )}

      <div className="dc-composer__footer">
        <button type="button" className="dc-btn dc-btn--outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="dc-btn dc-btn--primary" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
}

/* ── Comments ────────────────────────────────────────────────── */

function CommentThread({ comment, depth, onAddcomment, onLikeComment }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [revealed, setRevealed] = useState(false);

  function submitReply() {
    if (!replyValue.trim()) return;
    onAddcomment(comment.id, replyValue.trim(), false);
    setReplyValue("");
    setReplyOpen(false);
  }

  return (
    <div className="dc-comment" style={{ marginLeft: depth > 0 ? 28 : 0 }}>
      <div className="dc-comment__head">
        <div className="dc-avatar dc-avatar--sm" style={{ background: comment.author.avatarColor }}>
          {initialsOf(comment.author.name)}
        </div>
        <span className="dc-comment__author">{comment.author.name}</span>
        <span className="dc-comment__time">{timeAgo(comment.timestamp)}</span>
      </div>

      {comment.spoiler && !revealed ? (
        <button type="button" className="dc-spoiler-block dc-spoiler-block--small" onClick={() => setRevealed(true)}>
          ⚠ Spoiler — click to reveal
        </button>
      ) : (
        <p className="dc-comment__body">{comment.content}</p>
      )}

      <div className="dc-comment__actions">
        <button
          type="button"
          className={`dc-action-btn dc-action-btn--tiny ${comment.likedByMe ? "dc-action-btn--active" : ""}`}
          onClick={() => onLikeComment(comment.id)}
        >
          ▲ {comment.likes}
        </button>
        <button type="button" className="dc-action-btn dc-action-btn--tiny" onClick={() => setReplyOpen((o) => !o)}>
          ↩ Reply
        </button>
      </div>

      {replyOpen && (
        <div className="dc-comment-form dc-comment-form--reply">
          <textarea
            className="dc-field__input"
            rows={2}
            value={replyValue}
            onChange={(e) => setReplyValue(e.target.value)}
            placeholder={`Reply to ${comment.author.name}...`}
          />
          <div className="dc-comment-form__row">
            <button type="button" className="dc-btn dc-btn--outline dc-btn--small" onClick={() => setReplyOpen(false)}>
              Cancel
            </button>
            <button type="button" className="dc-btn dc-btn--primary dc-btn--small" onClick={submitReply}>
              Reply
            </button>
          </div>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="dc-comment__replies">
          {comment.replies.map((r) => (
            <CommentThread key={r.id} comment={r} depth={depth + 1} onAddcomment={onAddcomment} onLikeComment={onLikeComment} />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentSection({ comments, onAddcomment, onLikeComment }) {
  const [value, setValue] = useState("");
  const [spoiler, setSpoiler] = useState(false);

  function submit() {
    if (!value.trim()) return;
    onAddcomment(null, value.trim(), spoiler);
    setValue("");
    setSpoiler(false);
  }

  return (
    <div className="dc-comments">
      <div className="dc-eyebrow dc-eyebrow--small">
        <span>Comments</span>
      </div>

      <div className="dc-comment-form">
        <textarea
          className="dc-field__input"
          rows={2}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add to the discussion..."
        />
        <div className="dc-comment-form__row">
          <label className="dc-spoiler-toggle dc-spoiler-toggle--small">
            <input type="checkbox" checked={spoiler} onChange={(e) => setSpoiler(e.target.checked)} />
            <span>Spoiler</span>
          </label>
          <button type="button" className="dc-btn dc-btn--primary dc-btn--small" onClick={submit}>
            Reply
          </button>
        </div>
      </div>

      <div className="dc-comment-list">
        {comments.map((c) => (
          <CommentThread key={c.id} comment={c} depth={0} onAddcomment={onAddcomment} onLikeComment={onLikeComment} />
        ))}
      </div>
    </div>
  );
}

/* ── Post card ───────────────────────────────────────────────── */

function PostCard({ post, expanded, onToggleExpand, onLike, onBookmark, onShare, onAddcomment, onLikeComment }) {
  const [spoilerRevealed, setSpoilerRevealed] = useState(false);
  const [quickComment, setQuickComment] = useState("");
  const totalComments = countComments(post.comments);
  const showAttachments = post.spoiler ? spoilerRevealed : true;

  function submitQuickComment() {
    if (!quickComment.trim()) return;
    onAddcomment(null, quickComment.trim(), false);
    setQuickComment("");
    if (!expanded) onToggleExpand();
  }

  return (
    <article className="dc-post-card">
      <div className="dc-post-card__head">
        <div className="dc-avatar" style={{ background: post.author.avatarColor }}>
          {initialsOf(post.author.name)}
        </div>
        <div className="dc-post-card__meta">
          <span className="dc-post-card__author">{post.author.name}</span>
          <span className="dc-post-card__time">{timeAgo(post.timestamp)}</span>
        </div>
        <span className="dc-chip">{post.bookTag}</span>
      </div>

      <h3 className="dc-post-card__title" onClick={onToggleExpand}>
        {post.title}
      </h3>

      {post.spoiler && !spoilerRevealed ? (
        <button type="button" className="dc-spoiler-block" onClick={() => setSpoilerRevealed(true)}>
          <span>⚠ Spoiler warning — click to reveal</span>
        </button>
      ) : (
        <div
          className={`dc-post-card__content ${!expanded ? "dc-post-card__content--clamped" : ""}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}

      {post.image && showAttachments && (
        <div className="dc-post-card__image">
          <img src={post.image} alt="" />
        </div>
      )}
      {post.gif && showAttachments && (
        <div className="dc-post-card__gif" style={{ background: post.gif.gradient }}>
          <span>
            {post.gif.emoji} {post.gif.label}
          </span>
        </div>
      )}

      <div className="dc-post-card__actions">
        <button
          type="button"
          className={`dc-action-btn ${post.likedByMe ? "dc-action-btn--active" : ""}`}
          onClick={onLike}
        >
          ▲ {post.likes}
        </button>
        <button type="button" className="dc-action-btn" onClick={onToggleExpand}>
          💬 {totalComments}
        </button>
        <button
          type="button"
          className={`dc-action-btn ${post.bookmarked ? "dc-action-btn--active" : ""}`}
          onClick={onBookmark}
        >
          {post.bookmarked ? "🔖" : "📑"} Save
        </button>
        <button type="button" className="dc-action-btn" onClick={onShare}>
          ⇪ Share
        </button>
      </div>

      {!expanded && (
        <div className="dc-quick-comment">
          <input
            className="dc-quick-comment__input"
            value={quickComment}
            onChange={(e) => setQuickComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitQuickComment()}
            placeholder="Add a comment..."
          />
          <button type="button" className="dc-btn dc-btn--outline dc-btn--small" onClick={submitQuickComment}>
            Post
          </button>
        </div>
      )}

      {expanded && <CommentSection comments={post.comments} onAddcomment={onAddcomment} onLikeComment={onLikeComment} />}
    </article>
  );
}

/* ── Composer Modal ──────────────────────────────────────────── */

function PostComposerModal({ onSubmit, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="dc-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dc-modal-box" role="dialog" aria-modal="true" aria-label="Create post">
        <div className="dc-modal-box__header">
          <h2>New Discussion</h2>
          <button type="button" className="dc-modal-box__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="dc-modal-box__body">
          <PostComposer onSubmit={onSubmit} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */

export default function DiscussionPage() {
  const [posts, setPosts] = useState(seedPosts());
  const [expandedId, setExpandedId] = useState(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const visiblePosts = posts.filter((p) =>
    p.bookTag.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }

  function toggleLikePost(id) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likedByMe: !p.likedByMe, likes: p.likes + (p.likedByMe ? -1 : 1) } : p))
    );
  }

  function toggleBookmark(id) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p)));
  }

  function handleShare(post) {
    const url = `https://folio.club/discussions/${post.id}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => showToast("Link copied to clipboard"))
        .catch(() => showToast(url));
    } else {
      showToast(url);
    }
  }

  function addPost(newPost) {
    setPosts((prev) => [newPost, ...prev]);
    setComposerOpen(false);
    showToast("Discussion posted");
  }

  function addcomment(postId, parentId, content, spoiler) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const newComment = {
          id: nextId(),
          author: { name: "You", avatarColor: AVATAR_COLORS[0] },
          timestamp: new Date(),
          content,
          spoiler,
          likes: 0,
          likedByMe: false,
          replies: [],
        };
        if (!parentId) {
          return { ...p, comments: [...p.comments, newComment] };
        }
        function insert(list) {
          return list.map((c) => {
            if (c.id === parentId) return { ...c, replies: [...c.replies, newComment] };
            return { ...c, replies: insert(c.replies) };
          });
        }
        return { ...p, comments: insert(p.comments) };
      })
    );
  }

  function toggleLikeComment(postId, commentId) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        function walk(list) {
          return list.map((c) => {
            if (c.id === commentId) return { ...c, likedByMe: !c.likedByMe, likes: c.likes + (c.likedByMe ? -1 : 1) };
            return { ...c, replies: walk(c.replies) };
          });
        }
        return { ...p, comments: walk(p.comments) };
      })
    );
  }

  return (
    <div className="dc-page">
      <a href="/" className="dc-back-logo">
        ← Back to Home
      </a>
      <div className="dc-container">
        <header className="dc-header">
          <div className="dc-eyebrow">
            <span>◉ Feed</span>
          </div>
          <div className="dc-header__row">
            <h1>Share your thoughts</h1>
            <button className="dc-btn dc-btn--primary" onClick={() => setComposerOpen(true)}>
              + Create Post
            </button>
          </div>
          <p className="dc-header__sub">Thoughts, theories, and spoiler-tagged rants from the shelf.</p>

          <div className="dc-search">
            <span className="dc-search__icon">⌕</span>
            <input
              className="dc-search__input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussions by book title..."
            />
            {searchQuery && (
              <button type="button" className="dc-search__clear" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>
        </header>

        {visiblePosts.length === 0 ? (
          <div className="dc-empty">
            <span className="dc-empty__icon">◈</span>
            <p>No discussions found for &ldquo;{searchQuery}&rdquo;.</p>
          </div>
        ) : (
        <div className="dc-feed">
          {visiblePosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              expanded={expandedId === post.id}
              onToggleExpand={() => setExpandedId(expandedId === post.id ? null : post.id)}
              onLike={() => toggleLikePost(post.id)}
              onBookmark={() => toggleBookmark(post.id)}
              onShare={() => handleShare(post)}
              onAddcomment={(parentId, content, spoiler) => addcomment(post.id, parentId, content, spoiler)}
              onLikeComment={(commentId) => toggleLikeComment(post.id, commentId)}
            />
          ))}
        </div>
        )}
      </div>

      {composerOpen && <PostComposerModal onSubmit={addPost} onClose={() => setComposerOpen(false)} />}

      {toast && <div className="dc-toast">{toast}</div>}
    </div>
  );
}