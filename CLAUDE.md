# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React (version 17.0.2) using Create React App. It's a standard React project with the default CRA structure and configuration.

## Development Commands

### Essential Commands
- `npm start` - Starts the development server on localhost:3000 with hot reloading
- `npm test` - Runs the test suite in interactive watch mode
- `npm run build` - Creates an optimized production build in the `/build` folder
- `npm run eject` - Ejects from Create React App (one-way operation, avoid unless necessary)

### Testing
- Run all tests: `npm test`
- Tests use Jest and React Testing Library
- Test files follow the pattern `*.test.js` or are located in `__tests__` folders

## Project Structure

This is a standard Create React App structure:

```
src/
├── App.js          # Main App component
├── App.css         # App-specific styles
├── App.test.js     # App component tests
├── index.js        # React app entry point
├── index.css       # Global styles
├── logo.svg        # React logo asset
├── reportWebVitals.js  # Performance monitoring
└── setupTests.js   # Test configuration

public/
├── index.html      # Main HTML template
├── favicon.ico     # Site favicon
├── manifest.json   # PWA manifest
└── robots.txt      # SEO robots file
```

## Architecture Notes

- **Single Page Application**: Uses React without routing (currently shows default CRA content)
- **Styling**: Uses CSS files (App.css, index.css) - no CSS frameworks detected
- **State Management**: Currently uses React's built-in state management
- **Testing**: Jest + React Testing Library setup via CRA
- **Build Tool**: Webpack via react-scripts (hidden by CRA)

## Key Files

- `src/App.js` - Main application component that needs to be customized for the portfolio
- `src/index.js` - Application entry point with React.StrictMode enabled
- `package.json` - Dependencies and scripts configuration
- `public/index.html` - HTML template that loads the React app

## Development Notes

- This appears to be a fresh Create React App installation that needs portfolio content
- The project uses React 17.0.2 (older version, consider upgrading)
- ESLint is configured with react-app rules
- No TypeScript configuration detected - uses JavaScript
- No custom webpack configuration (uses CRA defaults)