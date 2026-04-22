import React, { useState } from 'react';
import { Eye, EyeOff, Copy, RefreshCw, KeyRound, Check } from 'lucide-react';
import { generateStrongPassword, generatePassphrase } from '../utils/passwordUtils';

const PasswordInput = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password: ', err);
    }
  };

  const handleGenerate = (type) => {
    const newPassword = type === 'passphrase' ? generatePassphrase() : generateStrongPassword();
    setPassword(newPassword);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Password
      </label>
      <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
          className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm transition-colors"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleGenerate('strong')}
          className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-md"
        >
          <RefreshCw size={16} className="mr-2" />
          Generate Secure
        </button>
        <button
          onClick={() => handleGenerate('passphrase')}
          className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors border border-blue-200 dark:border-gray-600 shadow-sm"
        >
          <KeyRound size={16} className="mr-2" />
          Passphrase
        </button>
        <button
          onClick={handleCopy}
          disabled={!password}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 shadow-sm"
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
