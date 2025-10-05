import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
    <Home />
    </BrowserRouter>
  );
};

export default App;
