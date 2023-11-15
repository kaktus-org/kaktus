import Header from "components/Header";
import "./App.css";
import { Layout } from "components/Layout";
import { Routes, Route } from "react-router-dom";
import { Home } from "screens/home";
import RegistrationForm from "screens/signup/Signup";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
