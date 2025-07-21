import React, { useState, useRef, useEffect } from "react";
import { Play, Square, RotateCcw, MessageSquare } from "lucide-react";
import { remark } from 'remark';
import html from 'remark-html';
import axios from "axios"
function CodeEditor() {
  const [isRunning, setIsRunning] = useState(false);
  const [input, setInput] = useState('');
  const [lang,setLang] = useState("cpp")
  const [output, setOutput] = useState(``);
  const [isReviewing, setIsReviewing] = useState(false);
  const [review, setReview] = useState('');
  const [currentCode, setCurrentCode] = useState(`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`);
  
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    // Load Monaco Editor from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js';
    script.onload = () => {
      window.require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });
      window.require(['vs/editor/editor.main'], () => {
        if (editorRef.current && !editorInstance.current) {
          editorInstance.current = window.monaco.editor.create(editorRef.current, {
            value: currentCode,
            language: 'cpp',
            theme: 'vs-dark',
            fontSize: 14,
            fontFamily: 'Consolas, "Courier New", monospace',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: 'on',
            folding: true,
            selectOnLineNumbers: true,
            matchBrackets: 'always',
            wordWrap: 'off'
          });

          // Listen for content changes
          editorInstance.current.onDidChangeModelContent(() => {
            setCurrentCode(editorInstance.current.getValue());
          });
        }
      });
    };
    document.head.appendChild(script);

    return () => {
      if (editorInstance.current) {
        editorInstance.current.dispose();
      }
    };
  }, []);

  const handleRunCode = async() => {
    try {
      setIsRunning(true)
      setOutput('');
      setReview('');
      const response = await axios.post("http://localhost:3000/execute",{
        lang,code:currentCode,input
      })
      setIsRunning(false)
      setOutput(response.data.output)
    } catch (error) {
      setIsRunning(false)
      console.log(error);
      if(error?.response?.data?.details)setOutput(error.response.data.details)
      else if (error?.response?.data?.error)setOutput(error.response.data.error)
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setOutput('Execution stopped');
  };
  const markdownToHtml = async (markdownText) => {
    const file = await remark().use(html).process(markdownText);
    return String(file);
  };
  const handleReviewCode = async() => {
    setIsReviewing(true);
    setOutput('');
    setReview('');
    try {
       const response = await axios.post("http://localhost:3000/code-review",{
        code:currentCode
       })
       console.log(response)
       const data = await markdownToHtml(response.data.data)
       setIsReviewing(false);
       setReview(data)
    } catch (error) {
      setIsRunning(false);
      console.log(error);
      
    }
  };

  const handleClear = () => {
    setOutput('');
    setReview('');
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setLang(language)
    if (editorInstance.current) {
      const model = editorInstance.current.getModel();
      window.monaco.editor.setModelLanguage(model, language);
      
      // Set default code for different languages
      const defaultCode = {
        cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
        python: `def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
        java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
      };
      
      editorInstance.current.setValue(defaultCode[language] || '// Start coding here...');
    }
  };

  return (
    <div className="h-screen bg-[#0d1117] flex flex-col max-h-screen">
      <div className="h-12 bg-[#161b22] border-b border-[#30363d] flex items-center px-4 gap-4">
        <select 
          onChange={handleLanguageChange}
          className="bg-[#21262d] border border-[#30363d] text-[#e6edf3] px-3 py-1.5 rounded text-sm outline-none"
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        
        <div className="flex items-center gap-2">
          {!isRunning ? (
            <button
              onClick={handleRunCode}
              className="flex items-center gap-1.5 bg-[#238636] hover:bg-[#2ea043] text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
            >
              <Play size={14} />
              Run
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex items-center gap-1.5 bg-[#da3633] hover:bg-[#f85149] text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
            >
              <Square size={14} />
              Stop
            </button>
          )}

          <button
            onClick={handleReviewCode}
            disabled={isReviewing}
            className="flex items-center gap-1.5 bg-[#1f6feb] hover:bg-[#388bfd] disabled:bg-[#30363d] text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
          >
            <MessageSquare size={14} />
            {isReviewing ? 'Reviewing...' : 'Review'}
          </button>
          
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] px-3 py-1.5 rounded text-sm transition-colors"
          >
            <RotateCcw size={14} />
            Clear
          </button>
        </div>
      </div>

      <div className="flex-1 flex max-h-screen h-full overflow-y-hidden ">
        {/* Left side - Editor and Input */}
        <div className="w-3/5 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 border-r border-[#30363d]">
            <div 
              ref={editorRef} 
              className="w-full h-[calc(100%-2rem)]"
            />
          </div>

          {/* Input */}
          <div className="h-40 border-r border-t border-[#30363d]">
            <div className="h-8 bg-[#161b22] border-b border-[#30363d] flex items-center px-3">
              <span className="text-[#7d8590] text-xs font-medium">Input</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Program input..."
              className="w-full h-32 bg-[#0d1117] text-[#e6edf3] p-3 font-mono text-sm outline-none resize-none placeholder-[#7d8590]"
            />
          </div>
        </div>

        {/* Right side - Output */}
        <div className="w-2/5 flex flex-col overflow-scroll">
          <div className="h-8 bg-[#161b22] border-b border-[#30363d] flex items-center px-3">
            <span className="text-[#7d8590] text-xs font-medium">Output/Review</span>
            {isRunning && (
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 bg-[#238636] rounded-full animate-pulse"></div>
                <span className="text-[#238636] text-xs">Running...</span>
              </div>
            )}
            {isReviewing && (
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 bg-[#1f6feb] rounded-full animate-pulse"></div>
                <span className="text-[#1f6feb] text-xs">Reviewing...</span>
              </div>
            )}
          </div>
          <div className="flex-1 bg-[#0d1117] p-3">
            <pre className="text-[#e6edf3] font-mono text-sm whitespace-pre-wrap h-full overflow-auto">
              {output && (
                <div className="mb-4">
                  <div className="text-[#238636] text-xs font-semibold mb-2"  >Expected Output:
                    <br/>
                    {output}</div>
                </div>
              )}
              {review && (
                <div className="mb-4">
                  <div className="text-[#cceb1f91] text-xs font-semibold mb-2" dangerouslySetInnerHTML={{__html:review}} ></div>
                </div>
              )}
              {!output && !review && (
                <span className="text-[#7d8590] italic">
                  Click "Run" to execute your code or "Review" for code analysis
                </span>
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;