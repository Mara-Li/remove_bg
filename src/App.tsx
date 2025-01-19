import type React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import {App as RemoveBGApp} from "./remove_bg/src/App.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/remove_bg" element={<RemoveBGApp />} />
      </Routes>
    </Router>
  );
};

export default App;
