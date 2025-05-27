
import React from 'react';
import { ChannelCard } from './ChannelCard';
import type { TVChannel } from '../types';

interface ChannelGridProps {
  channels: TVChannel[];
  onSelectChannel: (channel: TVChannel) => void;
}

export const ChannelGrid: React.FC<ChannelGridProps> = ({ channels, onSelectChannel }) => {
  if (channels.length === 0) {
    return <div className="text-center text-neutral-500 py-10">此分类下暂无频道。</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4">
      {channels.map((channel) => (
        <ChannelCard 
          key={channel.id} 
          channel={channel} 
          onSelectChannel={onSelectChannel} 
        />
      ))}
    </div>
  );
};
