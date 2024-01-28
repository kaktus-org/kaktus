import { PairBankButton } from "components/openBanking/OpenBanking";
import { RePairBankButton } from "components/openBanking/OpenBanking";
import "./Home.css"


const Home = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <div className="welcome-content">
          <div className="welcome-text">
            <h1 className="text-5xl font-bold mb-4">Welcome to Kaktus</h1>
            <p className="text-lg mb-6">Transforming Your Financial Experience</p>
            <a href="/register" className="btn btn-primary bg-burntOrange mx-auto px-4 py-1 rounded hover:bg-lightBlue transition-colors duration-300 inline-block">Get Started</a>
          </div>
          <div className="welcome-image">
            <img
              src="https://via.placeholder.com/400"
              alt="Welcome Illustration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </header>

      <section className="feature-section">
        <div className="welcome-content">
          <h2 className="text-3xl font-bold mb-4">Why Kaktus?</h2>
          <p className="text-lg mb-6">
            Our state-of-the-art personal banking platform offers a range of features to
            enhance your financial journey. Experience the future of banking with Kaktus.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div className="welcome-content">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">
            Join thousands of users who have already transformed their financial
            experience with Kaktus.
          </p>
          <a href="/register" className="btn btn-primary bg-burntOrange mx-auto px-4 py-1 rounded hover:bg-lightBlue transition-colors duration-300 inline-block">Create Your Account</a>
        </div>
      </section>

      <footer className="welcome-footer">
        <div className="welcome-content">
          <p className="text-sm">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home