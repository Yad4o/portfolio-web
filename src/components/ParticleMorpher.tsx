import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { particleMorphVertexShader, particleMorphFragmentShader } from '../shaders';

const COUNT = 12000;

/**
 * 12,000 GPU-morphed particles.
 * Crazy morphing between organic attractors and energy fields.
 */
export const ParticleMorpher = ({ scroll }: { scroll: number }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const smoothScrollRef = useRef(0);

  const { pos1, pos2, pos3, pos4, pos5, pos6 } = useMemo(() => {
    const p1 = new Float32Array(COUNT * 3);
    const p2 = new Float32Array(COUNT * 3);
    const p3 = new Float32Array(COUNT * 3);
    const p4 = new Float32Array(COUNT * 3);
    const p5 = new Float32Array(COUNT * 3);
    const p6 = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
        // Shared Variables
        const t = i / COUNT;
        // Use Golden Ratio for visually perfect uniform distribution points
        const goldenRatio = (1 + Math.sqrt(5)) / 2;

        // --- SHAPE 1: Perfect Spherical Lattice ---
        // A flawless uniform sphere using Fibonacci mapping
        const phi1 = Math.acos(1 - 2 * t);
        const theta1 = Math.PI * 2 * i / goldenRatio;
        const rSphere = 2.8;
        p1[i * 3 + 0] = rSphere * Math.sin(phi1) * Math.cos(theta1);
        p1[i * 3 + 1] = rSphere * Math.cos(phi1);
        p1[i * 3 + 2] = rSphere * Math.sin(phi1) * Math.sin(theta1);

        // --- SHAPE 2: Ordered Concentric Gyroscope Rings ---
        // Flawlessly aligned nested rings rotated smoothly
        const rings = 8;
        const ptsPerRing = COUNT / rings;
        const ringIdx = Math.floor(i / ptsPerRing);
        const ringT = (i % ptsPerRing) / ptsPerRing * Math.PI * 2;
        const rRing = 1.0 + ringIdx * 0.3; // Nested out
        // Tilt each ring perfectly
        const tiltY = ringIdx * (Math.PI / rings); 
        const ringX = Math.cos(ringT) * rRing;
        const ringZ = Math.sin(ringT) * rRing;
        // Rotate around Y
        p2[i * 3 + 0] = ringX * Math.cos(tiltY) - ringZ * Math.sin(tiltY);
        p2[i * 3 + 1] = ringX * Math.sin(tiltY) + ringZ * Math.cos(tiltY);
        p2[i * 3 + 2] = ringZ;

        // --- SHAPE 3: Flawless Fibonacci Torus ---
        // A perfectly ordered donut shape
        const torusR1 = 2.2;
        const torusR2 = 0.8;
        const torusTheta = t * Math.PI * 2 * 34.0; // Wraps around
        const torusPhi = t * Math.PI * 2 * 21.0; 
        p3[i * 3 + 0] = (torusR1 + torusR2 * Math.cos(torusTheta)) * Math.cos(torusPhi);
        p3[i * 3 + 1] = (torusR1 + torusR2 * Math.cos(torusTheta)) * Math.sin(torusPhi);
        p3[i * 3 + 2] = torusR2 * Math.sin(torusTheta);

        // --- SHAPE 4: Strict Cartesian Voxel Grid ---
        // A perfect 3D cube grid structure
        const gridSize = Math.floor(Math.cbrt(COUNT)); 
        const step = 4.0 / (gridSize - 1.0);
        // Ensure i is bounded within the perfect cube size, otherwise stack in middle
        if (i < gridSize * gridSize * gridSize) {
            const gx = i % gridSize;
            const gy = Math.floor(i / gridSize) % gridSize;
            const gz = Math.floor(i / (gridSize * gridSize));
            p4[i * 3 + 0] = -2.0 + gx * step;
            p4[i * 3 + 1] = -2.0 + gy * step;
            p4[i * 3 + 2] = -2.0 + gz * step;
        } else {
            // Leftover points sit precisely at 0
            p4[i * 3 + 0] = 0; p4[i * 3 + 1] = 0; p4[i * 3 + 2] = 0;
        }

        // --- SHAPE 5: Mathematical Plane Wave ---
        // A highly ordered horizontal grid of points undulating perfectly
        const planeSize = Math.floor(Math.sqrt(COUNT));
        const pStep = 6.0 / (planeSize - 1);
        if (i < planeSize * planeSize) {
            const px = i % planeSize;
            const py = Math.floor(i / planeSize);
            const xPos = -3.0 + px * pStep;
            const zPos = -3.0 + py * pStep;
            p5[i * 3 + 0] = xPos;
            p5[i * 3 + 1] = Math.sin(xPos * 1.5) * Math.cos(zPos * 1.5) * 0.8;
            p5[i * 3 + 2] = zPos;
        } else {
            p5[i * 3 + 0] = 0; p5[i * 3 + 1] = 0; p5[i * 3 + 2] = 0;
        }

        // --- SHAPE 6: Sacred Geometry (Octahedron Lattice) ---
        // Exactly mapping points to perfectly straight lines along octahedron edges
        const R6 = 3.0;
        const edges = 12;
        const ptsPerEdge = COUNT / edges;
        const edgeIdx = Math.floor(i / ptsPerEdge);
        const eT = (i % ptsPerEdge) / ptsPerEdge; 
        
        let v1 = [0,0,0], v2 = [0,0,0];
        // The 6 vertices of an octahedron
        const top = [0, R6, 0], bot = [0, -R6, 0];
        const fR = [R6, 0, 0], fL = [-R6, 0, 0], fF = [0, 0, R6], fB = [0, 0, -R6];
        
        if(edgeIdx === 0) { v1 = top; v2 = fR; }
        else if(edgeIdx === 1) { v1 = top; v2 = fF; }
        else if(edgeIdx === 2) { v1 = top; v2 = fL; }
        else if(edgeIdx === 3) { v1 = top; v2 = fB; }
        else if(edgeIdx === 4) { v1 = bot; v2 = fR; }
        else if(edgeIdx === 5) { v1 = bot; v2 = fF; }
        else if(edgeIdx === 6) { v1 = bot; v2 = fL; }
        else if(edgeIdx === 7) { v1 = bot; v2 = fB; }
        else if(edgeIdx === 8) { v1 = fR;  v2 = fF; }
        else if(edgeIdx === 9) { v1 = fF;  v2 = fL; }
        else if(edgeIdx === 10){ v1 = fL;  v2 = fB; }
        else { v1 = fB;  v2 = fR; }

        p6[i * 3 + 0] = v1[0] + (v2[0] - v1[0]) * eT;
        p6[i * 3 + 1] = v1[1] + (v2[1] - v1[1]) * eT;
        p6[i * 3 + 2] = v1[2] + (v2[2] - v1[2]) * eT;
    }
    return { pos1: p1, pos2: p2, pos3: p3, pos4: p4, pos5: p5, pos6: p6 };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMorphProgress: { value: 0 },
    uPointSize: { value: 4.0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uBurstIntensity: { value: 0.1 },
    uSecondaryIntensity: { value: 0.05 },
    uTertiaryIntensity: { value: 0.02 },
    u4DRotation: { value: 0 },
    uHyperScale: { value: 1.0 },
    uDimensionalShift: { value: 0 },
  }), []);

  useFrame((state) => {
    if (matRef.current) {
        const time = state.clock.getElapsedTime();
        // Dampen scroll-driven morphing for buttery transitions.
        smoothScrollRef.current = THREE.MathUtils.lerp(smoothScrollRef.current, scroll, 0.04);
        const smoothScroll = smoothScrollRef.current;
        
        // Continuous ping-pong morph mapped to scroll and time
        const rawProgress = (time * 0.15) + (smoothScroll * 5.0);
        let morphVal = rawProgress % 10.0;
        if (morphVal > 5.0) {
            morphVal = 10.0 - morphVal;
        }

        matRef.current.uniforms.uTime.value = time * 0.6;
        matRef.current.uniforms.uMorphProgress.value = morphVal;
        
        // 4D animation effects based on scroll
        matRef.current.uniforms.u4DRotation.value = time * 0.12 + smoothScroll * Math.PI * 0.18;
        matRef.current.uniforms.uHyperScale.value = 1.0 + Math.sin(time * 0.16) * 0.1;
        matRef.current.uniforms.uDimensionalShift.value = 0.03 + Math.sin(time * 0.12) * 0.02 + smoothScroll * 0.03;
        
        // Keep sparkle movement subtle and smooth.
        matRef.current.uniforms.uBurstIntensity.value = 0.02 + Math.sin(time * 0.45) * 0.008;
        matRef.current.uniforms.uSecondaryIntensity.value = 0.012 + Math.cos(time * 0.3) * 0.006;
        matRef.current.uniforms.uTertiaryIntensity.value = 0.008 + Math.sin(time * 0.35) * 0.004;
    }
  });

  return (
    <points ref={pointsRef} position={[0, 0, -4.5]} scale={1.08}>
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
