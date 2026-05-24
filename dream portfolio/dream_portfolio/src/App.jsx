import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import React, { lazy, Suspense } from 'react';

const Home = lazy(() => import("./components/Home"));
const Favourite = lazy(() => import("./components/Favourite"));

const PageSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
              <Suspense fallback={<PageSpinner />}>
                <Home />
              </Suspense>
            )
          },
          {
            path: "fav",
            element: (
              <Suspense fallback={<PageSpinner />}>
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
