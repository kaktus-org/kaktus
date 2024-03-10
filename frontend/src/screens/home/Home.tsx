import React, { useState } from 'react';
import api from 'api/axiosConfig';

const Home = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        console.log('Submitting email:', email);
        const response = await api.post('/subscribe/', { email });
        console.log('Sent succesfully, response: ', response);
        setEmail('');
        setEmailError('');
      } catch (error) { 
        console.log('Error submitting email: ', error);
      }
    } else {
      console.log("Email invalid");
      setEmailError('Please enter a valid email address.');
    }
  };

  const handleChange = (e: any) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  interface FeatureProps {
    title: string;
    description: React.ReactNode;
  }

  const Feature = ({ title, description }: FeatureProps) => (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded overflow-hidden shadow-lg m-4 p-6">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <div className="text-gray-700 text-base">{description}</div>
    </div>
  );

  return (
    <div>
      <header className="bg-hunterGreen text-white font-bold">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6 relative">
          <div className="text-4xl md:mx-0 md:relative flex-grow md:flex-grow-0">
            <span className="hidden md:inline select-none">Kaktus</span>
            <span className="md:hidden absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"><a href="/">Kaktus</a></span>
          </div>
        </nav>
      </header>

      <div className="flex flex-col md:flex-row justify-center items-center md:items-start p-10 mb-10 mt-40">
        <div className="text-center md:text-left bg-hunterGreen text-white p-10 md:max-w-2xl rounded-lg shadow-xl">
          <h1 className="text-6xl font-bold mb-2">Welcome to Kaktus</h1>
          <p className="text-2xl font-bold mb-4">Personal Finance, Done Right.</p>
          <p className="text-xl mb-8">We need your help to build the best experience possible. Join us and shape the future of free, comprehensive personal finance.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 md:mt-0 md:ml-10 w-full max-w-lg p-10 bg-white rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-8">Sign up for Early Access</h2>
          <label htmlFor="email" className="block mb-4 text-gray-700 text-lg">Email Address:</label>
          <input
            type="text"
            id="email"
            name="email"
            className={`w-full p-4 mb-2 rounded-lg text-lg text-gray-700 ${emailError ? 'border-red-500' : ''}`}
            placeholder="you@example.com"
            value={email}
            onChange={handleChange}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          <button type="submit" className="mt-4 w-full bg-hunterGreen hover:bg-britishRacingGreen text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 ease-in-out">
            Join our Beta
          </button>
          <p className="mt-6 text-sm text-gray-600">We respect your privacy. Unsubscribe at any time.</p>
        </form>
      </div>

      <div className="flex justify-center items-stretch flex-wrap m-4 mt-0">
        <Feature
          title="Everything, All-in-One"
          description={
            <div className="flex flex-col h-full">
              <p className="mb-4">Streamline and simplify your personal finance management with one comprehensive platform.</p>
              <ul className="list-disc list-inside flex-grow">
                <li>Transactions</li>
                <li>Budgeting</li>
                <li>Tax management</li>
                <li>Salary insights</li>
                <li>Mortgages</li>
                <li>Debts</li>
                <li>And more!</li>
              </ul>
            </div>
          }
        />
        <Feature
          title="Unmatched Security"
          description={
            <div className="flex flex-col h-full">
              <p className="mb-4">Experience top-tier security with Kaktus, where protecting your financial information is our utmost priority.</p>
              <ul className="list-disc list-inside flex-grow">
                <li>Strict compliance with industry standards</li>
                <li>Advanced data protection measures</li>
                <li>Continuous security monitoring</li>
              </ul>
            </div>
          }
        />
        <Feature
          title="No Sign-up Fees"
          description={
            <div className="flex flex-col h-full">
              <p className="mb-4">Get started with Kaktus without any upfront costs, empowering your financial journey from day one.</p>
              <ul className="list-disc list-inside flex-grow">
                <li>Free access to core features</li>
                <li>No initial sign-up fees</li>
                <li>Transparent pricing for advanced features</li>
              </ul>
            </div>
          }
        />
      </div>


    </div>
  );
};

export default Home;
