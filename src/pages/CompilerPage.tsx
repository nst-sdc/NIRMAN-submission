import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Send, Upload, FileCode, Folder, X, Image as ImageIcon } from 'lucide-react';
import Editor from "@monaco-editor/react";

interface FileEntry {
  file: File;
  content?: string;
  preview?: string;
}

interface FileCollection {
  [key: string]: FileEntry[];
}

export default function CompilerPage() {
  const navigate = useNavigate();
  const [htmlCode, setHtmlCode] = useState('<div class="text-center">\n  <h1>Hello NIRMAAN!</h1>\n</div>');
  const [cssCode, setCssCode] = useState('h1 {\n  color: purple;\n}');
  const [jsCode, setJsCode] = useState('// Your JavaScript code here');
  const [output, setOutput] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamNumber, setTeamNumber] = useState('');
  const [teamMembers, setTeamMembers] = useState(['', '', '', '']);
  const [files, setFiles] = useState<FileCollection>({
    html: [],
    css: [],
    js: [],
    media: []
  });

  useEffect(() => {
    compileCode();
  }, [htmlCode, cssCode, jsCode, files]);

  const compileCode = () => {
    // Create object URLs for media files
    const mediaUrls = files.media.reduce((acc, entry) => {
      if (entry.preview) {
        acc[entry.file.name] = entry.preview;
      }
      return acc;
    }, {} as { [key: string]: string });

    // Combine all HTML files
    const combinedHtml = files.html.map(entry => entry.content || '').join('\n') || htmlCode;
    const combinedCss = files.css.map(entry => entry.content || '').join('\n') || cssCode;
    const combinedJs = files.js.map(entry => entry.content || '').join('\n') || jsCode;

    const combinedCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            /* Reset some basic elements */
            body {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            ${combinedCss}
          </style>
        </head>
        <body>
          ${combinedHtml}
          <script>
            try {
              // Define media URLs
              window.mediaUrls = ${JSON.stringify(mediaUrls)};
              // Replace media URLs in HTML
              document.body.innerHTML = document.body.innerHTML.replace(
                /src="([^"]+)"/g,
                (match, url) => {
                  const mediaUrl = window.mediaUrls[url];
                  return mediaUrl ? \`src="\${mediaUrl}"\` : match;
                }
              );
              // Execute user's JavaScript code
              ${combinedJs}
            } catch (error) {
              console.error('Execution error:', error);
            }
          </script>
        </body>
      </html>
    `.trim();
    setOutput(combinedCode);
  };

  const handleTeamMemberChange = (index: number, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = value;
    setTeamMembers(newTeamMembers);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const uploadedFiles = Array.from(event.target.files || []);
    if (!uploadedFiles.length) return;

    const newFiles: FileEntry[] = [];

    for (const file of uploadedFiles) {
      const entry: FileEntry = { file };

      if (type === 'media') {
        // Create preview URL for media files
        entry.preview = URL.createObjectURL(file);
      } else {
        // Read content for code files
        const content = await file.text();
        entry.content = content;

        // Update editor content with the last uploaded file
        if (type === 'html') setHtmlCode(content);
        if (type === 'css') setCssCode(content);
        if (type === 'js') setJsCode(content);
      }

      newFiles.push(entry);
    }

    setFiles(prev => ({
      ...prev,
      [type]: [...prev[type], ...newFiles]
    }));
  };

  const removeFile = (type: string, index: number) => {
    setFiles(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!teamName || !teamMembers[0] || !teamNumber) {
      alert('Please enter team name, number, and at least one team member');
      return;
    }

    // Save media files as data URLs
    const mediaFiles = files.media.reduce((acc, entry) => {
      if (entry.preview) {
        acc[entry.file.name] = entry.preview;
      }
      return acc;
    }, {});

    const combinedHtml = files.html.map(entry => entry.content || '').join('\n') || htmlCode;
    const combinedCss = files.css.map(entry => entry.content || '').join('\n') || cssCode;
    const combinedJs = files.js.map(entry => entry.content || '').join('\n') || jsCode;

    const submission = {
      teamName,
      teamNumber,
      teamMembers: teamMembers.filter(member => member),
      htmlCode: combinedHtml,
      cssCode: combinedCss,
      jsCode: combinedJs,
      mediaFiles,
      files: {
        html: files.html.map(f => f.file.name),
        css: files.css.map(f => f.file.name),
        js: files.js.map(f => f.file.name),
        media: files.media.map(f => f.file.name)
      },
      timestamp: new Date().toISOString(),
    };

    const existingSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    existingSubmissions.push(submission);
    localStorage.setItem('submissions', JSON.stringify(existingSubmissions));
    
    // Clean up object URLs
    files.media.forEach(entry => {
      if (entry.preview) {
        URL.revokeObjectURL(entry.preview);
      }
    });
    
    navigate('/submissions');
  };

  const renderFileList = (type: string) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {files[type].map((entry, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-purple-600/20 px-2 py-1 rounded-lg text-sm text-purple-200"
        >
          {type === 'media' ? <ImageIcon className="w-4 h-4" /> : <FileCode className="w-4 h-4" />}
          <span className="truncate max-w-[150px]">{entry.file.name}</span>
          <button
            onClick={() => removeFile(type, index)}
            className="text-purple-300 hover:text-purple-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-purple-400/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
            />
            <input
              type="text"
              placeholder="Team Number"
              value={teamNumber}
              onChange={(e) => setTeamNumber(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-purple-400/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
            />
          </div>
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
            {/* Media Files Upload */}
            <div className="bg-white/10 rounded-lg backdrop-blur-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white">Media Files</h3>
                <label className="inline-flex items-center px-3 py-1.5 bg-purple-600/30 text-purple-200 rounded-lg hover:bg-purple-600/40 transition-colors cursor-pointer text-sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Media
                  <input
                    type="file"
                    accept="image/*,video/*,audio/*"
                    onChange={(e) => handleFileUpload(e, 'media')}
                    multiple
                    className="hidden"
                  />
                </label>
              </div>
              {renderFileList('media')}
            </div>

            <div className="bg-white/10 rounded-lg backdrop-blur-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white">HTML</h3>
                <label className="inline-flex items-center px-3 py-1.5 bg-purple-600/30 text-purple-200 rounded-lg hover:bg-purple-600/40 transition-colors cursor-pointer text-sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload HTML
                  <input
                    type="file"
                    accept=".html,.htm"
                    onChange={(e) => handleFileUpload(e, 'html')}
                    multiple
                    className="hidden"
                  />
                </label>
              </div>
              <Editor
                height="200px"
                defaultLanguage="html"
                theme="vs-dark"
                value={htmlCode}
                onChange={(value) => setHtmlCode(value || '')}
                options={{ minimap: { enabled: false } }}
              />
              {renderFileList('html')}
            </div>

            <div className="bg-white/10 rounded-lg backdrop-blur-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white">CSS</h3>
                <label className="inline-flex items-center px-3 py-1.5 bg-purple-600/30 text-purple-200 rounded-lg hover:bg-purple-600/40 transition-colors cursor-pointer text-sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload CSS
                  <input
                    type="file"
                    accept=".css"
                    onChange={(e) => handleFileUpload(e, 'css')}
                    multiple
                    className="hidden"
                  />
                </label>
              </div>
              <Editor
                height="200px"
                defaultLanguage="css"
                theme="vs-dark"
                value={cssCode}
                onChange={(value) => setCssCode(value || '')}
                options={{ minimap: { enabled: false } }}
              />
              {renderFileList('css')}
            </div>

            <div className="bg-white/10 rounded-lg backdrop-blur-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white">JavaScript</h3>
                <label className="inline-flex items-center px-3 py-1.5 bg-purple-600/30 text-purple-200 rounded-lg hover:bg-purple-600/40 transition-colors cursor-pointer text-sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload JS
                  <input
                    type="file"
                    accept=".js"
                    onChange={(e) => handleFileUpload(e, 'js')}
                    multiple
                    className="hidden"
                  />
                </label>
              </div>
              <Editor
                height="200px"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={jsCode}
                onChange={(value) => setJsCode(value || '')}
                options={{ minimap: { enabled: false } }}
              />
              {renderFileList('js')}
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

        <footer className="mt-12 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
          <p className="mt-6 text-purple-300/60 text-sm">
            Written and Made by Vivek W
          </p>
        </footer>
      </div>
    </div>
  );
}