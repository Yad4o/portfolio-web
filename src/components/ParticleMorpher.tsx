import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { particleMorphVertexShader, particleMorphFragmentShader } from '../shaders';

const COUNT = 2000;

/**
 * 2,000 GPU-morphed particles.
 * Minimal morphing between geometric shapes for subtle effect.
 */
export const ParticleMorpher = ({ scroll }: { scroll: number }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { pos1, pos2, pos3, pos4, pos5, pos6 } = useMemo(() => {
    const p1 = new Float32Array(COUNT * 3);
    const p2 = new Float32Array(COUNT * 3);
    const p3 = new Float32Array(COUNT * 3);
    const p4 = new Float32Array(COUNT * 3);
    const p5 = new Float32Array(COUNT * 3);
    const p6 = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
        // --- Hero Section: DNA Helix ---
        const t = (i / COUNT) * Math.PI * 8;
        const r = 2.0;
        const helixY = (i / COUNT - 0.5) * 8;
        p1[i * 3 + 0] = r * Math.cos(t) + Math.sin(t * 2) * 0.3;
        p1[i * 3 + 1] = helixY;
        p1[i * 3 + 2] = r * Math.sin(t) + Math.cos(t * 2) * 0.3;

        // --- About Section: Cube Frame ---
        const cubeSize = 3;
        const face = Math.floor(i / (COUNT / 6));
        if (face === 0) { // Front face
            p2[i * 3 + 0] = (Math.random() - 0.5) * cubeSize;
            p2[i * 3 + 1] = (Math.random() - 0.5) * cubeSize;
            p2[i * 3 + 2] = cubeSize / 2;
        } else if (face === 1) { // Back face
            p2[i * 3 + 0] = (Math.random() - 0.5) * cubeSize;
            p2[i * 3 + 1] = (Math.random() - 0.5) * cubeSize;
            p2[i * 3 + 2] = -cubeSize / 2;
        } else if (face === 2) { // Top face
            p2[i * 3 + 0] = (Math.random() - 0.5) * cubeSize;
            p2[i * 3 + 1] = cubeSize / 2;
            p2[i * 3 + 2] = (Math.random() - 0.5) * cubeSize;
        } else if (face === 3) { // Bottom face
            p2[i * 3 + 0] = (Math.random() - 0.5) * cubeSize;
            p2[i * 3 + 1] = -cubeSize / 2;
            p2[i * 3 + 2] = (Math.random() - 0.5) * cubeSize;
        } else if (face === 4) { // Right face
            p2[i * 3 + 0] = cubeSize / 2;
            p2[i * 3 + 1] = (Math.random() - 0.5) * cubeSize;
            p2[i * 3 + 2] = (Math.random() - 0.5) * cubeSize;
        } else { // Left face
            p2[i * 3 + 0] = -cubeSize / 2;
            p2[i * 3 + 1] = (Math.random() - 0.5) * cubeSize;
            p2[i * 3 + 2] = (Math.random() - 0.5) * cubeSize;
        }

        // --- Projects Section: Grid Matrix ---
        const gridSize = Math.ceil(Math.sqrt(COUNT));
        const x = (i % gridSize) - gridSize / 2;
        const z = Math.floor(i / gridSize) - gridSize / 2;
        p3[i * 3 + 0] = x * 0.3;
        p3[i * 3 + 1] = Math.sin(x * 0.5 + z * 0.5) * 0.5;
        p3[i * 3 + 2] = z * 0.3;

        // --- Contact Section: Heart Shape ---
        const t2 = (i / COUNT) * Math.PI * 2;
        const heartScale = 0.15;
        p4[i * 3 + 0] = 16 * Math.pow(Math.sin(t2), 3) * heartScale;
        p4[i * 3 + 1] = (13 * Math.cos(t2) - 5 * Math.cos(2*t2) - 2 * Math.cos(3*t2) - Math.cos(4*t2)) * heartScale;
        p4[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

        // --- Footer: Spiral Galaxy ---
        const angle = (i / COUNT) * Math.PI * 12;
        const radius = (i / COUNT) * 4;
        const spiralHeight = (i / COUNT - 0.5) * 2;
        p5[i * 3 + 0] = radius * Math.cos(angle) * (1 + 0.3 * Math.sin(angle * 3));
        p5[i * 3 + 1] = spiralHeight + Math.sin(angle * 2) * 0.2;
        p5[i * 3 + 2] = radius * Math.sin(angle) * (1 + 0.3 * Math.cos(angle * 3));

        // --- Default: Floating Cloud ---
        p6[i * 3 + 0] = (Math.random() - 0.5) * 6;
        p6[i * 3 + 1] = (Math.random() - 0.5) * 4;
        p6[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return { pos1: p1, pos2: p2, pos3: p3, pos4: p4, pos5: p5, pos6: p6 };
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
        matRef.current.uniforms.uMorphProgress.value = scroll * 5.0; // 0.0 to 5.0
    }
    if (pointsRef.current) {
        pointsRef.current.rotation.y += 0.0005;
        pointsRef.current.rotation.z += 0.0002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={pos1} itemSize={3} />
        <bufferAttribute attach="attributes-aPosition2" count={COUNT} array={pos2} itemSize={3} />
        <bufferAttribute attach="attributes-aPosition3" count={COUNT} array={pos3} itemSize={3} />
        <bufferAttribute attach="attributes-aPosition4" count={COUNT} array={pos4} itemSize={3} />
        <bufferAttribute attach="attributes-aPosition5" count={COUNT} array={pos5} itemSize={3} />
        <bufferAttribute attach="attributes-aPosition6" count={COUNT} array={pos6} itemSize={3} />
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
