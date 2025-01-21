# MoMoola Website

A modern, optimized Next.js website for MoMoola with email subscription functionality.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: 
	- Radix UI
	- Framer Motion
	- Lucide React Icons
- **Deployment**: Netlify
- **Email Integration**: EmailOctopus

## Features

- Responsive design
- Email subscription with EmailOctopus integration
- Animated UI components with Framer Motion
- Modern landing page sections
- SEO optimized
- Floating navigation
- Modal system for various interactions
- Privacy and Terms modals
- Calendar integration

## Components

### Landing Page Sections
- Hero section with animated components
- Features showcase
- Benefits overview
- About section
- Contact section with email signup

### Interactive Elements
- Email signup modals (light/dark variants)
- Calendar modal for scheduling
- Privacy and Terms modals
- Floating navigation bar
- Animated buttons and UI elements

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd momoola-website-optimised
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
EMAIL_OCTOPUS_API_KEY=your_api_key
EMAIL_OCTOPUS_LIST_ID=your_list_id
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:
```bash
npm run build
```

### Production

Start the production server:
```bash
npm start
```

## Project Structure

- `/src`
	- `/app` - Next.js app router pages and layouts
	- `/components`
		- `/forms` - Form components including EmailOctopus integration
		- `/landing-page` - Landing page section components
		- `/modals` - Modal components for various interactions
		- `/navigation` - Navigation components
		- `/footer` - Footer and related components
	- `/lib` - Utility functions and helpers
	- `/types` - TypeScript type definitions

## Environment Variables

- `EMAIL_OCTOPUS_API_KEY` - API key for EmailOctopus integration
- `EMAIL_OCTOPUS_LIST_ID` - List ID for EmailOctopus subscription

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

Private - All rights reserved