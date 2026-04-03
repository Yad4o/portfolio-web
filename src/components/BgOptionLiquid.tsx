import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

export const BgOptionLiquid = ({ scroll }: { scroll: number }) => {
  const sphere1 = useRef<THREE.Mesh>(null!);
  const sphere2 = useRef<THREE.Mesh>(null!);
  const sphere3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sphere1.current) {
        sphere1.current.position.y = Math.sin(time * 0.4) * 2 - (scroll * 10);
        sphere1.current.rotation.x = time * 0.2;
    }
    if (sphere2.current) {
        sphere2.current.position.x = Math.cos(time * 0.3) * 3 + 2;
        sphere2.current.position.y = Math.sin(time * 0.5) * 3 - (scroll * 12);
    }
    if (sphere3.current) {
        sphere3.current.position.x = Math.sin(time * 0.2) * 5 - 2;
        sphere3.current.position.y = Math.cos(time * 0.4) * 2 - (scroll * 8);
    }
  });

  return (
    <>
      <Environment preset="city" />
      {/* High intensity cyan sphere */}
      <Sphere ref={sphere1} args={[2.5, 64, 64]} position={[-3, 2, -10]}>
        <MeshDistortMaterial color="#00ffff" emissive="#002222" emissiveIntensity={0.5} roughness={0.1} metalness={1} distort={0.6} speed={2} />
      </Sphere>
      
      {/* Deep Magenta sphere */}
      <Sphere ref={sphere2} args={[3.2, 64, 64]} position={[4, -1, -12]}>
        <MeshDistortMaterial color="#ff00ff" emissive="#220022" emissiveIntensity={0.5} roughness={0.1} metalness={1} distort={0.7} speed={1.5} />
      </Sphere>
      
      {/* Electric Violet sphere */}
      <Sphere ref={sphere3} args={[4, 64, 64]} position={[0, -5, -15]}>
        <MeshDistortMaterial color="#9d4edd" emissive="#110022" emissiveIntensity={0.5} roughness={0.2} metalness={0.9} distort={0.5} speed={3} />
      </Sphere>
      
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={5} color="#c77dff" />
    </>
  );
};
