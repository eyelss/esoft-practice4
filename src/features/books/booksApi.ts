import jsonGoogleBooks from "./google-books.json";

/**
 * Fake book API
 */

export type BookType = {
  id: string;
  author?: string;
  isbn: string;
  title: string;
  description?: string;
  pubYear?: number;
  imgUrl?: string;
};

export const getBooks = (): BookType[] => {
  return jsonGoogleBooks.items.map(item => {
    const pubDate = item.volumeInfo.publishedDate;
    
    const author = item.volumeInfo.authors !== undefined ?
      item.volumeInfo.authors[0] : undefined;

    return {
      id: item.id,
      author,
      isbn: `${item.volumeInfo.industryIdentifiers[0].type}:${item.volumeInfo.industryIdentifiers[0].identifier}`,
      title: item.volumeInfo.title,
      description: item.volumeInfo.description,
      pubYear: pubDate ? new Date(pubDate).getFullYear() : undefined,
      imgUrl: item.volumeInfo.imageLinks?.thumbnail,
    }
})};