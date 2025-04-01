import './App.css'
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Favoutite from './components/Favourite'
function App() {
  const route = createBrowserRouter(
    [
      {
        path:"/",
        element: <Layout/>,
        children: [
          {
            path: "",
            element: <Home/>
          },
          {
            path: "fav",
            element: <Favoutite/>
          }
        ]
      }
    ]
  )
  return (
    <>
      <RouterProvider router={route} />

    </>
  )
}

export default App
