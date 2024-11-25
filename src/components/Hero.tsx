import React from 'react';
import { Code2, Calendar, Clock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

export default function Hero() {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center mobile-safe-top mobile-safe-bottom" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 md:w-96 h-72 md:h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className={`text-center transform transition-all duration-1000 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          {/* Logo */}
          <div className="animate-float mb-8">
            <Code2 className="w-24 h-24 md:w-32 md:h-32 text-purple-400 mx-auto" />
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-8 tracking-tight animate-pulse">
            NIRMAAN
          </h1>

          {/* Subtitle */}
          <p className="text-3xl md:text-4xl lg:text-5xl text-purple-200 mb-12 font-light">
            Code the Future, Shape the Web
          </p>

          {/* Event Details */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 text-white">
            <div className="flex items-center gap-3 bg-white/5 rounded-full px-6 py-3 backdrop-blur-sm touch-active">
              <Calendar className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
              <span className="text-lg md:text-2xl">Nov 26, 2024</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-full px-6 py-3 backdrop-blur-sm touch-active">
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
              <span className="text-lg md:text-2xl">3 PM - 8 PM
</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-full px-6 py-3 backdrop-blur-sm touch-active">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
              <span className="text-lg md:text-2xl">Free Entry</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/compiler')}
            className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-200 transform hover:-translate-y-1 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 touch-active"
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  );
}