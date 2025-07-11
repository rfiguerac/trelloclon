import { createBrowserRouter } from "react-router-dom";


import { MainLayout } from "../layouts/MainLayout";
import { PrincipalPage } from "../pages/PrincipalPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <PrincipalPage /> },
    ],
  },
]);
