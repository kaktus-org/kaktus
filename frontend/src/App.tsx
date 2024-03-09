import "./App.css";
import { Layout } from "components/Layout";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "screens";

function App() {
  const location = useLocation();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
