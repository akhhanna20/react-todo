import "./app.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TableChooser from "./TableChooser";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> {}
        <Link to="/new">New</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TableChooser />} />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
