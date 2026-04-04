# OM YADAO — AI/ML Engineer Portfolio

A premium, immersive, and performance-optimized portfolio website. This project leverages cutting-edge web technologies to create a high-fidelity experience that reflects a career at the intersection of **AI Systems**, **Data Science**, and **Creative Development**.

---

## 🚀 Vision
This portfolio is designed to be as intelligent and responsive as the systems it showcases. It features a custom-built 3D background system that adapts in real-time to navigation, paired with cinematic typography and glassmorphic UI elements.

## 🛠 Tech Stack

- **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **3D Graphics:** [Three.js](https://threejs.org/) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation:** [GSAP](https://greensock.com/gsap/) (ScrollTrigger, Timelines)
- **Scrolling:** [Lenis](https://github.com/darkroomengineering/lenis) (Sleek Smooth Scrolling)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🎨 Immersive Features

### 1. State-Aware 3D Backgrounds
The background environment isn't just static; it evolves as you navigate:
- **Portfolio (Home):** Deep-space `Galactic Spiral` — A massive, interactive 3D particle vortex representing data scale.
- **Resume:** `Wave Grid` — An undulating topographic mesh that tracks your scroll speed.
- **GitHub Analysis:** `Cyber Holograph` — A Matrix-inspired data rain combined with a wireframe torus knot, optimized for 60fps.

### 2. Premium 3D Typography
- **OM YADAO Branding:** Custom-built text blocks with independent 3D transformations.
- **Staggered Animations:** Each letter responds to hover with a unique rotation, scale, and offset, creating a tactile, "touchable" feel.
- **Perspective Rendering:** Uses `perspective-1000` CSS containers for realistic depth.

### 3. High-Performance UI
- **Glassmorphism:** Elegant, blurred-background containers (`backdrop-blur-xl`) for content blocks.
- **Cinematic Reveal:** GSAP-powered entrance sequences for all hero elements and section titles.
- **Mobile-First Optimization:** Fluid layouts that retain their 3D impact on high-and-low-end mobile devices.

## 📁 Key Components

- `App.tsx`: Central logic, state-driven navigation, and the `ImmersiveCore` background engine.
- `BgOptionCyber.tsx`: High-performance falling particle system.
- `GithubInsights.tsx`: Deep-dive project categorization with interactive repo cards.
- `BentoSkills.tsx`: Modern, grid-based skill visualization.
- `ExperienceTimeline.tsx`: Detailed career progression with glass-morphic styling.

## 📱 Navigation
We've moved to a **Top-Right Navigation Pill** system for maximum visibility and accessibility, freeing up the bottom of the screen for ambient 3D visuals.

## ⚡ Performance Optimization
- **Polygon-Lean Geometries:** Reduced segment counts in complex 3D shapes to prevent GPU throttling.
- **Particle Balancing:** Fine-tuned point counts (2000-3000) for high density without frame-drops.
- **Layered Rendering:** Strategic use of `will-change-transform` and reduced `backdrop-blur` in high-interaction areas to maintain 60fps.

---

Built with ❤️ by **OM YADAO**.
