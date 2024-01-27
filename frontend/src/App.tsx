import Header from "components/Header";
import "./App.css";
import { Layout } from "components/Layout";
import { Routes, Route } from "react-router-dom";
import UsersPage from "screens/users/Users";
import { Home } from "screens/home";
import RegistrationForm from "screens/signup/Signup";
import LoginPage from "screens/login/Login";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
