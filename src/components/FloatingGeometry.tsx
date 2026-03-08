import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { floatingVertexShader, floatingFragmentShader } from '../shaders';

interface FloatingObjectProps {
  position: [number, number, number];
  geometry: 'icosahedron' | 'torus' | 'octahedron' | 'dodecahedron';
  color: string;
  scale?: number;
  index: number;
}

const FloatingObject = ({ position, geometry, color, scale = 1, index }: FloatingObjectProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIndex: { value: index },
    uColor: { value: new THREE.Color(color) },
  }), [color, index]);

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current || !matRef.current) return;
    const t = clock.getElapsedTime();
    matRef.current.uniforms.uTime.value = t;

    // Gentle drift rotation
    meshRef.current.rotation.x = Math.sin(t * 0.3 + index) * 0.4;
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.z = Math.cos(t * 0.2 + index * 0.7) * 0.2;

    // Subtle mouse parallax
    meshRef.current.position.x = position[0] + mouse.x * (0.2 + index * 0.03);
    meshRef.current.position.y = position[1] + mouse.y * (0.1 + index * 0.02);
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case 'icosahedron':   return new THREE.IcosahedronGeometry(0.5 * scale, 0);
      case 'torus':         return new THREE.TorusGeometry(0.4 * scale, 0.12 * scale, 16, 32);
      case 'octahedron':    return new THREE.OctahedronGeometry(0.5 * scale, 0);
      case 'dodecahedron':  return new THREE.DodecahedronGeometry(0.45 * scale, 0);
      default:              return new THREE.IcosahedronGeometry(0.5 * scale, 0);
    }
  }, [geometry, scale]);

  return (
    <mesh ref={meshRef} geometry={geo} position={position}>
      <shaderMaterial
        ref={matRef}
        vertexShader={floatingVertexShader}
        fragmentShader={floatingFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// Predetermined stable configs to avoid random re-renders
const OBJECT_CONFIGS: FloatingObjectProps[] = [
  { position: [-4,  1.5, -2], geometry: 'icosahedron',  color: '#00d4ff', scale: 1.2, index: 0 },
  { position: [ 4,  -1.5, -1], geometry: 'dodecahedron', color: '#a78bfa', scale: 0.9, index: 1 },
  { position: [-2,  -2.5, -3], geometry: 'octahedron',   color: '#00d4ff', scale: 0.8, index: 2 },
  { position: [ 2.5, 2.5, -4], geometry: 'torus',        color: '#38bdf8', scale: 1.0, index: 3 },
  { position: [-5.5, 0.0, -5], geometry: 'icosahedron',  color: '#c084fc', scale: 0.7, index: 4 },
  { position: [ 5.5, 1.0, -3], geometry: 'octahedron',   color: '#00ffa3', scale: 1.1, index: 5 },
  { position: [ 0.5,-3.5, -2], geometry: 'dodecahedron', color: '#a78bfa', scale: 0.6, index: 6 },
  { position: [-3,   3.0, -6], geometry: 'torus',        color: '#00d4ff', scale: 0.75, index: 7 },
];

export const FloatingGeometry = () => (
  <>
    {OBJECT_CONFIGS.map((cfg) => (
      <FloatingObject key={cfg.index} {...cfg} />
    ))}
  </>
);
