# PassCheck - Advanced Password Strength Checker

PassCheck is a modern, real-time Password Strength Checker built with React, Vite, and Tailwind CSS. It features secure k-Anonymity HaveIBeenPwned API integration, `zxcvbn` heuristics, and Progressive Web App (PWA) support.

## Features
- **Live App**: [https://password-strength-checker-sooty-two.vercel.app](https://password-strength-checker-sooty-two.vercel.app)
- **GitHub**: [https://github.com/Tamanash-009/password-strength-checker](https://github.com/Tamanash-009/password-strength-checker)
- **Real-Time Evaluation**: Powered by Dropbox's `zxcvbn` library for accurate strength estimation and offline crack times.
- **Secure Breach Detection**: Checks the HaveIBeenPwned API using a secure SHA-1 k-Anonymity model (only sends the first 5 characters of the hash).
- **Smart Suggestions**: Provides actionable feedback to improve password strength (e.g., adding numbers, symbols, avoiding patterns).
- **Passphrase Generator**: Generates memorable, high-entropy 4-word passphrases.
- **Modern UI**: Dark/Light mode toggle, smooth animations, fully responsive design, and accessible inputs.
- **Progressive Web App (PWA)**: Installable on Android and Desktop via supported browsers for an app-like experience.

## Setup and Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Tech Stack
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Logic**: zxcvbn, Web Crypto API
- **PWA**: vite-plugin-pwa

## Copyright & Terms
Copyright © 2026 PassCheck Contributors.
This project is open-source and available for educational and personal use. By using this software, you agree that the creators are not liable for any security breaches or password compromises that may occur outside of this application's scope. All password evaluations happen entirely on the client side.

---
*Built with ❤️ and security best practices.*
