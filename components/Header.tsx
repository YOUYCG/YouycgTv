import React from 'react';
import { ListIcon } from './icons';

interface HeaderProps {
  onToggleSourceEditor: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSourceEditor }) => {
  return (
    <header className="bg-neutral-900/75 backdrop-blur-md text-neutral-100 p-3 sm:p-4 shadow-lg flex justify-between items-center flex-shrink-0 border-b border-neutral-700/40">
      <h1 className="text-lg sm:text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
        YouycgTV
      </h1>
      <button 
        className="text-neutral-400 hover:text-sky-400 transition-all duration-200 p-2 rounded-full hover:bg-neutral-700/60 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
        aria-label="更改直播源或设置"
        onClick={onToggleSourceEditor}
      >
        <ListIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </header>
  );
};