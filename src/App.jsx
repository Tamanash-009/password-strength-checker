import React, { useState, useEffect, useCallback } from 'react';
import { Moon, Sun, ShieldCheck, ShieldAlert, Loader2 } from 'lucide-react';
import PasswordInput from './components/PasswordInput';
import StrengthMeter from './components/StrengthMeter';
import Suggestions from './components/Suggestions';
import { evaluatePassword, checkBreach } from './utils/passwordUtils';

function App() {
  const [password, setPassword] = useState('');
  const [evaluation, setEvaluation] = useState({ score: 0, feedback: { suggestions: [], warning: "" }, crackTime: "Instant" });
  const [breachData, setBreachData] = useState({ breached: false, count: 0, loading: false, error: false });
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Handle Dark Mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Debounce logic for evaluation and API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (password) {
        // Evaluate locally
        const result = evaluatePassword(password);
        setEvaluation(result);

        // Check HaveIBeenPwned API
        setBreachData(prev => ({ ...prev, loading: true, error: false }));
        checkBreach(password).then(breachResult => {
          setBreachData({
            breached: breachResult.breached,
            count: breachResult.count,
            loading: false,
            error: breachResult.error || false
          });
        });
      } else {
        setEvaluation({ score: 0, feedback: { suggestions: [], warning: "" }, crackTime: "Instant" });
        setBreachData({ breached: false, count: 0, loading: false, error: false });
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [password]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      {/* Header and Theme Toggle */}
      <div className="w-full max-w-xl flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PassCheck</h1>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8 transition-colors duration-300">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Password Strength Checker
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Securely test your password strength. We never store or send your raw password.
          </p>
        </div>

        <PasswordInput password={password} setPassword={setPassword} />
        
        <StrengthMeter score={evaluation.score} crackTime={evaluation.crackTime} />
        
        {/* Breach Status Warning */}
        {password && (
          <div className="mt-4">
            {breachData.loading ? (
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Checking for breaches...
              </div>
            ) : breachData.breached ? (
              <div className="flex items-start p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
                <ShieldAlert className="w-5 h-5 text-red-500 mr-3 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-red-800 dark:text-red-400">Password Compromised!</h3>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    This password has appeared in <span className="font-bold">{breachData.count.toLocaleString()}</span> known data breaches. Please choose a different password.
                  </p>
                </div>
              </div>
            ) : breachData.error ? (
              <div className="text-sm text-yellow-600 dark:text-yellow-400">
                Could not verify breach status at this time.
              </div>
            ) : password.length > 0 && !breachData.loading && !breachData.error && !breachData.breached && (
              <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                <ShieldCheck className="w-5 h-5 mr-2" />
                No known breaches found. Good!
              </div>
            )}
          </div>
        )}

        <Suggestions suggestions={evaluation.feedback.suggestions} warning={evaluation.feedback.warning} />
        
      </div>
      
      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Your password is evaluated locally and securely hashed using k-Anonymity for breach checks.</p>
        <p className="mt-1">© {new Date().getFullYear()} PassCheck. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
