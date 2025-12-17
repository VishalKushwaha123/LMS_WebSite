import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import SocialIcons from "../SocialIcons";

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState("");

  const handleSubscribe = () => {
    if (!subscribeEmail) {
      alert("Please enter a valid email!");
      return;
    }
    console.log("Subscribed with:", subscribeEmail);
    alert(`Subscribed with: ${subscribeEmail}`);
    setSubscribeEmail("");
  };

  return (
    <footer className="w-full mt-10 text-white bg-gray-900">
      <div className="flex flex-col gap-10 px-6 py-10 border-b md:px-36 md:flex-row md:gap-32 border-white/30">
        {/* Logo & Description */}
        <div className="flex flex-col items-center w-full md:items-start">
          <img src={assets.logo_dark} alt="logo" className="w-32 md:w-40" />
          <p className="mt-6 text-sm text-center md:text-left text-white/80">
            Edemy LMS makes education accessible and engaging, connecting
            students with educators through quality courses, interactive tools,
            and intuitive design.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col items-center w-full md:items-start">
          <h2 className="mb-5 text-lg font-semibold text-white md:text-xl">
            Company
          </h2>
          <ul className="flex flex-col items-center space-y-2 text-sm md:items-start text-white/80">
            <li>
              <Link to="/" className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="" className="hover:text-blue-500">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social Icons */}
        <div className="flex flex-col items-center w-full md:items-start">
          <h2 className="mb-5 text-lg font-semibold text-white md:text-xl">
            Subscribe to our newsletter
          </h2>
          <p className="text-sm text-center text-white/80 md:text-left">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="flex flex-col items-center w-full gap-2 pt-4 sm:flex-row md:items-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-10 px-3 text-sm text-gray-200 placeholder-gray-400 bg-gray-800 border rounded outline-none border-gray-500/30 sm:w-64"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              className="w-full h-10 text-white transition bg-blue-600 rounded sm:w-36 hover:bg-blue-700"
            >
              Subscribe
            </button>
          </div>
          <div className="mt-5">
            <SocialIcons />
          </div>
        </div>
      </div>

      <p className="py-4 text-xs text-center md:text-sm text-white/60">
        Copyright 2025 © Edemy by GPS. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
