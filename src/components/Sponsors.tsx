import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function Sponsors() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transform transition-all duration-1000 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8">
            Our Sponsors
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-16">
            Proudly supported by leading institutions in technology and education
          </p>
        </div>

        <div className={`flex justify-center items-center transform transition-all duration-1000 delay-200 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10">
            <img 
              src="public/NSTxADPU-white-removebg.png" 
              alt="Ajeenkya DY Patil University"
              className="h-24 md:h-32 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
