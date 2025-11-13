import React, { useState } from 'react';
import { Confession, AdminSettings, ConfessionStatus } from '../types';

interface AdminPanelProps {
  confessions: Confession[];
  onUpdate: (confession: Confession) => void;
  onDelete: (id: string) => void;
  adminSettings: AdminSettings;
  setAdminSettings: (settings: AdminSettings) => void;
}

type FilterType = 'all' | 'pending' | 'flagged';

const AdminPanel: React.FC<AdminPanelProps> = ({ confessions, onUpdate, onDelete, adminSettings, setAdminSettings }) => {
  const [filter, setFilter] = useState<FilterType>('pending');
  
  const handleApprove = (confession: Confession) => {
    onUpdate({ ...confession, status: ConfessionStatus.Approved });
  };

  const handleRetentionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(e.target.value, 10);
    if (!isNaN(days) && days > 0) {
      setAdminSettings({ ...adminSettings, retentionDays: days });
    }
  };

  const getFilteredConfessions = () => {
    switch (filter) {
      case 'pending':
        return confessions.filter(c => c.status === ConfessionStatus.Pending);
      case 'flagged':
        return confessions.filter(c => c.status === ConfessionStatus.Flagged);
      case 'all':
      default:
        return confessions;
    }
  };

  const filteredConfessions = getFilteredConfessions();
  
  const getStatusColor = (status: ConfessionStatus) => {
    switch(status) {
      case ConfessionStatus.Approved: return 'text-green-400 bg-green-900/50';
      case ConfessionStatus.Pending: return 'text-yellow-400 bg-yellow-900/50';
      case ConfessionStatus.Flagged: return 'text-red-400 bg-red-900/50';
      default: return 'text-gray-400 bg-gray-700';
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 space-y-6">
      <h2 className="text-2xl font-bold text-cyan-400">Admin Moderation Panel</h2>
      
      <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Settings</h3>
        <label className="flex items-center gap-4">
          <span className="text-gray-300">Auto-delete posts older than:</span>
          <input
            type="number"
            value={adminSettings.retentionDays}
            onChange={handleRetentionChange}
            className="w-24 bg-gray-800 border border-gray-600 rounded-md p-2 text-center"
          />
          <span className="text-gray-300">days</span>
        </label>
      </div>

      <div>
        <div className="flex space-x-2 border-b border-gray-700 mb-4">
          <TabButton label="Pending" isActive={filter === 'pending'} onClick={() => setFilter('pending')} />
          <TabButton label="Flagged" isActive={filter === 'flagged'} onClick={() => setFilter('flagged')} />
          <TabButton label="All" isActive={filter === 'all'} onClick={() => setFilter('all')} />
        </div>
        
        <div className="space-y-4">
          {filteredConfessions.length > 0 ? filteredConfessions.map(confession => (
            <div key={confession.id} className="bg-gray-900 p-4 rounded-md border border-gray-700">
              <div className="flex justify-between items-start">
                  <p className="text-gray-300 pr-4">{confession.content}</p>
                  <span className={`text-xs font-mono px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(confession.status)}`}>
                    {confession.status}
                  </span>
              </div>
              {confession.moderationReason && <p className="text-xs text-cyan-300 mt-2 italic">AI Reason: {confession.moderationReason}</p>}
              <div className="flex space-x-2 mt-4">
                {confession.status !== ConfessionStatus.Approved && (
                    <button onClick={() => handleApprove(confession)} className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-3 rounded">
                      Approve
                    </button>
                )}
                <button onClick={() => onDelete(confession.id)} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-3 rounded">
                  Delete
                </button>
              </div>
            </div>
          )) : <p className="text-gray-500 text-center py-4">No confessions match this filter.</p>}
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({label, isActive, onClick}) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'border-b-2 border-cyan-500 text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
        {label}
    </button>
);


export default AdminPanel;