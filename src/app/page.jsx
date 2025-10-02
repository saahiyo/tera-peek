"use client";

import React, { useState, useRef, useEffect } from "react";
import { Copy, Link2, DownloadCloud, Search, Loader2, AlertTriangle, Menu, HelpCircle, Github, X, ChevronDown, Twitter, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeraPeek() {
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const inputRef = useRef(null);

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);


  const extractId = (input) => {
    if (!input) return "";
    try {
      const trimmed = input.trim();
      const urlMatch = trimmed.match(
        /(?:https?:\/\/(?:www\.)?(?:terabox|terasharelink|terashare|1024tera|teraboxcdn)(?:\.(?:com|net|org|app|cn)))\/s\/([^/?#]+)/i
      );
      if (urlMatch && urlMatch[1]) return urlMatch[1];
      const genericMatch = trimmed.match(/\/s\/([^/?#]+)/i);
      if (genericMatch && genericMatch[1]) return genericMatch[1];
      return trimmed.replace(/\/+$/, "");
    } catch (e) {
      console.error("extractId error:", e);
      return input.trim();
    }
  };

  const fetchMeta = async () => {
    setError("");
    setData(null);

    const trimmed = videoId.trim();
    if (!trimmed) {
      setError("❌ Please enter a video ID or share link.");
      return;
    }

    const id = extractId(trimmed);
    if (!id) {
      setError("⚠️ Could not extract a valid ID from the input.");
      return;
    }
    if (id && id !== trimmed) setVideoId(id);

    const apiUrl = `https://teraboxdownloderapi.revangeapi.workers.dev/?url=https://terabox.com/s/${encodeURIComponent(
      id
    )}`;

    try {
      setLoading(true);
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`API request failed with status ${res.status}`);
      const json = await res.json();

      if (!json || typeof json !== "object") throw new Error("Malformed API response.");
      if (!json.directlink) throw new Error("No direct link found in response.");

      setData(json);
    } catch (err) {
      console.error("fetchMeta error:", err);
      if (err.message && err.message.includes("NetworkError")) {
        setError("⚠️ Network error — check your connection or try again later.");
      } else if (err.message && err.message.includes("Failed to fetch")) {
        setError("⚠️ Request blocked — CORS or network issue. Consider using a server proxy.");
      } else {
        setError(err.message || "❌ Failed to fetch metadata. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setError("✅ Copied to clipboard");
      setTimeout(() => setError(""), 1500);
    } catch (e) {
      console.error("Clipboard error:", e);
      setError("⚠️ Copy failed — your browser may block clipboard access.");
    }
  };

  const humanFileSize = (bytes) => {
    if (bytes === undefined || bytes === null) return "-";
    if (bytes === 0) return "0 B";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    return (bytes / Math.pow(1024, i)).toFixed(i ? 2 : 0) + " " + sizes[i];
  };


  // Auto-focus input on page load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const clearInput = () => {
    setVideoId("");
    setError("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-950 p-4 sm:p-6 md:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between mb-8 gap-4 cursor-pointer">
          <div className="flex-1 min-w-[200px]">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
              TeraPeek
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-lg">
              Inspect Terabox/Terashare videos — paste a link or ID to preview, fetch metadata, and download.
            </p>
          </div>

          {/* Desktop menu with pill buttons */}
          <nav className="hidden md:flex gap-3 shrink-0 items-start">
            <div className="relative">
              <button
                onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 transition text-sm"
              >
                <HelpCircle size={16}/> Help
                <ChevronDown size={14} className={helpDropdownOpen ? "rotate-180" : ""} />
              </button>
              <AnimatePresence>
                {helpDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 z-50"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-3">Quick Tips</h3>
                      <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-600">•</span>
                          <span>Paste any Terabox/Terashare share link - the app will auto-extract the ID</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-600">•</span>
                          <span>Works with terabox.com, terasharelink.com, and similar domains</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-600">•</span>
                          <span>Click "Inspect" to fetch metadata and preview the video</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-600">•</span>
                          <span>Use "Open Link" to view in browser or "Download" to save</span>
                        </li>
                      </ul>
                      <h3 className="font-semibold text-sm mt-4 mb-3">FAQ</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-neutral-700 dark:text-neutral-200">Q: Is this tool free?</p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">A: Yes, it's completely free to use.</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-neutral-700 dark:text-neutral-200">Q: Do I need to create an account?</p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">A: No, just paste the link and start using it immediately.</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-neutral-700 dark:text-neutral-200">Q: Are downloads unlimited?</p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">A: Yes, there are no usage restrictions.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a href="https://github.com/saahiyo/tera-peek" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 transition text-sm">
              <Github size={16}/> Repo
            </a>
          </nav>

          {/* Mobile menu */}
          <div className="relative md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-50 p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800"
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <>
                  {/*menu dark overlay */}
                  <motion.div
                    className="fixed inset-0 bg-black/40 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setMenuOpen(false)}
                  />
                  {/*menu content */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-44 bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 z-50"
                  >
                    <a href="#how" className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-sm">
                      <HelpCircle size={16} /> Help
                    </a>
                    <a href="https://github.com/saahiyo/tera-peek" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-sm">
                      <Github size={16} /> Repo
                    </a>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </header>

        <main className="flex flex-col gap-6 md:gap-8">
          {/* Input card */}
          <motion.section
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 shadow-md w-full"
          >
            <label className="text-sm font-medium">Terabox video id or link</label>
            <div className="mt-3 flex flex-col sm:flex-row gap-3 w-full">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') fetchMeta(); }}
                  placeholder="Paste full link or just the id"
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 sm:px-4 py-3 pr-10 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {videoId && (
                  <button
                    onClick={clearInput}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200 hover:scale-110 hover:shadow-sm"
                    aria-label="Clear input"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <button
                onClick={fetchMeta}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 w-full sm:w-auto"
                aria-label="Fetch metadata"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} className="text-indigo-200" />} {" "}
                <span className="font-medium">{loading ? "Checking..." : "Inspect"}</span>
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-4 text-sm flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 w-full"
                >
                  <AlertTriangle size={16} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-4 text-xs text-neutral-500 leading-relaxed">Paste a full Terabox/Terashare share link or just the ID — the app will auto-extract it. This tool uses a public worker API, so availability may vary.</p>
          </motion.section>

          {/* Result panel */}
          <motion.section
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 shadow-md w-full"
          >
            {!data ? (
              <div className="flex flex-col items-center justify-center p-6 sm:p-12 text-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl min-h-[220px] sm:min-h-[300px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-lg sm:text-xl font-semibold">No video loaded yet</h2>
                  <p className="mt-2 text-neutral-500">Enter a link or ID and press <span className="font-medium">Inspect</span> to view metadata and preview the video.</p>
                </motion.div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Thumbnail */}
                <div className="rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm w-full aspect-video max-h-[320px]">
                  {data.thumb ? (
                    <img
                      src={data.thumb}
                      alt={data.file_name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500">No thumbnail</div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={data.directlink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition w-full sm:w-auto"
                  >
                    <Link2 size={16} /> Open Link
                  </a>
                  <a
                    href={data.directlink}
                    download
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition text-white w-full sm:w-auto"
                  >
                    <DownloadCloud size={16} /> Download
                  </a>
                </div>


                {/* Metadata */}
                <div className="p-4 sm:p-5 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm w-full overflow-x-auto">
                  <h3 className="text-lg font-semibold">Metadata</h3>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm break-words">
                      <span className="text-neutral-400">File name</span>
                      <div className="mt-1 font-medium">{data.file_name}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                      <span className="text-neutral-400">Size</span>
                      <div className="mt-1 font-medium">{data.size || humanFileSize(data.sizebytes)}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                      <span className="text-neutral-400">Size (bytes)</span>
                      <div className="mt-1 font-medium">{data.sizebytes ?? "-"}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm break-words col-span-1 sm:col-span-2">
                      <span className="text-neutral-400">Thumbnail</span>
                      <div className="mt-1 font-medium">{data.thumb ?? "-"}</div>
                    </div>
                  </div>

                  <details className="mt-4 text-sm">
                    <summary className="cursor-pointer">Raw JSON response</summary>
                    <pre className="mt-3 rounded p-3 bg-white dark:bg-neutral-800 text-xs overflow-auto max-w-full">{JSON.stringify(data, null, 2)}</pre>
                  </details>
                </div>
              </div>
            )}
          </motion.section>
        </main>

        <footer id="how" className="mt-8 text-sm text-neutral-500 leading-relaxed w-full">
          {/* How to get the id */}
          <div className="mb-6">
            <h4 className="font-semibold">How to get the id</h4>
            <ol className="mt-2 list-decimal pl-5 space-y-1">
              <li>Paste the full Terabox/Terashare share link or just the id.</li>
              <li>The app automatically extracts the id segment after <code className="rounded bg-neutral-100 px-1">/s/</code>.</li>
              <li>Click <strong>Inspect</strong> to fetch metadata.</li>
            </ol>
            <p className="mt-3">⚠️ This app uses a public worker proxy — avoid pasting sensitive links. For production, host your own proxy with server-side protection.</p>
          </div>
  
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 text-center text-xs">
            <p>© 2025 TeraPeek. Made with ❤️ by <a href="https://github.com/saahiyo" target="_blank" rel="noopener noreferrer"><span className="text-indigo-600 hover:underline font-bold">saahiyo</span></a></p>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}
