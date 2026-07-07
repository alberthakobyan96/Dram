import { createBrowserRouter } from "react-router-dom";

import Layout from "./layout";

import HomePage from "../pages/Home";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);