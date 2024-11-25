import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function RegistrationPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={handleBackToHome}
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8 text-xl group touch-active"
          type="button"
        >
          <ArrowLeft className="w-6 h-6 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to NIRMAAN
        </button>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 text-center">
            Register for NIRMAAN
          </h2>

          <div className="relative overflow-hidden rounded-2xl bg-white/5">
            <iframe
              src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
              className="w-full h-[800px] md:h-[600px]"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Registration Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}