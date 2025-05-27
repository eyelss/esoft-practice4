import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

import pages from "..";
import bookLogo from "../../assets/book.svg";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleTheme } from "../../features/theme/themeSlice";
import { selectFavoritesCount } from "../../features/favorites/favoritesSelectors";
import { setQuery } from "../../features/search/searchSlice";
import { selectTheme } from "../../features/theme/themeSelectors";

import "./NavComponent.css";

function NavComponent() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const location = useLocation();
  const navigate = useNavigate();
  const favCount = useAppSelector(selectFavoritesCount);
  const [params] = useSearchParams();

  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-start">
      <Navbar.Brand><img src={bookLogo}/></Navbar.Brand>
      <Nav variant="tabs" defaultActiveKey={location.pathname}>
        {pages.filter(page => !page.hide).map(page => 
          <Nav.Item key={page.path}>
            <Link
              key={page.path} 
              className="nav-link" to={{
              pathname: page.path,
            }}>{page.title}
            </Link>
          </Nav.Item>
        )}
      </Nav>
      <form 
        className="d-flex"
        action={(formData) => {
          const query = formData.get('query')?.toString();
          dispatch(setQuery(query));
          
          const paramsSearch = new URLSearchParams(params);
          
          if (query) {
            paramsSearch.set('search', query);
          } else {
            paramsSearch.delete('search');
          }

          navigate({
            pathname: '/',
            search: paramsSearch.toString(),
          })
        }}
      >
        <input 
          className="form-control mx-2" 
          name="query"
          type="search"
          placeholder="search"
          aria-label="search"
        />
        <button
          className="btn btn-outline-success"
          type="submit"
        >Search</button>
      </form>
      <i className="pi pi-heart mx-2">{favCount}</i>
      <i className="theme-toggler mx-2" onClick={() => dispatch(toggleTheme())}>{theme === 'dark' ? '☀️' : '🌙'}</i>
    </Navbar>
  )
}

export default NavComponent;