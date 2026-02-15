
import React from 'react';
import { CultureInsight } from '../types';

interface CultureFactProps {
  insight: CultureInsight | null;
  isLoading: boolean;
}

const CultureFact: React.FC<CultureFactProps> = ({ insight, isLoading }) => {
  if (isLoading && !insight) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (!insight) return null;

  return (
    <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{insight.topic}</h3>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base italic">
        "{insight.content}"
      </p>
    </div>
  );
};

export default CultureFact;
