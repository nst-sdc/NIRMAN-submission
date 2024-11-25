import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Send, Users, Trophy } from 'lucide-react';

export default function Register() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 text-center">
              Register Now
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Registration Form */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <select className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Select Your Track</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="ui">UI/UX Design</option>
                  </select>
                </div>

                <button className="w-full px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  Register Now
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Benefits */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Users className="w-8 h-8 text-purple-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Team Participation</h3>
                    <p className="text-purple-200">Join individually or form a team of up to 3 members</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Trophy className="w-8 h-8 text-purple-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Amazing Prizes</h3>
                    <p className="text-purple-200">Win exciting prizes and get recognized for your skills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}