import { createBrowserRouter } from "react-router-dom";


import { MainLayout } from "../layouts/MainLayout";
import { PrincipalPage } from "../pages/PrincipalPage";
import { BoardPage } from "../pages/BoardPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <PrincipalPage /> },
      {path: "board", element: <BoardPage /> },
    ],
  },
]);
