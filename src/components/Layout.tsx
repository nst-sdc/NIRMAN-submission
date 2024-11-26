import React from 'react';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black ${className}`}>
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      {children}
      <Footer />
    </div>
  );
}
