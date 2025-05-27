import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button"
import { Slider } from "primereact/slider";
import { ToggleButton } from "primereact/togglebutton";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectAuthors } from "../../features/books/booksSelectors";
import { useNavigate } from "react-router-dom";
import { clearFilters, setFilter } from "../../features/filter/filterSlice";
import { selectFilter } from "../../features/filter/filterSelectors";

const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear();

function Filter() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authors = useAppSelector(selectAuthors);
  const filter = useAppSelector(selectFilter);

  const [show, setShow] = useState(false);

  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(filter.authors ?? []);
  const [selectedRange, setSelectedRange] = useState<[number, number]>(filter.yearRange ?? [MIN_YEAR, MAX_YEAR]);
  const [selectedOnlyFavs, setSelectedOnlyFavs] = useState<boolean>(filter.onlyFavorites ?? false);

  return (
    <>
      <Offcanvas
        show={show}
        placement="start"
        className="custom-offcanvas"
      >
        <div className="position-relative h-100">
          <button 
            className="floating-toggle-btn"
            onClick={() => setShow(false)}
          >
          ☰
          </button>
          <Offcanvas.Header>
            <h3>Filters</h3>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="nav nav-pills nav-fill flex-column">
              <MultiSelect 
                value={selectedAuthors} 
                onChange={(e) => {
                  setSelectedAuthors(() => e.value as string[])
                }} 
                options={authors}
                placeholder="Select authors"
                className="w-full md:w-20rem"
              />
              <label className="mt-3">Year range: {selectedRange[0]}-{selectedRange[1]}</label>
              <Slider
                className="my-2 mb-4"
                value={selectedRange}
                min={MIN_YEAR}
                max={MAX_YEAR}
                onChange={(e) => setSelectedRange(e.value as [number, number])} range
              />
              <div className="mb-4">
                <label className="me-2">Only favorites: </label>
                <ToggleButton checked={selectedOnlyFavs} onChange={() => setSelectedOnlyFavs(isOnlyFavs => !isOnlyFavs)}/>
              </div>
              <Button className="my-3" icon="pi pi-search" onClick={() => {
                const params = new URLSearchParams();
                
                selectedAuthors
                  .map((authorName) => ['author', authorName])
                  .forEach((pair) => params.append(...(pair as ['author', string])));
                
                const [minYear, maxYear] = selectedRange;

                if (minYear !== MIN_YEAR || maxYear !== MAX_YEAR) {
                  params.append('minYear', minYear.toFixed());
                  params.append('maxYear', maxYear.toFixed());
                }

                if (selectedOnlyFavs){
                  params.append('favorites', 'true');
                }

                dispatch(setFilter({
                  authors: selectedAuthors.length !== 0 ? selectedAuthors : undefined,
                  yearRange: minYear !== MIN_YEAR || maxYear !== MAX_YEAR ? [minYear, maxYear] : undefined,
                  onlyFavorites: selectedOnlyFavs,
                }))

                navigate({
                  pathname: '/',
                  search: params.toString(),
                });
              }}>Search</Button>
              <Button
                onClick={() => dispatch(clearFilters())}
              >
                Clear
              </Button>
            </div>
          </Offcanvas.Body>
        </div>
      </Offcanvas>

      {!show && (
        <button
          className="floating-toggle-btn"
          onClick={() => setShow(true)}
          style={{ left: 0 }}
        >
          ☰
        </button>
      )}
    </>
  );
}

export default Filter;