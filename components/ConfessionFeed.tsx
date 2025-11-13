
import React from 'react';
import { Confession } from '../types';
import ConfessionCard from './ConfessionCard';

interface ConfessionFeedProps {
  confessions: Confession[];
  onUpdate: (confession: Confession) => void;
}

const ConfessionFeed: React.FC<ConfessionFeedProps> = ({ confessions, onUpdate }) => {
  const visibleConfessions = confessions.filter(c => !(c.isReadOnce && c.hasBeenRead));

  if (visibleConfessions.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">The vault is quiet...</p>
        <p className="text-gray-500 text-sm">No new confessions to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {visibleConfessions.map(confession => (
        <ConfessionCard key={confession.id} confession={confession} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default ConfessionFeed;
