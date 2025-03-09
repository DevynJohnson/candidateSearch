import { Link, useLocation } from 'react-router-dom';



const Nav = () => {
  const currentPage = useLocation().pathname;
  return (
    <nav>
      <ul>
        <li>
          <Link className={currentPage === "/" ? "active" : ""} to="/">Home</Link>
        </li>
        <li>
          <Link className={currentPage === "/SavedCandidates" ? "active" : ""} to="/SavedCandidates">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
