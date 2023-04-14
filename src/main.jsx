import React from 'react'
import ReactDOM from 'react-dom/client'
import Navibar from './Navibar'
import Footer from './Footer'
import Home from './Pages/Home'
import NewArrival from './Pages/New-Arrival'
import Movie from './Pages/Movie'
import Animation from './Pages/Animation'
import JPAnime from './Pages/JP-Anime'
import Page404 from './Pages/404Page'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Navibar />
      <Outlet />
      <Footer />
    </>,
    // errorElement: <Page404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new-arrival",
        element: <NewArrival />,
      },
      {
        path: "/movie",
        element: <Movie />,
      },
      {
        path: "/animation",
        element: <Animation />,
      },
      {
        path: "/jp-anime",
        element: <JPAnime />,
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)