import Header from "components/Header";
import "./App.css";
import { Layout } from "components/Layout";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, TransactionsPage, RegistrationForm, LoginPage, UsersPage, DashboardPage } from "screens";
import SecureRoute from "SecureRoute";
import AdminHeader from "components/AdminHeader";
import Dashboard from "screens/admin/dashboard/Dashboard";
import Users from "screens/admin/users/Users";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {isAdminRoute ? <AdminHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Admin Routes */}
          <Route element={<SecureRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
