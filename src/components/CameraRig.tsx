import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * CameraRig: smoothly drifts the camera using lerp.
 * Also ties camera Z position to scroll progression.
 */
export const CameraRig = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // Tie scroll to scroll progress
    const onScroll = () => {
      const prog = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      scroll.current = prog;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useFrame(() => {
    // Smooth camera drift following mouse
    camera.position.x += (mouse.current.x * 0.7 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.current.y * 0.5 - camera.position.y) * 0.05;

    // Scroll-driven camera pull forward/back
    const targetZ = 5 - scroll.current * 3;
    camera.position.z += (targetZ - camera.position.z) * 0.04;

    camera.lookAt(0, 0, 0);
  });

  return null;
};
