import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CameraRig: Controls the journey path.
 */
export const CameraRig = () => {
  const { camera, mouse } = useThree();
  const scroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scroll.current = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    // Basic mouse drift for depth
    const mx = mouse.x * 2;
    const my = mouse.y * 2;

    // SCROLL-BASED PATH
    // s ranges from 0 to 1
    const s = scroll.current;

    // Interpolate camera position based on scroll segments
    // Hero: [0, 0, 10]
    // About: [5, 5, 15] or similar
    // Projects: [-5, -5, 10]
    
    // Smooth camera path calculation
    let tx = 0, ty = 0, tz = 10;
    let ry = 0;

    if (s <= 0.33) {
        // Segment 1: Hero to About
        const t = s / 0.33;
        tx = THREE.MathUtils.lerp(0, 5, t);
        ty = THREE.MathUtils.lerp(0, 0, t);
        tz = THREE.MathUtils.lerp(10, 15, t);
        ry = THREE.MathUtils.lerp(0, 0.2, t);
    } else if (s <= 0.66) {
        // Segment 2: About to Projects
        const t = (s - 0.33) / 0.33;
        tx = THREE.MathUtils.lerp(5, -5, t);
        ty = THREE.MathUtils.lerp(0, 5, t);
        tz = THREE.MathUtils.lerp(15, 8, t);
        ry = THREE.MathUtils.lerp(0.2, -0.2, t);
    } else {
        // Segment 3: Projects to Contact
        const t = (s - 0.66) / 0.34;
        tx = THREE.MathUtils.lerp(-5, 0, t);
        ty = THREE.MathUtils.lerp(5, -10, t);
        tz = THREE.MathUtils.lerp(8, 20, t);
        ry = THREE.MathUtils.lerp(-0.2, 0, t);
    }

    // Apply drift + path
    camera.position.x += (tx + mx - camera.position.x) * 0.05;
    camera.position.y += (ty - my - camera.position.y) * 0.05;
    camera.position.z += (tz - camera.position.z) * 0.05;

    camera.lookAt(0, 0, 0);
    // Subtle tilt
    camera.rotation.y += (ry - camera.rotation.y) * 0.05;
  });

  return null;
};
