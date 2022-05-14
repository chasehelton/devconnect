import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";

export default function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Home />}
      />
    </Routes>
  );
}
