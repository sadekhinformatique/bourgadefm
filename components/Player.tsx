
import React, { useState, useRef, useEffect } from 'react';
import { PlayerState } from '../types';

const STREAM_URL = "https://radioburkinafm.ice.infomaniak.ch/radioburkinafm-128.mp3";

const Player: React.FC = () => {
  const [state, setState] = useState<PlayerState>(PlayerState.PAUSED);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    audioRef.current.volume = volume;

    const handlePlay = () => setState(PlayerState.PLAYING);
    const handlePause = () => setState(PlayerState.PAUSED);
    const handleLoadStart = () => setState(PlayerState.LOADING);
    const handleError = () => setState(PlayerState.ERROR);

    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);
    audioRef.current.addEventListener('loadstart', handleLoadStart);
    audioRef.current.addEventListener('error', handleError);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.removeEventListener('loadstart', handleLoadStart);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (state === PlayerState.PLAYING) {
      audioRef.current.pause();
    } else {
      // Re-load stream to ensure it's "live" and not buffered from last pause
      audioRef.current.src = STREAM_URL;
      audioRef.current.play().catch(e => {
        console.error("Playback failed", e);
        setState(PlayerState.ERROR);
      });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0) setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMute = !isMuted;
      setIsMuted(newMute);
      audioRef.current.muted = newMute;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Live Status Indicator */}
      <div className="flex items-center gap-2">
        <span className={`h-3 w-3 rounded-full ${state === PlayerState.PLAYING ? 'bg-red-600 animate-pulse' : 'bg-gray-400'}`}></span>
        <span className="text-sm font-bold text-gray-600 uppercase tracking-widest">
          {state === PlayerState.PLAYING ? 'En Direct' : state === PlayerState.LOADING ? 'Chargement...' : 'Hors Ligne'}
        </span>
      </div>

      {/* Main Control Button */}
      <button 
        onClick={togglePlay}
        disabled={state === PlayerState.LOADING}
        className={`group relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl ${
          state === PlayerState.PLAYING ? 'bg-red-600' : 'bg-emerald-600'
        } ${state === PlayerState.LOADING ? 'opacity-50 cursor-wait' : ''}`}
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
        {state === PlayerState.LOADING ? (
          <i className="fas fa-circle-notch fa-spin text-4xl text-white"></i>
        ) : state === PlayerState.PLAYING ? (
          <i className="fas fa-pause text-4xl text-white"></i>
        ) : (
          <i className="fas fa-play text-4xl text-white ml-2"></i>
        )}
      </button>

      {/* Volume Control */}
      <div className="w-full max-w-xs flex items-center gap-4 bg-gray-100 p-4 rounded-2xl shadow-inner">
        <button onClick={toggleMute} className="text-emerald-700 hover:text-emerald-900 transition-colors w-6">
          <i className={`fas ${isMuted || volume === 0 ? 'fa-volume-mute' : volume < 0.5 ? 'fa-volume-down' : 'fa-volume-up'} text-xl`}></i>
        </button>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={handleVolumeChange}
          className="flex-grow h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
        <span className="text-xs font-bold text-gray-500 w-8">{Math.round(volume * 100)}%</span>
      </div>

      {state === PlayerState.ERROR && (
        <p className="text-red-600 text-sm font-semibold animate-bounce">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          Erreur de connexion au flux. Veuillez réessayer.
        </p>
      )}
    </div>
  );
};

export default Player;
