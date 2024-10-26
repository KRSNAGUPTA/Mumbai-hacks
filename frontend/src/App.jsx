import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
const Home = lazy(() => import("./page/Home.jsx"));
const CaseDocumentsPage = lazy(() => import("./page/caseDocumentsPage.jsx"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case" element={<CaseDocumentsPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
