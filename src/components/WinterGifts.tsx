import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Gift, Star, Award } from 'lucide-react';

export default function WinnerGifts() {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const gifts = [
    {
      icon: <Gift className="w-12 h-12" />,
      title: "Limited Edition Swag",
      description: "Exclusive NIRMAAN branded hoodies, t-shirts, and stickers"
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Premium Subscriptions",
      description: "1-year free access to premium development tools and platforms"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Special Recognition",
      description: "Digital badges and certificates for all participants"
    }
  ];

  return (
    <section id="winner-gifts" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transform transition-all duration-1000 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8">
            Winner Special Gifts
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-16">
            Participate in NIRMAAN and receive these amazing Winner special gifts!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gifts.map((gift, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 delay-${index * 200} ${
                inView
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-20 opacity-0'
              }`}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-white/10 h-full">
                <div className="text-purple-400 mb-6 transform hover:scale-110 transition-transform">
                  {gift.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {gift.title}
                </h3>
                <p className="text-purple-200">
                  {gift.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center transform transition-all duration-1000 delay-600 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <button
            onClick={() => navigate('/submissions')}
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 p-[2px] rounded-full hover:scale-105 transition-transform"
          >
            <div className="px-8 py-4 text-xl font-semibold text-white bg-black rounded-full hover:bg-transparent transition-colors">
              Submit Now to Claim Your Gifts
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}