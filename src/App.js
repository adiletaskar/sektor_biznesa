import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./routes/Home";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/posts/:page" element={<Home />} />
        <Route path="/" element={<Navigate to="/posts/1" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
