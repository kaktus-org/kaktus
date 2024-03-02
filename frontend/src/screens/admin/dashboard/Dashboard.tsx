import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-content">
        This is some ChatGPT content, we could perhaps have a  grafana style usage page showing key deployment stats once we go live.
        <section className="stats">
          <h2>Statistics</h2>
          {/* Example Statistic Cards */}
          <div className="stat-card">
            <p>Total Users</p>
            <p>123</p> {/* Dynamically fetch and display this data */}
          </div>
          <div className="stat-card">
            <p>Active Sessions</p>
            <p>67</p> {/* Dynamically fetch and display this data */}
          </div>
          {/* Add more stats as needed */}
        </section>

        <section className="management-links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/admin/users">Manage Users</a></li>
            {/* Add more links as needed for different admin functions */}
          </ul>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
