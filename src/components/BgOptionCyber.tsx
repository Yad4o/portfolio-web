import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const BgOptionCyber = ({ scroll }: { scroll: number }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 3000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 40; // x
        pos[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
        pos[i * 3 + 2] = (Math.random() - 0.5) * 40; // z
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
        // Falling rain effect combined with scroll
        pointsRef.current.position.y = (time * 2 + scroll * 20) % 20;
        pointsRef.current.rotation.y = time * 0.05;
        pointsRef.current.rotation.z = time * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00ff41" transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
};
