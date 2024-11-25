import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Send } from 'lucide-react';
import Editor from "@monaco-editor/react";

export default function CompilerPage() {
  const navigate = useNavigate();
  const [htmlCode, setHtmlCode] = useState('<div class="text-center">\n  <h1>Hello NIRMAAN!</h1>\n</div>');
  const [cssCode, setCssCode] = useState('h1 {\n  color: purple;\n}');
  const [jsCode, setJsCode] = useState('// Your JavaScript code here');
  const [output, setOutput] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState(['', '', '', '']);

  const compileCode = () => {
    const combinedCode = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
    setOutput(combinedCode);
  };

  const handleTeamMemberChange = (index, value) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = value;
    setTeamMembers(newTeamMembers);
  };

  const handleSubmit = () => {
    if (!teamName || !teamMembers[0]) {
      alert('Please enter team name and at least one team member');
      return;
    }

    const submission = {
      teamName,
      teamMembers: teamMembers.filter(member => member),
      htmlCode,
      cssCode,
      jsCode,
      timestamp: new Date().toISOString(),
    };

    // Get existing submissions or initialize empty array
    const existingSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    
    // Add new submission
    existingSubmissions.push(submission);
    
    // Save to localStorage
    localStorage.setItem('submissions', JSON.stringify(existingSubmissions));
    
    // Navigate to submissions page
    navigate('/submissions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-xl group"
          >
            <ArrowLeft className="w-6 h-6 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to NIRMAAN
          </Link>
          <div className="flex gap-4">
            <button
              onClick={compileCode}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
            >
              <Play className="w-4 h-4 mr-2" />
              Run
            </button>
          </div>
        </div>

        {/* Team Info */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-purple-400/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Team Member ${index + 1}`}
                value={member}
                onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                className="px-4 py-2 bg-white/10 border border-purple-400/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white/10 rounded-lg backdrop-blur-lg p-4">
              <h3 className="text-white mb-2">HTML</h3>
              <Editor
                height="200px"
                defaultLanguage="html"
                theme="vs-dark"
                value={htmlCode}
                onChange={(value) => setHtmlCode(value || '')}
                options={{ minimap: { enabled: false } }}
              />
            </div>

            <div className="bg-white/10 rounded-lg backdrop-blur-lg p-4">
              <h3 className="text-white mb-2">CSS</h3>
              <Editor
                height="200px"
                defaultLanguage="css"
                theme="vs-dark"
                value={cssCode}
                onChange={(value) => setCssCode(value || '')}
                options={{ minimap: { enabled: false } }}
              />
            </div>

            <div className="bg-white/10 rounded-lg backdrop-blur-lg p-4">
              <h3 className="text-white mb-2">JavaScript</h3>
              <Editor
                height="200px"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={jsCode}
                onChange={(value) => setJsCode(value || '')}
                options={{ minimap: { enabled: false } }}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Project
            </button>
          </div>

          <div className="bg-white/10 rounded-lg backdrop-blur-lg p-4">
            <h3 className="text-white mb-2">Live Preview</h3>
            <div className="bg-white rounded-lg h-[640px] overflow-auto">
              <iframe
                srcDoc={output}
                title="output"
                className="w-full h-full"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}