import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import { setFilter } from "../../features/filter/filterSlice";
import { setQuery } from "../../features/search/searchSlice";
import { selectFavorites } from "../../features/favorites/favoritesSelectors";
import { selectBooks } from "../../features/books/booksSelectors";
import { selectSearch } from "../../features/search/searchSelectors";
import { selectFilter } from "../../features/filter/filterSelectors";
import BookCard from "./BookCard";
import Filter from "./Filter";
import "./Home.css";

const MemoBooksContainer = memo(() => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const query = useAppSelector(selectSearch);
  const filter = useAppSelector(selectFilter);
  const favorites = useAppSelector(selectFavorites);
  const [booksDisplay, setBooksDisplay] = useState(books);
  const [params] = useSearchParams();

  // useEffect for uploading url parameters to redux state.
  useEffect(() => {

    const authorsParam = params.getAll('author');
    const authors = authorsParam.length === 0 ? undefined : authorsParam;

    const minYearParam = params.get('minYear');
    const maxYearParam = params.get('maxYear');

    const yearRange: [number, number] | undefined = minYearParam && maxYearParam ? [parseInt(minYearParam), parseInt(maxYearParam)] : undefined;
    
    const onlyFavoritesParam = params.get('favorites');
    const onlyFavorites = onlyFavoritesParam !== null;

    const searchParam = params.get('search');
    if (searchParam) {
      dispatch(setQuery(searchParam));
    }

    dispatch(setFilter({
      authors,
      yearRange,
      onlyFavorites,
    }));
    
  }, [dispatch, params]);

  // useEffect for filtering displayed books by filter and query status
  useEffect(() => {

    setBooksDisplay(
      books.filter(book => {
        if (query === undefined || query === '') {
          return true;
        }

        return book.title.toLocaleLowerCase().includes(query.toLowerCase()) ||
        book.author?.toLocaleLowerCase().includes(query.toLowerCase())
      }).filter(book => {
        if (filter.authors === undefined) {
          return true;
        }

        return filter.authors.includes(book.author ?? '');
      }).filter(book => {
        if (!filter.onlyFavorites) {
          return true;
        }

        return favorites.includes(book.id);
      }).filter(book => {
        if (filter.yearRange === undefined) {
          return true;
        }

        if (book.pubYear === undefined) {
          return false;
        }

        const [min, max] = filter.yearRange;

        return book.pubYear <= max && book.pubYear >= min;
      }));
  }, [books, query, filter, favorites]);

  return (
    <div className="home">
      <Row className="row-cols-3 row-cols-lg-4 row-cols-xl-5 g-3">
        {booksDisplay.map((book) => (
          <Col key={book.id}>
            <BookCard book={book}/>
          </Col>
        ))}
      </Row>
    </div>
  );
});

function Home() {

  return (
    <>
      <Filter/>

      <MemoBooksContainer/>
    </>
  );
}
export default Home;