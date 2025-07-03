import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { CheckCircle, CreditCard, Calendar } from 'lucide-react';

const PaymentSuccessPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className={`max-w-md w-full transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Success Card */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-purple-100">
          
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Your transaction has been completed</p>
          </div>

          {/* Transaction Details */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {/* <span className="text-gray-600 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Amount
                </span>
                <span className="text-gray-800 font-semibold text-xl">₹2,499</span> */}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </span>
                <span className="text-gray-800">{formattedDate}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-600">Transaction ID</span>
                <span className="text-gray-800 font-mono text-sm">TXN123456789</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Link to="/">
          <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300">
            Continue
          </button>
          </Link>
          {/* Footer Message */}
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              A confirmation email has been sent to your registered email address
            </p>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Need help? <span className="text-purple-600 underline cursor-pointer hover:text-purple-700 transition-colors">Contact Support</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;