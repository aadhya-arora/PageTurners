import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import SignUp from "./pages/signUp";
import UserProfile from "./pages/userProfile";
import BookPage from "./pages/bookPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/book/:bookId" element={<BookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;