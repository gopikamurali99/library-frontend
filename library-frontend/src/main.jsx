import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactDOM from "react-dom/client";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Home, { loader as HomeLoader }from "./routes/home";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import Author,{loader as AuthorLoader} from './routes/Author';
import Book,{loader as BookLoader} from './routes/Book';
import SignIn, { loader as signInLoader } from "./routes/signin";
import SignUp,{ loader as signUpLoader } from "./routes/signup";



const router = createBrowserRouter([
  {
    path: "/",
    element:  <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
       element: <Home />,
       loader:HomeLoader,
      },
      {
        path:"/authors",
        element:<Author/>,
        loader:AuthorLoader,
      },
      {
        path:"/books",
        element:<Book/>,
        loader:BookLoader
      },
      {
        path:"/signin",
        element:<SignIn/>,
        loader:signInLoader
      },
      {
        path:"/signup",
        element:<SignUp/>,
        loader:signUpLoader
      }
    ],
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>,
)
