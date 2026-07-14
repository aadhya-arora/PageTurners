import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import SignUp from "./pages/signUp";
import UserProfile from "./pages/userProfile";
import BookPage from "./pages/bookPage";
import ClubsPage from "./pages/clubsPage";
import ClubDetailsPage from "./pages/clubDetailsPage";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;