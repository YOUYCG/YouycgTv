import React, { useEffect, useRef, useState } from 'react';
import type { TVChannel } from '../types';
import { PlayCircleIcon, AlertTriangleIcon, LoaderIcon } from './icons';

declare const Hls: any;

interface PlayerViewProps {
  channel: TVChannel;
}

export const PlayerView: React.FC<PlayerViewProps> = ({ channel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const recoverCountsRef = useRef<{ media: number; network: number }>({ media: 0, network: 0 });

  useEffect(() => {
    if (typeof Hls === 'undefined') {
      console.error("HLS.js is not loaded.");
      setError("播放器库加载失败。");
      setIsLoading(false);
      return;
    }

    const videoElement = videoRef.current;
    if (!videoElement) return;

    setIsLoading(true);
    setError(null);
    setIsPlaying(false);
    recoverCountsRef.current = { media: 0, network: 0 };

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    
    if (Hls.isSupported()) {
      const hls = new Hls({
        capLevelToPlayerSize: true,
        // Leave maxBufferSize at library default (≈60MB). Setting a tiny value causes frequent stalls.
        // Tune live buffering moderately to reduce rebuffering while keeping latency reasonable.
        maxBufferLength: 20,
        backBufferLength: 60,
        lowLatencyMode: true,
        // Slightly relax timeouts to tolerate slower networks/CDNs.
        fragLoadTimeout: 20000,
        manifestLoadTimeout: 20000,
        // debug: process.env.NODE_ENV === 'development'
      });
      hlsRef.current = hls;

      hls.loadSource(channel.streamUrl);
      hls.attachMedia(videoElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play().catch((playError) => {
          console.warn("Autoplay was prevented:", playError);
        });
        // 'onplaying' will clear loading state
      });

      hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
        // Non-fatal errors should not surface to the UI as \"无法播放\"
        if (!data.fatal) {
          console.warn('Non-fatal HLS error:', data);
          // Show a spinner if we are stalled, but don't mark as error
          if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
            setIsLoading(true);
          }
          // For intermittent network hiccups ask hls.js to resume loading
          if (
            data.type === Hls.ErrorTypes.NETWORK_ERROR &&
            (data.details === Hls.ErrorDetails.FRAG_LOAD_TIMEOUT ||
             data.details === Hls.ErrorDetails.FRAG_LOAD_ERROR ||
             data.details === Hls.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT ||
             data.details === Hls.ErrorDetails.AUDIO_TRACK_LOAD_ERROR)
          ) {
            try { hls.startLoad(); } catch {}
          }
          return;
        }

        // Fatal errors – try to recover a few times, then surface error
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          recoverCountsRef.current.network += 1;
          if (recoverCountsRef.current.network <= 3) {
            console.warn('Recovering from fatal network error, attempt', recoverCountsRef.current.network);
            try { hls.startLoad(); } catch {}
            setIsLoading(true);
            return;
          }
          setError(`网络错误: ${data.details || '无法连接直播源'}`);
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          recoverCountsRef.current.media += 1;
          if (recoverCountsRef.current.media <= 2) {
            console.warn('Recovering from fatal media error, attempt', recoverCountsRef.current.media);
            try { hls.recoverMediaError(); } catch {}
            setIsLoading(true);
            return;
          }
          setError(`媒体错误: ${data.details || '视频流解码失败'}`);
        } else {
          setError(`播放失败: ${data.details || '未知错误'}`);
        }

        setIsLoading(false);
        setIsPlaying(false);
      });
      
      videoElement.onwaiting = () => {
        setIsLoading(true);
        setIsPlaying(false);
      };
      videoElement.onplaying = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };
      videoElement.onpause = () => setIsPlaying(false);
      videoElement.onended = () => setIsPlaying(false);
      videoElement.onerror = () => { 
        setError('视频播放器遇到错误。');
        setIsLoading(false);
        setIsPlaying(false);
      };

    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = channel.streamUrl;
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play().catch((playError) => console.warn("Autoplay prevented (native HLS):", playError));
        setIsLoading(false);
      });
      videoElement.addEventListener('error', () => {
        setError('无法加载视频流 (原生HLS)。');
        setIsLoading(false);
        setIsPlaying(false);
      });
      videoElement.onplaying = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };
      videoElement.onpause = () => setIsPlaying(false);
      videoElement.onended = () => setIsPlaying(false);
    } else {
      setError('您的浏览器不支持HLS播放。');
      setIsLoading(false);
      setIsPlaying(false);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (videoElement) {
        videoElement.onwaiting = null;
        videoElement.onplaying = null;
        videoElement.onpause = null;
        videoElement.onended = null;
        videoElement.onerror = null;
        videoElement.src = '';
        videoElement.removeAttribute('src');
        videoElement.load();
      }
    };
  }, [channel.streamUrl, channel.id]);

  return (
    <div className="w-full h-full bg-black rounded-lg shadow-2xl flex flex-col items-center justify-center text-neutral-300 relative overflow-hidden">
      <video
        ref={videoRef}
        controls
        autoPlay
        playsInline
        muted
        className="w-full h-full object-contain rounded-lg"
        aria-label={`${channel.name} stream`}
        poster={channel.logoUrl && !error ? channel.logoUrl : undefined}
      />
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg z-10 p-4 text-center transition-opacity duration-200">
          <LoaderIcon className="w-12 h-12 sm:w-16 sm:h-16 text-sky-400 animate-spin mb-4" />
          <p className="text-neutral-200 text-sm sm:text-base">正在加载: {channel.name}</p>
        </div>
      )}
      {!isLoading && error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 rounded-lg z-10 text-center transition-opacity duration-200">
          <AlertTriangleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4" />
          <p className="text-base sm:text-lg font-semibold text-neutral-100 mb-2">无法播放频道</p>
          <p className="text-sm text-neutral-300 mb-1 truncate max-w-xs">{channel.name}</p>
          <p className="text-xs text-red-400 break-words max-w-md">{error}</p>
          <p className="text-xs text-neutral-500 mt-3">请尝试其他频道或检查直播源。</p>
        </div>
      )}
       {!isLoading && !error && isPlaying && (
         <div 
            className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white py-1.5 px-3.5 rounded-lg text-xs md:text-sm shadow-lg"
            aria-live="polite"
          >
           <span className="font-semibold">正在播放:</span> {channel.name}
         </div>
       )}
    </div>
  );
};