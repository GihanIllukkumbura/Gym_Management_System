import React from "react";
import { Link } from "react-router-dom";
import AboutImage from "../../src/assets/about.jpg";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">
              Get Stronger. Get Fitter. Get Results.
            </h1>
            <p className="text-center mb-8">
              Transform your body at our state-of-the-art gym. Unleash your
              potential today!
            </p>
            <div className="text-center">
              <Link to="/register" className="btn btn-primary">
                Join Now
              </Link>
            </div>
          </div>
        </section>

        <AboutSection />
        <PricingSection />
        <ContactSection />
        {/* <LoginRegister /> */}
      </main>
      <footer className="bg-gray-800 text-white py-6 text-center">
        &copy; {new Date().getFullYear()} Power Gym
      </footer>
    </div>
  );
};

export default HomePage;

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
      </div>
      <div className="flex justify-center">
        <div className="flex-col justify-center items-center">
          <div className="mb-4">
            <i className="fas fa-map-marker-alt text-xl mr-2"></i>
            <span>Address: 123 Main Street, Galle road, Colombo</span>
          </div>
          <div className="mb-4">
            <i className="fas fa-phone-alt text-xl mr-2"></i>
            <span>Phone: +94 777 123 454 </span>
          </div>
          <div>
            <i className="fas fa-envelope text-xl mr-2"></i>
            <span>Email: contact@powergym.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="font-bold text-xl">
          Power Gym
        </a>
        <ul className="flex space-x-6">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <Link to="/register" className="btn btn-primary border-2 border-none">
            Sign up
          </Link>
          <Link to="/login" className="btn btn-primary border-2 border-none">
            Login
          </Link>
        </ul>
      </div>
    </nav>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">About Our Gym</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={AboutImage}
              alt="Gym Equipment"
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
            <p>
              Share a captivating narrative about how your gym came to be. Was
              it founded out of passion for fitness? A desire to serve the
              community? Highlight your gym's unique origins and what fueled its
              creation.
            </p>

            <h3 className="text-2xl font-semibold mb-4 mt-6">Our Facilities</h3>
            <p>
              Go beyond a simple text description. Paint a picture of your gym:
            </p>
            <ul className="list-disc ml-6">
              <li>Spacious workout areas with state-of-the-art equipment</li>
              <li>
                Dedicated zones for cardio, strength training, and functional
                fitness
              </li>
              <li>Clean and well-maintained locker rooms</li>
              <li>Inviting social spaces (if applicable)</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4 mt-6">Our Team</h3>
            <p>
              Emphasize the people behind your gym: "Our team of certified
              trainers and friendly staff are passionate about helping you reach
              your fitness goals. We'll create a personalized plan, provide
              guidance, and motivate you every step of the way."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-gray-100 py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Choose Your Plan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pricing Card 1 - Basic */}
          <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105 border-4 border-gray-300">
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded inline-block mb-3">
              Lite
            </span>
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-gray-600 text-center mb-4">
              <span className="text-4xl font-bold">Rs.3000</span>/month
            </p>

            <ul className="text-gray-600 mb-6">
              <li className="flex items-center space-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Access to gym equipment</span>
              </li>
              <li className="flex items-center space-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Group fitness classes</span>
              </li>
              <li className="flex items-center space-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-400 line-through">
                  Personal training sessions
                </span>
              </li>{" "}
            </ul>
            <Link
              to="/register"
              className="btn btn-primary border-2 border-green-400 rounded p-2 px-4 hover:bg-green-400 hover:text-white"
            >
              Sign up
            </Link>
          </div>

          {/* Pricing Card 2 - Standard (Popular) */}
          <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105 border-4 border-gray-300">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded inline-block mb-3">
              Most Popular
            </span>
            <h3 className="text-2xl font-bold mb-4">Standard</h3>
            <p className="text-gray-600 text-center mb-4">
              <span className="text-4xl font-bold">Rs.5000</span>/month
            </p>

            <ul className="text-gray-600 mb-6">
              {/* Include all 'Basic' features (checkmarks) */}
              <li className="flex items-center space-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>One personal training session/month</span>
              </li>
              <li className="flex items-center space-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-400 line-through">
                  Exclusive member perks
                </span>
              </li>{" "}
              <li className="flex items-center space-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-400 line-through">
                  Nutrition counseling
                </span>
              </li>
            </ul>
            <Link
              to="/register"
              className="btn btn-primary border-2 border-green-400 rounded p-2 px-4 hover:bg-green-400 hover:text-white"
            >
              Sign up
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105 border-4 border-gray-300">
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded inline-block mb-3">
              Premium
            </span>
            <h3 className="text-2xl font-bold mb-4">Platinum</h3>
            <p className="text-gray-600 text-center mb-4">
              <span className="text-4xl font-bold">Rs.7500</span>/month
            </p>

            <ul className="text-gray-600 mb-6">
              {/* Include all 'Basic' & 'Standard' features (checkmarks) */}
              <li className="flex items-center space-x-2 mb-3">{/* ...  */}</li>
              <li className="flex items-center space-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Unlimited personal training sessions</span>
              </li>
              <li className="flex items-center space-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Nutrition counseling</span>
              </li>
              <li className="flex items-center space-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Exclusive member perks</span>
              </li>
            </ul>
            <Link
              to="/register"
              className="btn btn-primary border-2 border-green-400 rounded p-2 px-4 hover:bg-green-400 hover:text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
