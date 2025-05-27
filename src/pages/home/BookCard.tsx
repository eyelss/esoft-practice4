import { Card } from "react-bootstrap";
import type { BookType } from "../../features/books/booksApi";
import HeartCheckbox from "./HeartCheckbox";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectFavorites } from "../../features/favorites/favoritesSelectors";
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice";

const PLACEHOLDER_URL = "https://imgholder.ru/323x300/8493a8/adb9ca&text=Обложки+нет+и+не+будет!&font=kelson";

type BookCardProps = {
  book: BookType
};

function BookCard({ book }: BookCardProps) {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(selectFavorites);

  return (
    <Card className="h-100 mx-3">
      <Card.Header className="d-flex">
        <b className="flex-grow-1">{book.author ?? '///'}</b>
        <HeartCheckbox 
          checked={favorites.includes(book.id)}
          callback={status => {
            if (status) {
              dispatch(addFavorite(book.id));
            } else {
              dispatch(removeFavorite(book.id));
            }
          }}
        />
      </Card.Header>
      <a href={`/book/${book.id}`}>
        <Card.Img
          variant="top" 
          aria-placeholder="book img"
          src={book.imgUrl ?? PLACEHOLDER_URL}
        />
      </a>
      <Card.Body>
        <Card.Title>
          {book.title}
        </Card.Title>
        <Card.Text>
          {book.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>{book.pubYear ?? '///'}</Card.Footer>
    </Card>
  );
}

export default BookCard;