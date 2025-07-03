import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const SimpleFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What sizes do you offer?",
      answer: "We offer sizes from XS to 3XL. Check our size guide on each product page for detailed measurements."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days."
    },
    {
      question: "What is your return policy?",
      answer: "You can return items within 30 days of purchase. Items must be unworn with original tags."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay."
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships. Use it to track your package."
    },
    {
      question: "Can I exchange items?",
      answer: "Yes, you can exchange items for different sizes or colors within 30 days of purchase."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us via email, phone, or live chat. We're available 24/7 to help you."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            FAQ
          </h1>
          <p className="text-xl opacity-90">
            Find answers to your most common questions
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                <div className="ml-4">
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <p className="text-gray-600 pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <MessageCircle className="w-12 h-12 opacity-90" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg opacity-90 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleFAQ;