import Header from "components/Header";
import "./App.css";
import { Layout } from "components/Layout";
import { Routes, Route } from "react-router-dom";
import { Home } from "screens/home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
