import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import "./Book.css";
import { useAppSelector } from "../../store";
import { selectBook } from "../../features/books/booksSelectors";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";

export type TextSize = 'small' | 'medium' | 'large';
export type TextColor = 'black' | 'sepia' | 'dark blue';
export type TextBold = 'true' | 'false';

const SIZES: TextSize[] = ['small', 'medium', 'large'] as const;
const COLORS: TextColor[] = ['black', 'dark blue', 'sepia'] as const;

export type TextSettings = {
  size: TextSize;
  color: TextColor;
  isBold: TextBold;
};

const defaultTextSettings: TextSettings = {
  size: localStorage.getItem('bookTextSize') as TextSize ?? 'medium',
  color: localStorage.getItem('bookTextColor') as TextColor ?? 'dark blue',
  isBold: localStorage.getItem('bookTextIsBold') as TextBold ?? 'false',
};

const fontSizesDict: Record<TextSize, string> = {
  'small': '0.8rem',
  'medium': '1.0rem',
  'large': '1.3rem',
} as const;

const fontColorsDict: Record<TextColor, string> = {
  'black': '#121212',
  'sepia': '#d2b48c',
  'dark blue': '#001f3f',
} as const;

const convertSettings = ({ size, color, isBold }: TextSettings): React.CSSProperties => {
  return {
    fontSize: fontSizesDict[size],
    color: fontColorsDict[color],
    fontWeight: isBold === 'true' ? 'bold' : 'normal',
  };
}

const lorem = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi laboriosam reiciendis dolore minus dolorem pariatur exercitationem aliquid molestiae voluptas reprehenderit quisquam numquam unde, qui eveniet iure expedita quasi commodi architecto?';

function Book() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    throw new Error('ID was not found'); 
  }
  
  const book = useAppSelector(state => selectBook(state, { id }))
  
  const [isBold, setIsBold] = useState(defaultTextSettings.isBold === 'true');
  const [fontSize, setFontSize] = useState(defaultTextSettings.size);
  const [color, setColor] = useState(defaultTextSettings.color);

  if (!book) {
    return <Navigate to='/404' replace/>
  }

  return (
    <div className="book">
      <div className="book-header">
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
      </div>
      <div 
        className="book-content border rounded shadow-sm bg-light bg-gradient"
        style={convertSettings({ size: fontSize, color, isBold: isBold ? 'true' : 'false' })}
      >
        <p>{lorem}</p>
        <p>{lorem}</p>
        <p>{lorem}</p>
      </div>
      <div className="book-footer d-flex justify-content-between">
        <b>{book.pubYear}</b>
        <b>{book.isbn}</b>
      </div>
      <form className="book-settings">
        <div className="mb-3">
          <label htmlFor="size" className="form-label">Size:</label>
          <Dropdown
            value={fontSize}
            onChange={(e) => setFontSize(e.value)}
            options={SIZES}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">Color:</label>
          <Dropdown
            value={color}
            onChange={(e) => setColor(e.value)}
            options={COLORS}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="is-bold" className="form-label">Is bold:</label>
          <Checkbox
            checked={isBold}
            onChange={() => setIsBold(isBold => !isBold)}
          />
        </div>
      </form>
    </div>
  );
}

export default Book;