import "./Home.css"


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header className="bg-blue-500 text-white text-center py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4">Welcome to Kaktus</h1>
            <p className="text-lg mb-6">Transforming Your Financial Experience</p>
            <a href="/register" className="btn btn-primary bg-burntOrange px-4 py-1 rounded hover:bg-lightBlue transition-colors duration-300">Get Started</a>
          </div>
          <div className="flex justify-center">
            <div className="w-full md:w-1/2">
              <img
                src="https://via.placeholder.com/400"
                alt="Welcome Illustration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gray-200 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Why Kaktus?</h2>
          <p className="text-lg mb-6 text-center">
            Our state-of-the-art personal banking platform offers a range of features to
            enhance your financial journey. Experience the future of banking with Kaktus.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Ready to Get Started?</h2>
          <p className="text-lg mb-6 text-center">
            Join thousands of users who have already transformed their financial
            experience with Kaktus.
          </p>
          <a href="/register" className="btn btn-primary bg-burntOrange px-4 py-1 rounded hover:bg-lightBlue transition-colors duration-300">Create Your Account</a>
        </div>
      </section>

      <footer className="bg-gray-800 text-white text-center py-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm">&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Home