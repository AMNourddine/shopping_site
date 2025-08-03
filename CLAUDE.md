# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` - Start development server on localhost:3000
- `npm run build` - Build production bundle to `build/` folder
- `npm test` - Run tests in interactive watch mode

## Architecture Overview

This is a React e-commerce application named "orebishop" built with Create React App and styled with Tailwind CSS.

### Core Technologies
- **React 18** with functional components and hooks
- **Redux Toolkit** with Redux Persist for state management
- **React Router v6** for client-side routing
- **Tailwind CSS** for styling with custom configuration
- **Framer Motion** for animations
- **React Slick** for carousels

### Key Architecture Patterns

**State Management:**
- Redux store configured in `src/redux/store.js` with persistence
- Main slice `orebiSlice.js` handles cart functionality (add/remove items, quantity management)
- State persisted to localStorage via redux-persist

**Routing Structure:**
- Layout component wraps all pages with Header, HeaderBottom, SpecialCase, Footer, FooterBottom
- Main routes: Home (/), Shop (/shop), About (/about), Contact (/contact), Journal (/journal)
- Product detail route: `/product/:_id`
- Authentication routes outside main layout: SignIn (/signin), SignUp (/signup)

**Component Organization:**
- `src/components/` - Reusable UI components organized by feature
- `src/pages/` - Page-level components
- `src/assets/images/` - Static images organized by categories
- `src/constants/index.js` - Static data including navigation, product mock data

**Design System:**
- Custom Tailwind config with extended breakpoints, colors, and fonts
- Primary color: `#262626`, light text: `#6D6D6D`
- Custom fonts: DM Sans (body), Poppins (titles)
- Responsive breakpoints from xs (320px) to xl (1280px)

**Data Flow:**
- Product data stored in `constants/index.js` as mock data arrays
- Shopping cart managed via Redux with actions for add/remove/update quantity
- Product images imported from `assets/images/index.js`

### Important Implementation Notes
- Note: There's a typo in the Redux slice - `drecreaseQuantity` should be `decreaseQuantity`
- Mobile navigation uses side drawer with category/brand filtering
- Product pagination implemented for shop page
- Payment integration placeholder exists but not fully implemented