import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";

const App = () => {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/book/create", element: <CreateBook /> },
    { path: "/book/details/:id", element: <ShowBook /> },
    { path: "/book/edit/:id", element: <EditBook /> },
  ];

  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default App;
