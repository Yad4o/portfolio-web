import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';
import { hologramVertexShader, hologramFragmentShader } from '../shaders';

/**
 * ProjectHologram: A single floating 3D panel with holographic shader.
 */
const ProjectHologram = ({ url, position, index, scroll }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const tex = useTexture(url);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(index % 2 === 0 ? '#00d4ff' : '#a78bfa') },
    uTexture: { value: tex },
  }), [tex, index]);

  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime + index) * 0.001;
        
        // Appear/Disappear logic based on scroll
        // scroll is 0 to 1
        const targetOpacity = smoothstep(0.3, 0.4, scroll) * smoothstep(0.9, 0.7, scroll);
        meshRef.current.scale.setScalar(targetOpacity);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={meshRef} position={position}>
            <planeGeometry args={[4, 2.5]} />
            <shaderMaterial
                vertexShader={hologramVertexShader}
                fragmentShader={hologramFragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    </Float>
  );
};

function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

const PROJECTS = [
    { url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800', pos: [-5, 2, -10] },
    { url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800', pos: [5,  3, -8] },
    { url: 'https://images.unsplash.com/photo-1620641788421-7a1c34a62120?q=80&w=800', pos: [-6, -2, -12] },
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', pos: [6, -3, -9] },
];

export const ProjectScene = ({ scroll }: { scroll: number }) => {
    return (
        <group>
            {PROJECTS.map((p, i) => (
                <ProjectHologram key={i} index={i} url={p.url} position={p.pos} scroll={scroll} />
            ))}
        </group>
    );
};
