import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to='/'>
      <h1 className='header'>☕️ Cap Hill Coffee ☕️</h1>
    </Link>
  );
};

export default Header;
