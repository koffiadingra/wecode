import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { FidelesList } from "./components/FidelesList";
import { Presences } from "./components/Presences";
import { Statistiques } from "./components/Statistiques";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "dashboard", Component: Dashboard },
      { path: "fideles", Component: FidelesList },
      { path: "presences", Component: Presences },
      { path: "statistiques", Component: Statistiques },
    ],
  },
]);