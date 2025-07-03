import React, { useState, useEffect } from 'react';
import { XCircle, CreditCard, Calendar, RotateCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentFailedPage = () => {
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
        
        {/* Failed Card */}
        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-red-100">
          
          {/* Failed Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4">
              <XCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed!</h1>
            <p className="text-gray-600">Unfortunately, your transaction could not be processed</p>
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
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className="text-red-600 font-medium">Failed</span>
              </div>
            </div>
          </div>

          {/* Failure Reason */}
          {/* <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-100">
            <h3 className="text-red-800 font-medium mb-2">Reason for failure:</h3>
            <p className="text-red-700 text-sm">Insufficient funds in your account. Please check your balance and try again.</p>
          </div> */}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link to="/cart">
            <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            </Link>
          </div>

          {/* Footer Message */}
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              No amount has been deducted from your account
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

export default PaymentFailedPage;