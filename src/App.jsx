import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import SignUp from "./pages/signUp";
import UserProfile from "./pages/userProfile";
import BookPage from "./pages/bookPage";
import ClubsPage from "./pages/clubsPage";
import ClubDetailsPage from "./pages/clubDetailsPage";
import DiscussionPage from "./pages/discussionPage";
import BooksLibrary from './pages/bookLibrary';
import ArchivePage from './pages/archivePage';
import MyClubs from './pages/myClubs';
import ChatPage from './pages/chatPage';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/book/:bookId" element={<BookPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/clubs/:clubId" element={<ClubDetailsPage />} />
        <Route path="/discussions" element={<DiscussionPage />} />
        <Route path="/discussion/:discussionId" element={<DiscussionPage />} />
        <Route path="/library" element={<BooksLibrary />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/myclubs" element={<MyClubs />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;