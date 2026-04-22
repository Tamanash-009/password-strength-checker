import zxcvbn from 'zxcvbn';

// Words for passphrase generation
const wordsList = [
  "apple", "brave", "crane", "dance", "eagle", "flame", "grape", "house", "image", "juice",
  "knife", "lemon", "mouse", "night", "ocean", "peace", "queen", "river", "snake", "train",
  "uncle", "voice", "water", "xenon", "yacht", "zebra", "cloud", "dream", "earth", "field"
];

export const generatePassphrase = () => {
  let passphrase = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    passphrase.push(wordsList[randomIndex]);
  }
  return passphrase.join('-');
};

export const generateStrongPassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};

// SHA-1 hash function for browser
async function sha1(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
}

export const checkBreach = async (password) => {
  if (!password) return { breached: false, count: 0 };
  
  try {
    const hash = await sha1(password);
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.text();
    const lines = data.split('\n');
    
    for (let line of lines) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix === suffix) {
        return { breached: true, count: parseInt(count.trim(), 10) };
      }
    }
    
    return { breached: false, count: 0 };
  } catch (error) {
    console.error("Error checking breach:", error);
    return { breached: false, count: 0, error: true };
  }
};

export const evaluatePassword = (password) => {
  if (!password) return { score: 0, feedback: { suggestions: [], warning: "" }, crackTime: "Instant" };
  
  const result = zxcvbn(password);
  let score = result.score;
  let suggestions = [...result.feedback.suggestions];
  
  // Custom logic checks for extra educational feedback
  if (password.length < 8) {
    if (!suggestions.includes("Increase length to at least 8 characters")) {
      suggestions.push("Increase length to at least 8 characters");
    }
  }
  if (!/[A-Z]/.test(password)) {
    suggestions.push("Add uppercase letters");
  }
  if (!/[a-z]/.test(password)) {
    suggestions.push("Add lowercase letters");
  }
  if (!/[0-9]/.test(password)) {
    suggestions.push("Include numbers");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    suggestions.push("Add special characters (e.g., !@#$%)");
  }
  
  // Custom Sequence and Repetition checks
  if (/(.)\1{2,}/.test(password)) {
    suggestions.push("Avoid repeated characters (e.g., 'aaa')");
  }
  
  // Cap suggestions length to top 4 most important
  if (suggestions.length > 4) {
    suggestions = suggestions.slice(0, 4);
  }
  
  return {
    score: score,
    feedback: {
      warning: result.feedback.warning,
      suggestions: suggestions
    },
    crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second
  };
};
