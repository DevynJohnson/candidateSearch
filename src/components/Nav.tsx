import { Link, useLocation } from 'react-router-dom';


const Nav = () => {
  const currentPage = useLocation().pathname;
  // TODO: Add necessary code to display the navigation bar and link between the pages
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
