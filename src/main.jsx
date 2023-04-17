import React from 'react'
import ReactDOM from 'react-dom/client'
import Navibar from './Navibar'
import TrendingTV from './Pages/TrendingTV'
import TrendingMovie from './Pages/TrendingMovie'
import Footer from './Footer'
import Page404 from './Pages/404Page'
import SignIn from './Pages/SignIn'
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
        element: <TrendingMovie />,
      },
      {
        path: "/TrendingTV",
        element: <TrendingTV />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)