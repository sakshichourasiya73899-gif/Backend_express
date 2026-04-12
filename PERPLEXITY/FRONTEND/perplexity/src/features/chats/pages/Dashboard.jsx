import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  PanelLeftClose,
  PanelLeftOpen,
  Copy,
  Pencil,
  MoreHorizontal,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Download,
  ArrowDown,
  ArrowUp,
  Check,
  Upload,
  GitBranch,
  Volume2,
  Mic,
  Plus,
  Image as ImageIcon,
  Brain,
  Search,
  FileText,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Link,
  
} from "lucide-react";
const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6 fill-green-500">
    <path d="M16 2C8.3 2 2 8.3 2 16c0 2.8.8 5.4 2.2 7.6L2 30l6.6-2.1C10.7 29.3 13.3 30 16 30c7.7 0 14-6.3 14-14S23.7 2 16 2zm0 25.5c-2.4 0-4.7-.7-6.7-2l-.5-.3-3.9 1.2 1.3-3.8-.3-.6c-1.4-2.1-2.1-4.6-2.1-7.1 0-6.6 5.4-12 12-12s12 5.4 12 12-5.4 12-12 12zm6.6-8.7c-.4-.2-2.4-1.2-2.8-1.3-.4-.2-.7-.2-1 .2-.3.4-1.1 1.3-1.3 1.6-.2.2-.5.3-.9.1-.4-.2-1.6-.6-3-2-.9-.8-1.5-1.8-1.7-2.2-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7 0-.2-1-2.4-1.4-3.2-.3-.8-.6-.7-1-.7h-.9c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.4 3.6 1.6 3.8c.2.2 2.7 4.2 6.6 5.9.9.4 1.6.6 2.2.8.9.3 1.7.3 2.3.2.7-.1 2.4-1 2.7-2 .3-1 .3-1.9.2-2.1-.1-.2-.4-.3-.8-.5z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-blue-500">
    <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.08 1 2.5 1 4.98 2 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.6v2.2h.1c.5-.9 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-7.5c0-1.8 0-4-2.4-4s-2.8 1.9-2.8 3.8V24h-4V8z"/>
  </svg>
);

const RedditIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-orange-500">
    <path d="M24 12c0-1.1-.9-2-2-2-.5 0-.9.2-1.3.5-1.3-.9-3.1-1.5-5-1.6l1-4.5 3.2.7c0 .8.7 1.5 1.5 1.5S23 6 23 5.2s-.7-1.5-1.5-1.5c-.6 0-1.1.3-1.3.8l-3.6-.8c-.2 0-.4 0-.5.2-.1.1-.2.3-.2.5l-1.2 5.4c-2 .1-3.9.7-5.2 1.6-.4-.3-.8-.5-1.3-.5-1.1 0-2 .9-2 2 0 .7.4 1.3 1 1.7-.1.4-.1.8-.1 1.2 0 3.3 3.8 6 8.5 6s8.5-2.7 8.5-6c0-.4 0-.8-.1-1.2.6-.4 1-1 1-1.7zM8.5 14c-.8 0-1.5-.7-1.5-1.5S7.7 11 8.5 11s1.5.7 1.5 1.5S9.3 14 8.5 14zm7 0c-.8 0-1.5-.7-1.5-1.5S14.7 11 15.5 11s1.5.7 1.5 1.5S16.3 14 15.5 14zm-7.4 3.2c.9.6 2.2 1 3.9 1s3-.4 3.9-1c.2-.2.3-.5.1-.7-.2-.2-.5-.3-.7-.1-.7.5-1.8.8-3.3.8s-2.6-.3-3.3-.8c-.2-.2-.5-.1-.7.1-.2.2-.1.5.1.7z"/>
  </svg>
);

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

// ================= MESSAGE =================
function MessageItem({ m, i, updateMessage, showToast, branchChat, regenerateResponse, setPreview }) {
  const [showActions, setShowActions] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(m.content);

  const [reaction, setReaction] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [showShare, setShowShare] = useState(false); 
const [shareText, setShareText] = useState("");     
const [shareFile, setShareFile] = useState(null); 
const [shareTitle, setShareTitle] = useState("");  
const [copiedShare, setCopiedShare] = useState(false);

  const timeoutRef = useRef(null);
  const menuRef = useRef(null);

  // outside click close
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowActions(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowActions(false);
    }, 1000);
  };

  const handleCopy = () => {
  navigator.clipboard.writeText(m.content);
  setCopied(true);
  setTimeout(() => setCopied(false), 1000);
};

  const handleSave = () => {
    updateMessage(i, text);
    setEditing(false);
    regenerateResponse();
  };

  const handleRead = () => {
    const speech = new SpeechSynthesisUtterance(m.content);
    window.speechSynthesis.speak(speech);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let dayLabel = "";
    
    if (date.toDateString() === today.toDateString()) {
      dayLabel = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      dayLabel = "Yesterday";
    } else {
      dayLabel = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
    
    const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    
    return `${dayLabel}, ${time}`;
  };

  return (
    <div
      className={`flex flex-col mb-6 ${
        m.role === "user" ? "items-end" : "items-start"
      }`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* ================= USER ================= */}
      {m.role === "user" ? (
        <>
          {!editing ? (
            <>
              <div className="px-2 py-2 max-w-[90%] md:max-w-[70%]">
               
                {m.files && m.files.map((file, i) => (
  <div key={i} className="mt-2">

    {/* IMAGE */}
    {file.category === "image" && (
      <div className="mt-2">
    <img
      src={file.url}
      onClick={() => setPreview(file)}
      className="max-w-[260px] rounded-md border border-zinc-700 cursor-pointer "
    />

    <div className="text-xs text-zinc-300 mt-1">
      {file.name} • {file.size}
    </div>
  </div>
    )}

    {/* VIDEO */}
    {file.category === "video" && (
      <video src={file.url} controls className="max-w-[250px] rounded-lg" />
    )}

    {/* AUDIO */}
    {file.category === "audio" && (
      <audio controls src={file.url} className="w-[250px]" />
    )}

    {/* PDF */}
    {file.type.includes("pdf") && (
      <div
        onClick={() => window.open(file.url)}
        className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-700"
      >
        <FileText size={16} />
        <span className="text-sm">{file.name}</span>
      </div>
    )}

    {/* OTHER */}
    {!["image", "video", "audio"].includes(file.category) &&
      !file.type.includes("pdf") && (
        <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg">
          <File size={16} />
          <span className="text-sm">{file.name}</span>
        </div>
      )}
       <p className="text-base leading-relaxed">{m.content}</p>

  </div>
))}
  
              </div>
              {showActions && !editing && (
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={handleCopy} 
                    className="p-2 cursor-pointer hover:bg-zinc-700 rounded-md text-zinc-400 hover:text-white transition relative group"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">Copy</span>
                  </button>
                  <button 
                    onClick={() => setEditing(true)} 
                    className="p-2 hover:cursor-pointer hover:bg-zinc-700 rounded-md text-zinc-400 hover:text-white transition relative group"
                  >
                    <Pencil size={16} />
                    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">Edit</span>
                  </button>
                   <button
       onClick={() => {
                const blob = new Blob([m.content], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "img.jpeg";
                a.click();
              }}
        className=" hover:cursor-pointer p-2 hover:bg-zinc-700 rounded-md text-zinc-400 hover:text-white transition relative group"
        >
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">Download</span>

        <Download size={16} />
      </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-[#2a2a2a] p-4 rounded-2xl w-full max-w-[600px]">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-transparent outline-none resize-none text-white"
                rows={3}
              />

              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-1 rounded-full bg-zinc-700 text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-1 rounded-full bg-[#10a37f] text-white"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </>
        
      ) : (
        <>
          {/* ================= AI ================= */}
          
          <div className="relative bg-[#2a2a2a] px-5 py-4 rounded-2xl max-w-[90%] md:max-w-[70%] shadow-sm">
            <div className="text-white text-base leading-relaxed">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {m.content}
              </ReactMarkdown>
              {m.files && m.files.map((file, i) => (
  <div key={i} className="text-xs text-zinc-400 mt-1">
    📎 {file.name}
  </div>
))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className=" flex items-center gap-2 mt-3 text-zinc-400">

            <button 
              onClick={handleCopy} 
              className=" hover:cursor-pointer p-2 hover:bg-zinc-700 rounded-md text-zinc-400 hover:text-white transition relative group"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">Copy</span>
            </button>

            {/* LIKE */}
            {reaction !== "dislike" && (
              <button
                onClick={() =>
                  setReaction(reaction === "like" ? null : "like")
                }
                className={`p-2 rounded-md transition relative group ${
                  reaction === "like"
                    ? "bg-zinc-700 text-white"
                    : " hover:cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-700"
                }`}
              >
                <ThumbsUp size={16} />
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">Like</span>
              </button>
            )}

            {/* DISLIKE */}
            {reaction !== "like" && (
              <button
                onClick={() =>
                  setReaction(reaction === "dislike" ? null : "dislike")
                }
                className={`p-2 rounded-md transition relative group ${
                  reaction === "dislike"
                    ? "bg-zinc-700 text-white"
                    : " hover:cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-700"
                }`}
              >
                <ThumbsDown size={16} />
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">Dislike</span>
              </button>
            )}
             {/*share*/ }
            <button
  onClick={() => {
    setShowShare(true);

    // ✅ IMAGE CASE
    if (m.files && m.files.length > 0) {
      const imageFile = m.files.find(f => f.category === "image");

      if (imageFile) {
        setShareFile(imageFile);
        setShareText("");
        setShareTitle(imageFile.name);
        return;
      }
    }

    // ✅ TEXT CASE
    setShareText(m.content);
    setShareFile(null);

    // 🔥 SMART TITLE (first line of AI response)
    const title =
      m.content.split("\n")[0].slice(0, 50) || "Shared Message";

    setShareTitle(title);
  }}
  className="p-2 hover:bg-zinc-700 rounded-md text-zinc-400 hover:text-white transition relative group"
>
  <Upload size={16} />
  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition">
    Share
  </span>
</button>
            {/* DOWNLOAD */}
            <button
              onClick={() => {
                const blob = new Blob([m.content], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "response.txt";
                a.click();
              }}
              className=" hover:cursor-pointer p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 transition relative group"
            >
              <Download size={16} />
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">Download</span>
            </button>

            {/* MENU */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className=" hover:cursor-pointer p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 transition relative group"
              >
                <MoreHorizontal size={16} />
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">More</span>
              </button>

              {menuOpen && (
                <div className="absolute top-10 left-0 bg-[#2b2b2b] rounded-lg shadow-lg p-2 w-56 z-50">

                  <button
                    onClick={() => branchChat(m.content)}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
                  >
                    <GitBranch size={16} />
                    <span className="text-sm">Branch in new chat</span>
                  </button>

                  <button
                    onClick={handleRead}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
                  >
                    <Volume2 size={16} />
                    <span className="text-sm">Read aloud</span>
                  </button>

                </div>
              )}
            </div>
          </div>
        </>
      )}
      {showShare && (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
    onClick={() => setShowShare(false)}
  >
    <div
      className="bg-[#1c1c1c] rounded-3xl p-6 w-[90%] max-w-lg shadow-2xl border border-zinc-800"
      onClick={(e) => e.stopPropagation()}
    >

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">
          {shareTitle}
        </h2>
        <button onClick={() => setShowShare(false)}>
          <X size={20} />
        </button>
      </div>

      <div className="border-b border-zinc-700 mb-4"></div>

      {/* PREVIEW */}
      <div className="bg-gradient-to-br from-zinc-800 to-zinc-700 p-4 rounded-2xl mb-6">

        {shareFile ? (
          <img
            src={shareFile.url}
            className="max-h-[200px] w-full object-contain rounded-xl"
          />
        ) : (
          <p className="text-sm text-zinc-200">
            {shareText.slice(0, 200)}...
          </p>
        )}

        <div className="text-right text-zinc-400 text-xs mt-2">
          ChatGPT Clone
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between px-4">

        {/* COPY */}
        <div
  onClick={() => {
    const data = shareFile ? shareFile.url : shareText;
    navigator.clipboard.writeText(data);

    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 1500);
  }}
  className="flex flex-col items-center gap-2 cursor-pointer group relative"
>
  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-200 text-black group-hover:scale-110 transition">
    <Link size={22} />
  </div>

  <span className="text-xs text-zinc-400 group-hover:text-white">
    Copy
  </span>

  {/* 🔥 LOCAL TOAST */}
  {copiedShare && (
    <div className="
      absolute top-full mt-2
      bg-black text-white text-xs
      px-3 py-1 rounded-md
      shadow-lg
      animate-fadeIn
    ">
      Copied!
    </div>
  )}
</div>

        {/* WHATSAPP */}
        <div
          onClick={() => {
            const data = shareFile ? shareFile.url : shareText;
            window.open(`https://wa.me/?text=${encodeURIComponent(data)}`);
          }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-200 text-black group-hover:scale-110 transition">
            <WhatsAppIcon />
          </div>
          <span className="text-xs text-zinc-400 group-hover:text-white">
            WhatsApp
          </span>
        </div>

        {/* LINKEDIN */}
        <div
          onClick={() => {
            const data = shareFile ? shareFile.url : shareText;
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data)}`);
          }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-200 text-black group-hover:scale-110 transition">
            <LinkedInIcon />
          </div>
          <span className="text-xs text-zinc-400 group-hover:text-white">
            LinkedIn
          </span>
        </div>

        {/* REDDIT */}
        <div
          onClick={() => {
            const data = shareFile ? shareFile.url : shareText;
            window.open(`https://www.reddit.com/submit?text=${encodeURIComponent(data)}`);
          }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-200 text-black group-hover:scale-110 transition">
            <RedditIcon />
          </div>
          <span className="text-xs text-zinc-400 group-hover:text-white">
            Reddit
          </span>
        </div>

      </div>

    </div>
  </div>
)}

   </div>
  );
}

// ================= SIDEBAR =================
function Sidebar({ open, chats, setActiveChat, newChat, setOpen }) {
  return (
    <div
      className={`bg-[#171717] h-full transition-all duration-300 ${
        open ? "w-64" : "w-0"
      } overflow-hidden flex flex-col`}
    >
      <div className="flex justify-between items-center p-3">
        <span>ChatGPT</span>
        <button 
          onClick={() => setOpen(false)}
          className="p-1 hover:bg-zinc-700 rounded relative group"
          title="Close sidebar"
        >
          <PanelLeftClose size={18} />
          <span className="absolute top-full right-0 mt-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">Close</span>
        </button>
      </div>

      <div className="p-3 space-y-2 overflow-y-auto">
        <button
          onClick={newChat}
          className="w-full p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 relative group"
          title="New Chat"
        >
          + New Chat
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">New Chat</span>
        </button>

        {chats.map((c) => (
          <div
            key={c.id}
            onClick={() => setActiveChat(c.id)}
            className="p-2 hover:bg-zinc-800 cursor-pointer rounded"
          >
            {c.title}
          </div>
        ))}
      </div>
    </div>
  );
}

// ================= INPUT =================
function ChatInput({ msg, setMsg, send, isLoading }) {
  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState("normal"); // normal | image | research
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const isExpanded = files.length > 0 || msg.includes("\n") || msg.length > 120;


  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const height = Math.min(textareaRef.current.scrollHeight, 300);
      textareaRef.current.style.height = height + "px";
    }
  }, [msg]);

  // Auto-focus textarea after sending
  useEffect(() => {
    if (msg === "" && !isLoading) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [msg, isLoading]);
  useEffect(() => {
  function handleClick(e) {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  }
  document.addEventListener("mousedown", handleClick);
  return () => document.removeEventListener("mousedown", handleClick);
}, []);

 const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();

    const message = msg;
    const filesToSend = files;

    // ✅ FIRST check condition
    if (!message.trim() && filesToSend.length === 0) return;

    // ✅ THEN send ONCE
    send(message, filesToSend);

    // ✅ THEN clear
    setFiles([]);
    setMsg("");
  }
};

  const handleMicClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (e) => {
          const transcript = Array.from(e.results)
            .map((result) => result[0].transcript)
            .join("");
          setMsg((prev) => prev + transcript);
        };
        recognition.start();
      }
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-3 mx-auto px-4">
      <input
      type="file"
      ref={fileInputRef}
      multiple
      className="hidden"
     onChange={(e) => {
  const selectedFiles = Array.from(e.target.files);
  setFiles((prev) => [...prev, ...selectedFiles]);
    console.log("FILES",selectedFiles)
  e.target.value = null; // optional but important
}}
    />
      {mode !== "normal" && (
      <div className="mb-2 text-xs text-zinc-400 flex items-center gap-2">
        <span className="px-3 py-1 bg-zinc-800 rounded-full capitalize">
          {mode}
        </span>

        <button
          onClick={() => setMode("normal")}
          className="text-red-400 hover:underline"
        >
          clear
        </button>
      </div>
    )}
      <div
  className={`w-full max-w-3xl mx-auto
  bg-[#2a2a2a]
${isExpanded ? "rounded-2xl" : "rounded-full"}
  px-3 sm:px-4 py-2
  flex items-center gap-2
  border border-zinc-700
  shadow-md
  transition ${
    isFocused ? "border-zinc-500 shadow-xl shadow-zinc-900/30" : "border-zinc-700"
  } hover:border-zinc-600 ${
    isExpanded ? "flex flex-col gap-2" : "flex items-center gap-3"
  }`}
>
{isExpanded && files.length > 0 && (
  <div className="flex flex-wrap justity-start gap-2 px-2 pt-2 pb-2 w-full">
    {files.map((file, index) => {
      const isImage = file.type.startsWith("image/");
      const isPDF = file.type === "application/pdf";

      return (
        <div key={index} className="relative">

          {/* 🟢 IMAGE PREVIEW */}
          {isImage ? (
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-zinc-700">
              <img
                src={URL.createObjectURL(file)}
                className="w-full h-full object-cover"
              />

              {/* overlay buttons */}
              <div className="absolute top-1 right-1 flex gap-1">
                <button className="bg-white text-black w-6 h-6 rounded-full text-xs">✎</button>
                <button
                  onClick={() =>
                    setFiles((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="bg-white text-black w-6 h-6 rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            /* 🔵 FILE / PDF PREVIEW */
            <div className="flex items-center gap-3 bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-xl min-w-[200px]">

              {/* ICON */}
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500 text-white text-sm">
                {isPDF ? "PDF" : "📄"}
              </div>

              {/* TEXT */}
              <div className="flex flex-col text-xs overflow-hidden">
                <span className="text-white truncate max-w-[140px]">
                  {file.name}
                </span>
                <span className="text-zinc-400">
                  {file.type.split("/")[1] || "file"}
                </span>
              </div>

              {/* CLOSE */}
              <button
                onClick={() =>
                  setFiles((prev) => prev.filter((_, i) => i !== index))
                }
                className="ml-auto text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      );
    })}
  </div>
)}

  <div className={`flex w-full ${isExpanded?"items-end" : "flex items-center w-full h-[40px]"}`}>

    {/* ➕ PLUS BUTTON */}
    <button
      onClick={() => setMenuOpen((prev) => !prev)}
      className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-full transition"
      title="Add files and more"
    >
      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>

    

    {/* TEXTAREA */}
     <div className="flex-1 flex items-center">
  <textarea
    ref={textareaRef}
    value={msg}
    onChange={(e) => setMsg(e.target.value)}
    onKeyDown={handleKeyDown}
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    disabled={isLoading}
    autoFocus
    className={`
      flex-1
      min-w-0
      bg-transparent
      outline-none
      resize-none
      text-white
      placeholder-zinc-400
      text-sm
      leading-7
       
      min-h-[24px]
      max-h-[300px]
      overflow-y-auto
      ${isExpanded ? "pt-[2px]" : ""}
    `}
    style={{
    height:"auto",
    display:"flex",
    alignItems:isExpanded ? 'flex-end' : 'center',
    transition:"height 0.12s ease"
  }}
    placeholder={
      mode === "image"
        ? "Describe the image you want..."
        : mode === "research"
        ? "Ask for deep research..."
        : mode === "thinking"
        ? "Think step-by-step..."
        : "Ask anything"
    }
    rows={1}
  />
</div>

    {/* 🎤 + 🚀 RIGHT SIDE */}
   <div className={`ml-auto flex gap-2 flex-shrink-0 ${isExpanded ? "items-end" : "items-center"}`}>

      {/* MIC */}
      <button
        onClick={handleMicClick}
        disabled={isLoading}
        className={`p-2 rounded-full transition ${
          isListening
            ? "bg-red-500 text-white"
            : "text-zinc-400 hover:text-white hover:bg-zinc-700"
        }`}
      >
        <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* SEND */}
      <button
        onClick={() => {
          const message = msg;
          const filesToSend=files;
          send(message,filesToSend);   // send files + text
          setFiles([]);
          setMsg("");
        }}
        disabled={(!msg.trim() && files.length === 0) || isLoading}
        className={`
          flex items-center justify-center
          w-8 h-8 sm:w-9 sm:h-9
          rounded-full
          transition
          ${
            (msg.trim() || files.length > 0) && !isLoading
              ? "bg-white text-black hover:scale-105"
              : "bg-zinc-700 text-zinc-400"
          }
        `}
      >
        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

    </div>

  </div>
</div>
    




      {/* ✅ ADD YOUR POPUP HERE */}
<div className="relative w-full" ref={menuRef}>
  {menuOpen && (
    <div className="absolute bottom-16 left-2 w-[85vw] max-w-xs sm:max-w-sm bg-[#2b2b2b] rounded-2xl shadow-xl border border-zinc-700 p-2 z-50">

      {/* Add files */}
      <button
        onClick={() => {
          fileInputRef.current.click();
          setMenuOpen(false);
        }}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-zinc-300 hover:bg-zinc-700"
      >
        <Upload size={18} />
        <span>Add photos & files</span>
      </button>

      {/* Create image */}
      <button
        onClick={() => {
          setMode("image");
          setMenuOpen(false);
        }}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-zinc-300 hover:bg-zinc-700"
      >
        <ImageIcon size={18} />
        <span>Create image</span>
      </button>

      {/* Deep research */}
      <button
        onClick={() => {
          setMode("research");
          setMenuOpen(false);
        }}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-zinc-300 hover:bg-zinc-700"
      >
        <Search size={18} />
        <span>Deep research</span>
      </button>

    </div>
  )}
</div>
      {/* Helper Text */}
      <div className="text-xs text-zinc-500 flex items-center gap-2">
        Press <kbd className="px-2 py-1 bg-zinc-800 rounded text-zinc-300 font-mono text-xs">Shift + Enter</kbd> for new line
      </div>
    </div>
  );
}

// ================= MAIN =================
export default function App() {
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState("");
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [zoom, setZoom] = useState(1);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1200);
  };

  const [chats, setChats] = useState([
    { id: 1, title: "New Chat", messages: [] },
  ]);

  const [activeChat, setActiveChat] = useState(1);
  const currentChat = chats.find((c) => c.id === activeChat);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat.messages, isLoading]);

  const send = (message="", files = []) => {
  if (!message.trim() && files.length === 0) return;

  const processedFiles = files.map(file => ({
    name: file.name,
    type: file.type,
    url: URL.createObjectURL(file),
    category: file.type.split("/")[0],
    size: (file.size / 1024 < 1024)
      ? `${(file.size / 1024).toFixed(1)} KB`
      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
  }));

  const userMessage = {
    role: "user",
    content: message, // ✅ FIXED
    files: processedFiles,
    timestamp: Date.now(),
  };

  setChats((prev) =>
    prev.map((c) =>
      c.id === activeChat
        ? { ...c, messages: [...c.messages, userMessage] }
        : c
    )
  );

  setMsg("");
  setIsLoading(true);

  setTimeout(() => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat
          ? {
              ...c,
              messages: [
                ...c.messages,
                { role: "ai", content: "AI response...", timestamp: Date.now() },
              ],
            }
          : c
      )
    );
    setIsLoading(false);
  }, 800);
};

  const newChat = () => {
    const chat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [chat, ...prev]);
    setActiveChat(chat.id);
  };

  const updateMessage = (index, text) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat
          ? {
              ...c,
              messages: c.messages
                .slice(0, index + 1)
                .map((m, i) =>
                  i === index ? { ...m, content: text, timestamp: Date.now() } : m
                ),
            }
          : c
      )
    );
  };

  const branchChat = (text) => {
    const chat = {
      id: Date.now(),
      title: text.slice(0, 20),
      messages: [{ role: "user", content: text }],
    };

    setChats((prev) => [chat, ...prev]);
    setActiveChat(chat.id);
  };

  const regenerateResponse = () => {
    setIsLoading(true);
    setTimeout(() => {
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChat
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { role: "ai", content: "AI response...", timestamp: Date.now() },
                ],
              }
            : c
        )
      );
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-white">

      <Sidebar
        open={open}
        chats={chats}
        setActiveChat={setActiveChat}
        newChat={newChat}
        setOpen={setOpen}
      />

      <div className="flex-1 flex flex-col">

        <div className="p-3 border-b border-zinc-800 flex items-center gap-2">
          {!open && (
            <button 
              onClick={() => setOpen(true)}
              className="p-1 hover:bg-zinc-700 rounded relative group"
              title="Open sidebar"
            >
              <PanelLeftOpen />
              <span className="absolute top-full left-0 mt-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">Open</span>
            </button>
          )}
          <span>ChatGPT</span>
        </div>

        {currentChat.messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <h1 className="text-2xl md:text-3xl text-zinc-300 mb-10 font-semibold">
              What's on your mind today?
            </h1>
            <div className="w-full px-4">
              <ChatInput msg={msg} setMsg={setMsg} send={send} isLoading={isLoading} />
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-28">
              {currentChat.messages.map((m, i) => (
                <MessageItem
                  key={i}
                  m={m}
                  i={i}
                  updateMessage={updateMessage}
                  showToast={showToast}
                  branchChat={branchChat}
                  regenerateResponse={regenerateResponse}
                  setPreview={setPreview}
                />
              ))}
              
              {isLoading && (
                <div className="flex flex-col mb-6">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-[#0d0d0d]">
              <ChatInput msg={msg} setMsg={setMsg} send={send} isLoading={isLoading} />
            </div>
          </>
        )}

        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-lg">
            {toast}
          </div>
        )}
      </div>
      {preview && (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
    onClick={() => {
      setPreview(null);
      setZoom(1);
    }}
  >

    {/* 🔝 TOP RIGHT BUTTONS (OUTSIDE CARD) */}
    <div className="absolute top-4 right-4 flex gap-3 z-50">

      <button
        onClick={(e) => {
          e.stopPropagation();
          const a = document.createElement("a");
          a.href = preview.url;
          a.download = preview.name;
          a.click();
        }}
        className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition"
      >
        <Download size={18} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setPreview(null);
          setZoom(1);
        }}
        className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition"
      >
        <X size={18} />
      </button>

    </div>

    {/* 🖼 IMAGE AREA */}
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={preview.url}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center"
        }}
        className="max-h-[70vh] max-w-full object-contain transition-transform duration-300"
      />
    </div>

    {/* 🔻 ZOOM CONTROLS (BOTTOM CENTER) */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-50">

      <button
        onClick={(e) => {
          e.stopPropagation();
          setZoom((z) => Math.max(0.5, z - 0.2));
        }}
        className="bg-zinc-800 p-3 rounded-xl hover:scale-110 transition"
      >
        <ZoomOut size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setZoom((z) => Math.min(z + 0.2, 3));
        }}
        className="bg-zinc-800 p-3 rounded-xl hover:scale-110 transition"
      >
        <ZoomIn size={20} />
      </button>

    </div>

    {/* 📄 FILE INFO */}
    <div className="absolute bottom-6 left-6 text-sm text-zinc-300 z-50">
      {preview.name} • {preview.size}
    </div>

  </div>
)}
    </div>
  );
}
    
