import React from 'react';

type View = 'feed' | 'submit' | 'admin';
type UserRole = 'guest' | 'user' | 'admin';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  userRole: UserRole;
  onLogout: () => void;
}

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  // Fix: Replaced JSX.Element with React.ReactNode to resolve namespace error.
  icon: React.ReactNode;
}> = ({ label, isActive, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
      isActive
        ? 'bg-cyan-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {icon}
    {label}
  </button>
);

const Header: React.FC<HeaderProps> = ({ currentView, setView, userRole, onLogout }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 shadow-md">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-cyan-400">WhisperVault</h1>
          </div>
          <div className="flex items-center space-x-2">
            <NavButton
              label="Feed"
              isActive={currentView === 'feed'}
              onClick={() => setView('feed')}
              icon={<HomeIcon />}
            />
            <NavButton
              label="Submit"
              isActive={currentView === 'submit'}
              onClick={() => setView('submit')}
              icon={<PlusIcon />}
            />
            {userRole === 'admin' && (
              <NavButton
                label="Admin"
                isActive={currentView === 'admin'}
                onClick={() => setView('admin')}
                icon={<ShieldIcon />}
              />
            )}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-gray-300 hover:bg-red-600/80 hover:text-white"
              aria-label="Logout"
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

// SVG Icons
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5.02.956.956 0 002 5.922V11a.956.956 0 00.166.502 11.954 11.954 0 017.834 8.056.956.956 0 001 0 11.954 11.954 0 017.834-8.056.956.956 0 00.166-.502V5.922a.956.956 0 00-.166-.803A11.954 11.954 0 0110 1.944zM8 10a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
  </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5.414l7.293 7.293a1 1 0 001.414-1.414L5.414 4H8a1 1 0 100-2H4a1 1 0 00-1 1zM16 5a1 1 0 011 1v8a1 1 0 01-1 1H9a1 1 0 110-2h6V6a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);


export default Header;
