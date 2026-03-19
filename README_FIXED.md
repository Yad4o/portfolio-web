# 🌟 Portfolio - Om Yadav | Creative Developer

## 🎨 About This Portfolio

A stunning 3D portfolio website featuring advanced 4D particle animations, morphing geometric shapes, and scroll-responsive effects. Built with React, Three.js, and TypeScript for a professional, immersive experience.

### ✨ Key Features
- **4D Particle Animations** - 3000 GPU-morphed particles with hyper-dimensional transformations
- **Dynamic Shape Morphing** - 6 different formations: hypersphere, star, globe, diamond, cube, moon
- **Advanced Visual Effects** - Crystal, star, flower, hyper-dimensional ring, and quantum field shapes
- **Scroll-Responsive Design** - Smooth transitions and animations based on scroll position
- **Professional Styling** - Dark theme with blue/purple accents and shimmer effects

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git
- GitHub account

### Installation
```bash
# Clone the repository
git clone https://github.com/Yad4o/portfolio-web.git
cd portfolio-web

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

### Deployment
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
git add .
git commit -m "Deploy portfolio update"
git push origin main
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── ParticleMorpher.tsx    # 4D particle system
│   │   ├── CameraRig.tsx          # Camera controls
│   │   ├── BackgroundShader.tsx   # Background effects
│   │   └── GitHubProjects.tsx     # Projects display
│   ├── App.tsx                    # Main React app
│   ├── main.tsx                   # Entry point
│   └── shaders.ts                 # GLSL shaders
├── public/                        # Static assets
├── dist/                          # Build output
├── .github/workflows/             # GitHub Actions
├── vite.config.ts                 # Build configuration
└── package.json                   # Dependencies
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework with hooks and concurrent features
- **TypeScript** - Type safety and better development experience
- **Three.js** - 3D graphics and WebGL rendering
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers and abstractions
- **Tailwind CSS** - Utility-first CSS framework

### Build & Deployment
- **Vite** - Fast build tool and development server
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Static hosting
- **ESLint** - Code linting
- **PostCSS** - CSS processing

### Animation & Effects
- **GSAP** - Professional animation library
- **Lenis** - Smooth scrolling
- **Framer Motion** - React animations
- **Custom GLSL Shaders** - Advanced visual effects

## 🎯 4D Particle System

### Formations
1. **Hypersphere** - Fibonacci spiral distribution with wave distortion
2. **Dynamic Star** - 8-pointed star with energy core
3. **Enhanced Globe** - Wave-distorted surface with energy grid
4. **Crystal Diamond** - Curved formation with central energy vortex
5. **Quantum Cube** - Grid faces with flowing edge particles
6. **Enhanced Moon** - Detailed surface with atmospheric glow

### Visual Effects
- **5 Dynamic Shapes** - Crystal, star, flower, hyper-dimensional ring, quantum field
- **Multi-layer Colors** - Deep blues to purples to cyans with shimmer
- **4D Rotations** - True hyper-dimensional transformations
- **Scroll Morphing** - Smooth transitions between formations
- **Depth Effects** - Professional transparency and falloff

## 🌐 Deployment

### GitHub Pages Setup
1. Repository is configured for GitHub Pages
2. Base path set to `/portfolio-web/`
3. GitHub Actions workflow handles automatic deployment
4. Site available at: https://yad4o.github.io/portfolio-web/

### Build Configuration
```typescript
// vite.config.ts
export default defineConfig({
  base: '/portfolio-web/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
        },
      },
    },
  },
});
```

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment Variables
Create `.env.local` for local development:
```
VITE_GITHUB_TOKEN=your_token_here
```

## 📊 Performance

### Optimization
- **Manual chunks** for better caching
- **Tree shaking** for unused code
- **Instanced rendering** for particles
- **Efficient shaders** with GPU acceleration
- **React.memo** for component optimization

### Metrics
- **Build time**: ~1-2 minutes
- **Bundle size**: ~1MB (gzipped ~300KB)
- **Load time**: <3 seconds
- **Animation fps**: 60fps

## 🐛 Troubleshooting

### Common Issues
1. **Build fails** - Clear cache and reinstall dependencies
2. **GitHub Actions error** - Check permissions and base path
3. **Particles not showing** - Verify WebGL support and check console
4. **Scroll not working** - Ensure Lenis is properly initialized

### Solutions
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Check build
npm run build

# Test locally
npm run dev
```

## 📝 Documentation

- [QUICK_START.md](./QUICK_START.md) - Fast deployment guide
- [WINDOWS_DEPLOYMENT.md](./WINDOWS_DEPLOYMENT.md) - Windows-specific instructions
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Comprehensive deployment guide
- [CHECKLIST.md](./CHECKLIST.md) - Verification checklist
- [FIX_SUMMARY.md](./FIX_SUMMARY.md) - Issues fixed and improvements

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Live Demo

**Check out the live portfolio**: https://yad4o.github.io/portfolio-web/

---

*Built with passion for creating immersive web experiences that push the boundaries of what's possible on the web.* 🚀
