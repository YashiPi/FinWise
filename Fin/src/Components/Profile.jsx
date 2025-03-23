import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaExchangeAlt,
  FaCreditCard,
  FaPiggyBank,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaDownload,
  FaGoogle,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";


function Profile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main content */}
      <div className="p-6">
        {/* Top welcome section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome back, Ayushi!
            </h1>
            <p className="text-gray-600">
              Last login: March 12, 2025 at 09:45 AM
            </p>
          </div>
          
        </div>


        {/* Account summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Checking Account
              </h3>
              <span className="text-xs text-gray-500">**** 4523</span>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">$12,456.78</p>
            <p className="text-sm text-gray-600">Available Balance</p>
          </div>


          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Savings Account
              </h3>
              <span className="text-xs text-gray-500">**** 7890</span>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">$45,238.92</p>
            <p className="text-sm text-gray-600">Available Balance</p>
          </div>


          {/* <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Credit Card
              </h3>
              <span className="text-xs text-gray-500">**** 6541</span>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">$2,842.15</p>
            <p className="text-sm text-gray-600">Current Balance</p>
          </div> */}
        </div>


        {/* Profile information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 md:pr-8 mb-6 md:mb-0">
              <div className="text-center md:text-left">
                <div className="w-32 h-32 mx-auto md:mx-0 rounded-full bg-indigo-100 flex items-center justify-center">
                  <img
                    src="/api/placeholder/150/150"
                    alt="User profile"
                    className="rounded-full w-28 h-28"
                  />
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-800">
                  Ayushi Gautam
                </h2>
                
                <button className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Change Profile Photo
                </button>
              </div>
            </div>


            <div className="w-full md:w-2/3 md:border-l md:pl-8 md:border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Information
              </h3>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Ayushi"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Gautam"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="Ayushi.Gautam@example.com"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="(555) 123-4567"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      defaultValue="1985-06-15"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      defaultValue="123 Finance Street"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      defaultValue="New York"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      defaultValue="10001"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between mt-6">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg mb-3 md:mb-0"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>


        {/* Security settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Security Settings
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h4 className="font-medium text-gray-800">Password</h4>
                <p className="text-sm text-gray-600">
                  Last changed 45 days ago
                </p>
              </div>
              <button className="mt-2 md:mt-0 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Change Password
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h4 className="font-medium text-gray-800">
                  Login Notifications
                </h4>
                <p className="text-sm text-gray-600">
                  Receive alerts when new login is detected
                </p>
              </div>
              <div className="mt-2 md:mt-0 flex items-center">
                <span className="mr-3 text-sm font-medium text-green-600">
                  Enabled
                </span>
                <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-green-600">
                  <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white"></span>
                </button>
              </div>
            </div>


            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">
                  Remember This Device
                </h4>
                <p className="text-sm text-gray-600">
                  Stay logged in on this device
                </p>
              </div>
              <div className="mt-2 md:mt-0 flex items-center">
                <span className="mr-3 text-sm font-medium text-gray-600">
                  Disabled
                </span>
                <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-300">
                  <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
  );
}


export default Profile;




