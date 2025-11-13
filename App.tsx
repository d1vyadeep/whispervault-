import React, { useState, useEffect, useCallback } from 'react';
import { Confession, AdminSettings, ConfessionStatus } from './types';
import { INITIAL_CONFESSIONS } from './constants';
import { moderateContent, ModerationResult } from './services/geminiService';

import Header from './components/Header';
import ConfessionFeed from './components/ConfessionFeed';
import SubmissionForm from './components/SubmissionForm';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

type View = 'feed' | 'submit' | 'admin';
type UserRole = 'guest' | 'user' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<View>('feed');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [confessions, setConfessions] = useState<Confession[]>(INITIAL_CONFESSIONS);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({ retentionDays: 30 });
  const [isLoading, setIsLoading] = useState(false);

  const applyRetentionPolicy = useCallback(() => {
    const now = new Date();
    const retentionMillis = adminSettings.retentionDays * 24 * 60 * 60 * 1000;
    setConfessions(currentConfessions =>
      currentConfessions.filter(c => now.getTime() - c.createdAt.getTime() < retentionMillis)
    );
  }, [adminSettings.retentionDays]);

  useEffect(() => {
    applyRetentionPolicy();
    const interval = setInterval(applyRetentionPolicy, 60 * 60 * 1000); // Check every hour
    return () => clearInterval(interval);
  }, [applyRetentionPolicy]);

  const handleAddConfession = async (newConfessionData: Omit<Confession, 'id' | 'createdAt' | 'comments' | 'upvotes' | 'status' | 'hasBeenRead'>) => {
    setIsLoading(true);
    try {
      const moderationResult: ModerationResult = await moderateContent(newConfessionData.content);

      let status: ConfessionStatus;
      switch (moderationResult.grade) {
        case 'A1':
          status = ConfessionStatus.Approved;
          break;
        case 'B2':
          status = ConfessionStatus.Pending;
          break;
        case 'C4':
          status = ConfessionStatus.Flagged;
          break;
        case 'X':
          status = ConfessionStatus.Rejected;
          break;
        default:
          status = ConfessionStatus.Pending;
      }

      if (status !== ConfessionStatus.Rejected) {
        const newConfession: Confession = {
          ...newConfessionData,
          id: Date.now().toString(),
          createdAt: new Date(),
          comments: [],
          upvotes: 0,
          status,
          moderationReason: moderationResult.reason,
          hasBeenRead: false,
        };
        setConfessions(prev => [newConfession, ...prev]);
      } else {
        // Optionally show a generic error message to the user
        alert("Your submission could not be processed.");
      }
    } catch (error) {
      console.error("Error adding confession:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
      setView('feed');
    }
  };
  
  const handleUpdateConfession = (updatedConfession: Confession) => {
    setConfessions(confessions.map(c => c.id === updatedConfession.id ? updatedConfession : c));
  };
  
  const handleDeleteConfession = (id: string) => {
    setConfessions(confessions.filter(c => c.id !== id));
  };

  const handleLogin = (role: 'user' | 'admin') => {
    setUserRole(role);
    setView('feed');
  };

  const handleLogout = () => {
    setUserRole('guest');
    setView('feed');
  };

  const renderContent = () => {
    switch (view) {
      case 'submit':
        return <SubmissionForm addConfession={handleAddConfession} isLoading={isLoading} />;
      case 'admin':
        // Ensure only admin can see this view
        if (userRole === 'admin') {
          return (
            <AdminPanel
              confessions={confessions}
              onUpdate={handleUpdateConfession}
              onDelete={handleDeleteConfession}
              adminSettings={adminSettings}
              setAdminSettings={setAdminSettings}
            />
          );
        }
        // Fallback for non-admin users trying to access admin view
        return <ConfessionFeed confessions={confessions.filter(c => c.status === ConfessionStatus.Approved)} onUpdate={handleUpdateConfession} />;
      case 'feed':
      default:
        return <ConfessionFeed confessions={confessions.filter(c => c.status === ConfessionStatus.Approved)} onUpdate={handleUpdateConfession} />;
    }
  };

  if (userRole === 'guest') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header currentView={view} setView={setView} userRole={userRole} onLogout={handleLogout} />
      <main className="max-w-2xl mx-auto p-4 sm:p-6">
        {renderContent()}
      </main>
       <footer className="text-center p-4 text-gray-500 text-xs">
          WhisperVault Demo. All confessions are examples and reset on refresh.
      </footer>
    </div>
  );
};

export default App;
