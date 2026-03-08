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
  
  // Use a fallback image if the URL fails to load
  const tex = useTexture(url);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(index % 2 === 0 ? '#00d4ff' : '#a78bfa') },
    uTexture: { value: tex },
  }), [tex, index]);

  useFrame((state) => {
    if (meshRef.current) {
        const material = meshRef.current.material as THREE.ShaderMaterial;
        if (material.uniforms) {
            material.uniforms.uTime.value = state.clock.elapsedTime;
        }

        // Float effect
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2;
        
        // Appear/Disappear logic based on scroll
        const start = 0.5; // Starts appearing at 50% scroll (Projects section)
        const end = 0.8;
        const targetScale = smoothstep(start - 0.1, start + 0.1, scroll) * smoothstep(end + 0.1, end - 0.1, scroll);
        meshRef.current.scale.setScalar(targetScale);
        meshRef.current.visible = targetScale > 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
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
    { url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&w=800', pos: [-5, 2, -10] },
    { url: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&w=800', pos: [5,  3, -8] },
    { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&w=800', pos: [-6, -2, -12] },
    { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&w=800', pos: [6, -3, -9] },
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
