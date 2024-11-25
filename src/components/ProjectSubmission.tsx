import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Globe, Upload } from 'lucide-react';

export default function ProjectSubmission() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8 text-xl group"
        >
          <ArrowLeft className="w-6 h-6 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/10">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-12 text-center">
            Submit Your Project
          </h2>

          <div className="space-y-8">
            <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm animate-float">
              <div className="flex items-center gap-4 mb-6">
                <Upload className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-semibold text-white">Project Submission Form</h3>
              </div>
              
              <div className="aspect-[4/3] w-full">
                <iframe 
                  src="https://docs.google.com/forms/d/e/YOUR_SUBMISSION_FORM_ID/viewform?embedded=true"
                  className="w-full h-full rounded-2xl"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                >
                  Loading…
                </iframe>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <Github className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                  <h4 className="text-xl font-semibold text-white">GitHub Repository</h4>
                </div>
                <p className="text-purple-200">
                  Make sure your repository is public and includes a detailed README.md
                </p>
              </div>

              <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <Globe className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                  <h4 className="text-xl font-semibold text-white">Live Demo</h4>
                </div>
                <p className="text-purple-200">
                  Deploy your project and provide a live demo URL
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
          <p className="mt-6 text-purple-300/60 text-sm">
            © 2024 by Vivek W. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}