import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code2, ExternalLink } from 'lucide-react';
import Layout from '../components/Layout';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const savedSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    setSubmissions(savedSubmissions.reverse()); // Show newest first
  }, []);

  const renderPreview = (submission) => {
    const combinedCode = `
      <html>
        <head>
          <style>${submission.cssCode}</style>
        </head>
        <body>
          ${submission.htmlCode}
          <script>${submission.jsCode}</script>
        </body>
      </html>
    `;
    return combinedCode;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-xl group"
          >
            <ArrowLeft className="w-6 h-6 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to NIRMAAN
          </Link>
          <Link
            to="/compiler"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-colors"
          >
            <Code2 className="w-5 h-5 mr-2" />
            Open Compiler
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submissions List */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Project Submissions</h2>
            {submissions.map((submission, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/20 transition-colors cursor-pointer ${
                  selectedSubmission === submission ? 'ring-2 ring-purple-400' : ''
                }`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-lg">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{submission.projectName}</h3>
                    <p className="text-purple-200 mb-2">by {submission.teamName}</p>
                    <p className="text-purple-300 text-sm">
                      Submitted: {new Date(submission.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Preview Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <h2 className="text-3xl font-bold text-white mb-6">Project Preview</h2>
            {selectedSubmission ? (
              <div className="bg-white rounded-lg h-[600px] overflow-auto">
                <iframe
                  srcDoc={renderPreview(selectedSubmission)}
                  title="submission-preview"
                  className="w-full h-full"
                  sandbox="allow-scripts"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-[600px] text-purple-300">
                Select a submission to preview
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}