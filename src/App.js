import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";

export default function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Home page={"UserList"} />}
      />
      {/* <Route path="/:username/messages" element={<Home page={"Messages"} />} /> */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
