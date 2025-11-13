import React, { useState } from 'react';
import { Confession } from '../types';

interface ConfessionCardProps {
  confession: Confession;
  onUpdate: (confession: Confession) => void;
}

const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

const ConfessionCard: React.FC<ConfessionCardProps> = ({ confession, onUpdate }) => {
  const [isRead, setIsRead] = useState(confession.hasBeenRead);

  const handleReadOnce = () => {
    onUpdate({ ...confession, hasBeenRead: true });
    setIsRead(true);
  };

  const handleUpvote = () => {
    onUpdate({ ...confession, upvotes: confession.upvotes + 1 });
  }

  if (confession.isReadOnce && isRead) {
    return null;
  }
  
  if (confession.isReadOnce && !isRead) {
      return (
        <div className="bg-gray-800 border border-cyan-500/50 rounded-lg p-4 flex flex-col items-center justify-center h-48 animate-pulse">
            <p className="text-cyan-400 font-semibold mb-2">This confession can only be read once.</p>
            <button
                onClick={handleReadOnce}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                Reveal
            </button>
        </div>
      )
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-cyan-500/20 border border-gray-700">
      <div className="p-5">
        <div className="flex justify-between items-start text-xs text-gray-400 mb-3">
            <div>
                {confession.tone && <span className="font-semibold bg-gray-700 text-cyan-300 px-2 py-1 rounded-full">{confession.tone} Tone</span>}
                {confession.postType === 'emoji' && <span className="font-semibold bg-gray-700 text-yellow-300 px-2 py-1 rounded-full">Emoji Only</span>}
            </div>
            <span>{timeAgo(confession.createdAt)}</span>
        </div>
        
        <p className={`text-gray-200 whitespace-pre-wrap ${confession.postType === 'emoji' ? 'text-4xl' : 'text-base'}`}>
            {confession.content}
        </p>
        
        {confession.imageUrl && (
            <div className="mt-4">
                <img src={confession.imageUrl} alt="Confession visual" className="rounded-lg w-full h-auto object-cover"/>
            </div>
        )}

      </div>
      <div className="bg-gray-800/50 px-5 py-3 flex justify-between items-center text-sm text-gray-400 border-t border-gray-700">
          <div className="flex items-center gap-4">
            <button onClick={handleUpvote} className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>{confession.upvotes}</span>
            </button>
            <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.894 8.894 0 01-4.386-1.102A.5.5 0 015 15.585V13a1 1 0 011-1h1.536A6.978 6.978 0 0013 8H7a1 1 0 01-1-1V6a1 1 0 011-1h2.268A6.978 6.978 0 005 1h1.536a1 1 0 01.82.422A8.895 8.895 0 0118 10zm-8-3a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <span>{confession.comments.length}</span>
            </div>
          </div>
          {confession.commentsLocked && (
            <div className="flex items-center gap-1 text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Comments Locked</span>
            </div>
          )}
      </div>
    </div>
  );
};

export default ConfessionCard;