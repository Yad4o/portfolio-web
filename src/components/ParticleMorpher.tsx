import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { particleMorphVertexShader, particleMorphFragmentShader } from '../shaders';

const COUNT = 15000; // Even more particles for high-end look

/**
 * 15,000 GPU-morphed particles.
 * High-end immersive morphing between Sphere, Box, Torus, and Galaxy.
 */
export const ParticleMorpher = ({ scroll }: { scroll: number }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { pos1, pos2, pos3, pos4 } = useMemo(() => {
    const p1 = new Float32Array(COUNT * 3);
    const p2 = new Float32Array(COUNT * 3);
    const p3 = new Float32Array(COUNT * 3);
    const p4 = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
        // --- Sphere ---
        const phi = Math.acos(-1 + (2 * i) / COUNT);
        const theta = Math.sqrt(COUNT * Math.PI) * phi;
        p1[i * 3 + 0] = 3.5 * Math.cos(theta) * Math.sin(phi);
        p1[i * 3 + 1] = 3.5 * Math.sin(theta) * Math.sin(phi);
        p1[i * 3 + 2] = 3.5 * Math.cos(phi);

        // --- Box ---
        p2[i * 3 + 0] = (Math.random() - 0.5) * 6;
        p2[i * 3 + 1] = (Math.random() - 0.5) * 6;
        p2[i * 3 + 2] = (Math.random() - 0.5) * 6;

        // --- Torus ---
        const ir = 4, or = 1;
        const u = (i / COUNT) * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        p3[i * 3 + 0] = (ir + or * Math.cos(v)) * Math.cos(u);
        p3[i * 3 + 1] = (ir + or * Math.cos(v)) * Math.sin(u);
        p3[i * 3 + 2] = or * Math.sin(v);

        // --- Galaxy ---
        const r = Math.random() * 8;
        const a = (i / COUNT) * Math.PI * 20;
        p4[i * 3 + 0] = r * Math.cos(a + r);
        p4[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
        p4[i * 3 + 2] = r * Math.sin(a + r);
    }
    return { pos1: p1, pos2: p2, pos3: p3, pos4: p4 };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMorphProgress: { value: 0 },
    uPointSize: { value: 1.0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    if (matRef.current) {
        matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        matRef.current.uniforms.uMorphProgress.value = scroll * 3.0; // 0.0 to 3.0
    }
    if (pointsRef.current) {
        pointsRef.current.rotation.y += 0.001;
        pointsRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={pos1} itemSize={3} />
        <bufferAttribute attach="attributes-aPosition2" count={COUNT} array={pos2} itemSize={3} />
        <bufferAttribute attach="attributes-aPosition3" count={COUNT} array={pos3} itemSize={3} />
        <bufferAttribute attach="attributes-aPosition4" count={COUNT} array={pos4} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={particleMorphVertexShader}
        fragmentShader={particleMorphFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
