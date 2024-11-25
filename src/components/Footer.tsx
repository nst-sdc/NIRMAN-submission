import React from 'react';
import { Code2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <Code2 className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">NIRMAAN</span>
          </div>
          
          <div className="flex items-center space-x-2 text-purple-300">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
            <span>by Vivek W</span>
          </div>

          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
          
          <p className="text-purple-300/60 text-sm text-center">
            © 2024 Dev Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}