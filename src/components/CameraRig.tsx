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

  useFrame((state) => {
    // Space-like mouse drift for depth
    const mx = mouse.x * 4;
    const my = mouse.y * 4;
    const time = state.clock.getElapsedTime();

    // SCROLL-BASED PATH with space movement
    const s = scroll.current;

    // Space-like movement patterns
    const thrustForward = Math.sin(time * 0.3) * 3; // Forward thrust
    const driftSide = Math.cos(time * 0.2) * 2; // Side drift
    const floatUpDown = Math.sin(time * 0.4) * 1.5; // Floating sensation
    const spaceRoll = Math.sin(time * 0.15) * 0.1; // Gentle rolling

    // Space camera path calculation
    let tx = 0, ty = 0, tz = 10;
    let ry = 0;
    let rx = 0;

    if (s <= 0.2) {
        // Segment 1: Hero - Space launch forward
        const t = s / 0.2;
        tx = THREE.MathUtils.lerp(0, 2, t) + driftSide + Math.sin(time * 0.5) * 1;
        ty = THREE.MathUtils.lerp(0, 1, t) + floatUpDown + Math.cos(time * 0.3) * 0.8;
        tz = THREE.MathUtils.lerp(10, 4, t) + thrustForward; // Moving forward in space
        ry = THREE.MathUtils.lerp(0, 0.15, t) + spaceRoll;
        rx = THREE.MathUtils.lerp(0, 0.05, t) + Math.sin(time * 0.6) * 0.02;
    } else if (s <= 0.4) {
        // Segment 2: About - Floating upward in space
        const t = (s - 0.2) / 0.2;
        tx = THREE.MathUtils.lerp(2, -3, t) + Math.sin(time * 0.4) * 2.5 + driftSide;
        ty = THREE.MathUtils.lerp(1, 6, t) + Math.cos(time * 0.5) * 2 + floatUpDown;
        tz = THREE.MathUtils.lerp(4, 8, t) + Math.sin(time * 0.3) * 1.5; // Backward drift
        ry = THREE.MathUtils.lerp(0.15, -0.2, t) + spaceRoll;
        rx = THREE.MathUtils.lerp(0.05, -0.08, t) + Math.cos(time * 0.4) * 0.03;
    } else if (s <= 0.6) {
        // Segment 3: Projects - Space cruise backward
        const t = (s - 0.4) / 0.2;
        tx = THREE.MathUtils.lerp(-3, 5, t) + Math.cos(time * 0.3) * 3 + driftSide;
        ty = THREE.MathUtils.lerp(6, -2, t) + Math.sin(time * 0.4) * 2.5 + floatUpDown;
        tz = THREE.MathUtils.lerp(8, 5, t) + Math.cos(time * 0.5) * 2; // Moving backward
        ry = THREE.MathUtils.lerp(-0.2, 0.25, t) + spaceRoll;
        rx = THREE.MathUtils.lerp(-0.08, 0.1, t) + Math.sin(time * 0.5) * 0.04;
    } else if (s <= 0.8) {
        // Segment 4: Contact - Orbital movement in space
        const t = (s - 0.6) / 0.2;
        const orbitAngle = time * 0.4 + t * Math.PI * 2;
        const orbitRadius = 4 + Math.sin(time * 0.2) * 1;
        tx = THREE.MathUtils.lerp(5, 0, t) + Math.cos(orbitAngle) * orbitRadius + driftSide;
        ty = THREE.MathUtils.lerp(-2, -6, t) + Math.sin(orbitAngle * 1.5) * 2 + floatUpDown;
        tz = THREE.MathUtils.lerp(5, 12, t) + Math.sin(time * 0.3) * 2.5; // Forward thrust
        ry = THREE.MathUtils.lerp(0.25, -0.15, t) + spaceRoll + t * Math.PI * 0.1;
        rx = THREE.MathUtils.lerp(0.1, -0.05, t) + Math.cos(time * 0.3) * 0.03;
    } else {
        // Segment 5: Footer - Space station approach
        const t = (s - 0.8) / 0.2;
        const approachAngle = time * 0.25 + t * Math.PI;
        tx = THREE.MathUtils.lerp(0, 1, t) + Math.sin(approachAngle) * 2 + driftSide;
        ty = THREE.MathUtils.lerp(-6, -10, t) + Math.cos(approachAngle * 1.2) * 1.5 + floatUpDown;
        tz = THREE.MathUtils.lerp(12, 6, t) + Math.cos(time * 0.4) * 2; // Backward to dock
        ry = THREE.MathUtils.lerp(-0.15, 0, t) + spaceRoll * 0.5;
        rx = THREE.MathUtils.lerp(-0.05, 0, t) + Math.sin(time * 0.6) * 0.02;
    }

    // Apply space-like drift + dynamic path
    const targetX = tx + mx;
    const targetY = ty - my;
    const targetZ = tz;

    // Smooth space camera following
    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.position.z += (targetZ - camera.position.z) * 0.06;

    // Space look-at point with movement
    const lookAtX = Math.sin(time * 0.2) * 3;
    const lookAtY = Math.cos(time * 0.3) * 2;
    const lookAtZ = Math.sin(time * 0.15) * 2;
    
    camera.lookAt(lookAtX, lookAtY, lookAtZ);
    
    // Space rotation with rolling effect
    camera.rotation.y += (ry - camera.rotation.y) * 0.06;
    camera.rotation.x += (rx - camera.rotation.x) * 0.06;
    camera.rotation.z += (spaceRoll - camera.rotation.z) * 0.04; // Add Z-axis roll
  });

  return null;
};
