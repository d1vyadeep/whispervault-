import React from 'react';

interface LoginProps {
  onLogin: (role: 'user' | 'admin') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 font-sans p-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-5xl font-bold text-cyan-400 mb-2">WhisperVault</h1>
        <p className="text-gray-400 mb-8">Your secrets are safe here. Enter the vault.</p>
        <div className="space-y-4">
          <button
            onClick={() => onLogin('user')}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 transform hover:scale-105"
          >
            Login as User
          </button>
          <button
            onClick={() => onLogin('admin')}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 transform hover:scale-105"
          >
            Login as Admin
          </button>
        </div>
         <footer className="text-center p-4 mt-12 text-gray-500 text-xs">
            WhisperVault Demo. All confessions are examples and reset on refresh.
        </footer>
      </div>
    </div>
  );
};

export default Login;
