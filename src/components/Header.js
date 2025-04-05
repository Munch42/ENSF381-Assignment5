import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <>
    <header>
        <img src={require('../images/logo.jpg')} alt="LMS Logo" height="100" width="100" />
        <h1>LMS - Learning Management System</h1>
    </header>
    <div id="nav">
        <a onClick={() => navigate("/")}>Home</a><a onClick={() => navigate("/courses")}>Courses</a><a onClick={() => navigate("/login")}>Login</a>
    </div>
    </>
  );
}

export default Header;
