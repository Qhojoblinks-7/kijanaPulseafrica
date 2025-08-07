# KijanaPulse Africa 🏆

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.10-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Discover African Sports Talent** - A modern platform connecting Africa's brightest sports talents with opportunities worldwide.

## 🚀 Features

### Core Functionality
- **Athlete Discovery**: Browse and discover talented African athletes across various sports
- **Profile Management**: Comprehensive athlete profiles with statistics and achievements
- **Live Matches**: Real-time match updates and live streaming capabilities
- **Talent Scouting**: Advanced search and filtering for scouts and coaches
- **Digital Classroom**: Educational resources for athlete development
- **Messaging System**: In-app communication between athletes, coaches, and scouts

### Modern Web Features
- **Progressive Web App (PWA)**: Installable app with offline capabilities
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark Mode**: Toggle between light and dark themes
- **Performance Optimized**: Fast loading with lazy loading and code splitting
- **SEO Optimized**: Built-in SEO with structured data and meta tags
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation support

### Technical Excellence
- **Modern React**: Built with React 19 and latest hooks
- **Type Safety**: Full TypeScript support (optional)
- **State Management**: React Query for server state, Context for client state
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Testing Ready**: Jest and React Testing Library setup
- **CI/CD Ready**: GitHub Actions and deployment configurations

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with concurrent features
- **Vite 6.3.5** - Lightning-fast build tool
- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **React Router 7.6.2** - Client-side routing
- **Framer Motion 11.0.0** - Animation library
- **React Query 3.39.3** - Server state management
- **React Hot Toast 2.4.1** - Toast notifications

### Development Tools
- **ESLint 9.25.0** - Code linting
- **Prettier 3.2.5** - Code formatting
- **TypeScript 5.4.2** - Type safety
- **Vite PWA Plugin** - Progressive web app features

### Performance & UX
- **React Helmet Async** - Document head management
- **React Error Boundary** - Error handling
- **Intersection Observer** - Lazy loading and animations
- **Service Workers** - Offline functionality

## 📦 Installation

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kijanapulseafrica.git
   cd kijanapulseafrica
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://api.kijanapulseafrica.com
VITE_API_KEY=your_api_key_here

# Analytics
VITE_GA_TRACKING_ID=your_ga_tracking_id
VITE_SENTRY_DSN=your_sentry_dsn

# Social Media
VITE_FACEBOOK_APP_ID=your_facebook_app_id
VITE_TWITTER_HANDLE=@kijanapulse

# Feature Flags
VITE_ENABLE_PWA=true
VITE_ENABLE_ANALYTICS=true
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Button, Card, etc.)
│   ├── Header/         # Navigation and header components
│   ├── Dashboard/      # Dashboard-specific components
│   └── ...
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── context/            # React Context providers
├── utils/              # Utility functions
├── data/               # Static data and mock APIs
├── assets/             # Images, icons, and static files
└── styles/             # Global styles and CSS modules
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#1282A2` - Main brand color
- **Secondary Yellow**: `#FCCA46` - Accent color
- **Dark Background**: `#0A1128` - Deep background
- **Success Green**: `#00C9A7` - Success states
- **Error Red**: `#E71D36` - Error states

### Typography
- **Headings**: Montserrat (700-900 weights)
- **Body Text**: Inter (300-700 weights)

### Components
- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Card**: Flexible card component with variants
- **Loading**: Skeleton loaders and spinners
- **Form**: Accessible form components with validation

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deployment Platforms

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

#### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

#### Manual Deployment
```bash
# Build the project
npm run build

# Upload dist/ folder to your web server
```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Testing Structure
- **Unit Tests**: Component and utility function tests
- **Integration Tests**: Page and feature tests
- **E2E Tests**: End-to-end user journey tests

## 📊 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 95+
- **SEO**: 100

### Optimization Features
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Images and components
- **Tree Shaking**: Unused code elimination
- **Service Workers**: Offline caching
- **Image Optimization**: WebP format with fallbacks

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
npm run analyze      # Analyze bundle size
```

### Code Quality
- **ESLint**: JavaScript/React linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety (optional)
- **Husky**: Git hooks for quality checks

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📱 PWA Features

### Installable App
- Add to home screen functionality
- Offline capabilities
- App-like experience

### Service Worker
- Caches static assets
- Offline fallback pages
- Background sync

## 🔒 Security

### Security Features
- **Content Security Policy**: XSS protection
- **HTTPS Only**: Secure connections
- **Input Validation**: Form validation and sanitization
- **Error Handling**: Secure error messages

## 📈 Analytics

### Built-in Analytics
- **Google Analytics**: Page views and user behavior
- **Performance Monitoring**: Core Web Vitals tracking
- **Error Tracking**: Sentry integration for error monitoring

## 🌍 Internationalization

### Language Support
- **English**: Primary language
- **French**: Coming soon
- **Arabic**: Coming soon

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Vite Team**: For the fast build tool
- **Tailwind CSS**: For the utility-first CSS framework
- **African Sports Community**: For inspiration and feedback

## 📞 Support

- **Email**: support@kijanapulseafrica.com
- **Documentation**: [docs.kijanapulseafrica.com](https://docs.kijanapulseafrica.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/kijanapulseafrica/issues)

---

**Made with ❤️ for African Sports Talent**