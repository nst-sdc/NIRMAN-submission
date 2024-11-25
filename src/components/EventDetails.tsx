import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Trophy, Target, Code, Cpu, Users, Rocket } from 'lucide-react';

export default function EventDetails() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Certificate + Dev Coin + Special Prize",
      description: "Win amazing prizes and recognition for your web development skills"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Competition Focus",
      description: "Create innovative and responsive web applications"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Tech Stack",
      description: "use HTML, CSS or Use any modern web framework - React, Vue, Angular, or vanilla JavaScript"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Judging Criteria",
      description: "Projects will be judged on innovation, design, code quality, and functionality"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Size",
      description: "Participate individually or in teams of 2 to 4 members"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Timeline",
      description: "2.5-hour development phase with mentorship sessions and technical support"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transform transition-all duration-1000 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8">
            Event Details
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-16">
            Join us for an exciting web development competition where creativity meets code.
            Shape the future of the web with your innovative ideas and technical skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 delay-${index * 200} ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-white/10 h-full">
                <div className="text-purple-400 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-purple-200">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}