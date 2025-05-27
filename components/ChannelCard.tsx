
import React, { useState } from 'react';
import type { TVChannel } from '../types';
import { PlayCircleIcon } from './icons'; // Placeholder for a play icon on hover

// Fix: Define ChannelCardProps interface
interface ChannelCardProps {
  channel: TVChannel;
  onSelectChannel: (channel: TVChannel) => void;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ channel, onSelectChannel }) => {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <button
      onClick={() => onSelectChannel(channel)}
      className="bg-gradient-to-br from-neutral-800 to-neutral-800/90 rounded-lg shadow-lg p-2.5 text-center transition-all duration-300 ease-out group
                 hover:from-neutral-700/90 hover:to-neutral-700/80 hover:shadow-sky-500/20 hover:shadow-2xl hover:scale-[1.04] 
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-opacity-75"
      aria-label={`播放 ${channel.name}`}
    >
      <div className="aspect-[16/9] w-full bg-neutral-700/60 rounded-md mb-2.5 flex items-center justify-center overflow-hidden relative">
        {channel.logoUrl && !imgError ? (
          <img 
            src={channel.logoUrl} 
            alt={`${channel.name} logo`}
            onError={handleImageError}
            className="max-w-full max-h-full object-contain transition-opacity duration-300 group-hover:opacity-80"
            loading="lazy"
          />
        ) : (
          <div className="text-neutral-400 text-sm font-semibold px-1 break-words flex items-center justify-center h-full leading-tight">
            {channel.name}
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayCircleIcon className="w-10 h-10 text-white/80 transform scale-75 group-hover:scale-100 transition-transform duration-300" />
        </div>
      </div>
      <h3 className="text-xs md:text-sm font-medium text-neutral-200 truncate group-hover:text-sky-300 transition-colors duration-150">
        {channel.name}
      </h3>
    </button>
  );
};