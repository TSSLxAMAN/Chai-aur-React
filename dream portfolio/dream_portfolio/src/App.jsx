import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import React, { lazy, Suspense } from 'react';

const Home = lazy(() => import("./components/Home"));
const Favourite = lazy(() => import("./components/Favourite"));

function App() {
  const route = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<div>Loading Home...</div>}>
                <Home />
              </Suspense>
            )
          },
          {
            path: "fav",
            element: (
              <Suspense fallback={<div>Loading Favourites...</div>}>
                <Favourite />
              </Suspense>
            )
          }
        ]
      }
    ]
  );

  return <RouterProvider router={route} />;
}

export default App;
