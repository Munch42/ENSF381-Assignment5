import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginPage from "./components/LoginPage";
import CoursesPage from "./components/CoursesPage";
import SignupPage from "./components/SignupPage";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
