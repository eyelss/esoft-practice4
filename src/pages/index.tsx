import type { JSX } from "react";
import Home from "./home";
import Book from "./book";
import Settings from "./settings";
import NotFound from "./404";

type PageRoute = {
  path: string;
  title: string;
  component: (props: unknown) => JSX.Element;
  // Hide from navigaton panel
  hide?: boolean;
}

const pagesExport: PageRoute[] = [
  { path: '/', title: 'Home', component: Home },
  { path: '/settings', title: 'Settings', component: Settings },
  { path: '/book/:id', title: 'Book', component: Book, hide: true },
  { path: '*', title: '404', component: NotFound, hide: true },
] 

export default pagesExport;