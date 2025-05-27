import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, ArrowPathIcon, XMarkIcon } from './icons';

interface SourceEditorProps {
  isOpen: boolean;
  currentUrl: string;
  defaultUrl: string;
  onSubmit: (newUrl: string) => void;
  onReset: () => void;
  onClose: () => void;
}

export const SourceEditor: React.FC<SourceEditorProps> = ({
  isOpen,
  currentUrl,
  defaultUrl,
  onSubmit,
  onReset,
  onClose,
}) => {
  const [inputUrl, setInputUrl] = useState(currentUrl);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    setInputUrl(currentUrl);
  }, [currentUrl, isOpen]); 

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsAnimatingIn(true);
      }, 10); 
      return () => clearTimeout(timer);
    } else {
      setIsAnimatingIn(false);
    }
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onSubmit(inputUrl.trim());
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
      aria-modal="true"
      role="dialog"
      aria-labelledby="source-editor-title"
      onClick={onClose}
    >
      <div 
        className={`
          bg-neutral-800/95 border border-neutral-700/80 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg relative
          transform transition-all duration-300 ease-out
          ${isAnimatingIn 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-[10px]'}
        `}
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-500 hover:text-sky-400 transition-colors p-2 rounded-full hover:bg-neutral-700/50 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800"
          aria-label="关闭直播源编辑器"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <h2 id="source-editor-title" className="text-xl sm:text-2xl font-semibold text-neutral-100 mb-6 text-center">
          更改直播源
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="m3u-url-input" className="block text-sm font-medium text-neutral-300 mb-2">
              M3U 直播源 URL
            </label>
            <input
              type="url"
              id="m3u-url-input"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="例如: https://example.com/playlist.m3u"
              className="w-full py-3 px-4 bg-neutral-700/70 text-neutral-100 border border-neutral-600 rounded-lg 
                         focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none 
                         transition-all duration-150 ease-in-out shadow-sm placeholder-neutral-500"
              required
              aria-describedby="url-status-description"
            />
            <p id="url-status-description" className="text-xs text-neutral-400 mt-2.5">
              {currentUrl === defaultUrl ? "当前使用的是默认源。" : "当前使用的是自定义源。"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row-reverse gap-3 pt-3">
            <button
              type="submit"
              className="w-full sm:w-auto flex-1 bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 px-6 rounded-lg 
                         flex items-center justify-center gap-2.5 transition-all duration-150 ease-in-out 
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800 
                         shadow-md hover:shadow-lg transform active:scale-[0.98]"
            >
              <CheckCircleIcon className="w-5 h-5" />
              加载源
            </button>
            <button
              type="button"
              onClick={onReset}
              disabled={currentUrl === defaultUrl}
              className="w-full sm:w-auto flex-1 bg-neutral-600 hover:bg-neutral-500 text-neutral-100 font-medium py-3 px-6 rounded-lg 
                         flex items-center justify-center gap-2.5 transition-all duration-150 ease-in-out 
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800 
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-600 
                         transform active:scale-[0.98]"
            >
              <ArrowPathIcon className="w-5 h-5" />
              恢复默认
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};