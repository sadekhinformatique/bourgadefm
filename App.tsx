
import React, { useState, useEffect } from 'react';
import Player from './components/Player';
import CultureFact from './components/CultureFact';
import Header from './components/Header';
import { getCulturalInsight } from './services/gemini';
import { CultureInsight } from './types';

const App: React.FC = () => {
  const [insight, setInsight] = useState<CultureInsight | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(true);

  const fetchNewInsight = async () => {
    setLoadingInsight(true);
    const data = await getCulturalInsight();
    setInsight(data);
    setLoadingInsight(false);
  };

  useEffect(() => {
    fetchNewInsight();
    // Refresh insight every 5 minutes
    const interval = setInterval(fetchNewInsight, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl space-y-6">
        <Header />
        
        <main className="glass rounded-3xl p-6 md:p-10 shadow-2xl transition-all duration-500">
          <Player />
          
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
                <i className="fas fa-lightbulb text-yellow-500"></i>
                Le Saviez-vous ?
              </h2>
              <button 
                onClick={fetchNewInsight}
                disabled={loadingInsight}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 uppercase tracking-widest flex items-center gap-1 disabled:opacity-50"
              >
                <i className={`fas fa-sync-alt ${loadingInsight ? 'animate-spin' : ''}`}></i>
                Actualiser
              </button>
            </div>
            
            <CultureFact insight={insight} isLoading={loadingInsight} />
          </div>
        </main>

        <footer className="text-center text-white/80 text-sm font-medium">
          <p>© {new Date().getFullYear()} Radio Burkina - La Voix du Faso</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-yellow-400 transition-colors"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><i className="fab fa-twitter"></i></a>
            <a href="https://bourgadefm.com/" className="hover:text-yellow-400 transition-colors"><i className="fas fa-globe"></i></a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
