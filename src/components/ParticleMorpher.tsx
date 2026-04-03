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
        // Use Golden Ratio for visually perfect distribution
        const goldenRatio = (1 + Math.sqrt(5)) / 2;

        // --- SHAPE 1: 'Vision' - The Elegant Iris/Eye ---
        // Represents "Visionary creative developer"
        const eyeAspect = 2.5; 
        const eyeT = t * Math.PI * 2 * 30; // spiral tracking
        const irisRad = 1.0 + Math.random() * 2.0; 
        // Create an almond eye shape contour
        const eyeX = Math.cos(eyeT) * irisRad;
        const eyeZ = Math.sin(eyeT) * irisRad / eyeAspect;
        // Make the outer edges curve inward and taper
        const taper = Math.pow(Math.abs(Math.cos(eyeT)), 1.5) * 1.5;
        p1[i * 3 + 0] = eyeX * 1.5;
        p1[i * 3 + 1] = (Math.random() - 0.5) * 0.2 + (irisRad < 1.4 ? (Math.random() - 0.5)*1.5 : 0); // Pupil noise
        p1[i * 3 + 2] = eyeZ * (1.0 + taper);

        // --- SHAPE 2: 'Logic' - The React / Atomic Orbitals ---
        // Represents "React / Code"
        const atomType = i % 3;
        const atomT = (i / COUNT) * Math.PI * 2 * (COUNT / 3);
        const rAtom = 3.0;
        const tilt = Math.PI / 3; // 60 degrees intersect
        if (atomType === 0) {
            p2[i * 3 + 0] = Math.cos(atomT) * rAtom;
            p2[i * 3 + 1] = Math.sin(atomT) * rAtom * Math.cos(tilt);
            p2[i * 3 + 2] = Math.sin(atomT) * rAtom * Math.sin(tilt);
        } else if (atomType === 1) {
            p2[i * 3 + 0] = Math.cos(atomT) * rAtom * Math.cos(tilt) - Math.sin(atomT) * rAtom * Math.sin(tilt);
            p2[i * 3 + 1] = Math.sin(atomT) * rAtom;
            p2[i * 3 + 2] = Math.cos(atomT) * rAtom * Math.sin(tilt) + Math.sin(atomT) * rAtom * Math.cos(tilt);
        } else {
            p2[i * 3 + 0] = Math.cos(atomT) * rAtom * Math.cos(-tilt) - Math.sin(atomT) * rAtom * Math.sin(-tilt);
            p2[i * 3 + 1] = Math.sin(atomT) * rAtom;
            p2[i * 3 + 2] = Math.cos(atomT) * rAtom * Math.sin(-tilt) + Math.sin(atomT) * rAtom * Math.cos(-tilt);
        }

        // --- SHAPE 3: 'Fluidity' - The Double Helix DNA ---
        // Represents "Organic growth and adaptation"
        const dnaLen = (t - 0.5) * 8.0;
        const dnaAng = t * Math.PI * 12.0;
        const strandId = i % 2;
        const rDna = 1.4;
        p3[i * 3 + 0] = Math.cos(dnaAng + (strandId * Math.PI)) * rDna;
        p3[i * 3 + 1] = dnaLen;
        p3[i * 3 + 2] = Math.sin(dnaAng + (strandId * Math.PI)) * rDna;
        // Connectors
        if (i % 25 === 0) {
            p3[i * 3 + 0] = 0; p3[i * 3 + 2] = 0; // pull to center for rung
        }

        // --- SHAPE 4: 'Connectivity' - The Brain / Neural Cloud ---
        // Represents "Architecture and intelligence"
        const phi4 = Math.acos(1 - 2 * t);
        const theta4 = Math.PI * 2 * i / goldenRatio;
        // Make it slightly bi-lobed like a brain hemisphere!
        const rBrain = 2.5 + Math.pow(Math.abs(Math.sin(theta4)), 4) * 0.5 - Math.abs(Math.sin(phi4)) * 0.4;
        p4[i * 3 + 0] = rBrain * Math.sin(phi4) * Math.cos(theta4);
        p4[i * 3 + 1] = rBrain * Math.cos(phi4) * 0.8; // flattened
        p4[i * 3 + 2] = rBrain * Math.sin(phi4) * Math.sin(theta4) * 1.2; // elongated back to front
        // Create sulci/gyri (brain folds) using high frequency math
        const fold = Math.sin(theta4 * 12) * Math.cos(phi4 * 12) * 0.15;
        p4[i * 3 + 0] += fold; p4[i * 3 + 1] += fold; p4[i * 3 + 2] += fold;

        // --- SHAPE 5: 'Resonance' - Sound Wave / Data Cylinder ---
        // Represents "Data & Signal Processing"
        const cRad = 2.2;
        const cHeight = (t - 0.5) * 6.0;
        const cAng = i * 0.1; 
        const waveform = Math.sin(cAng * 5.0) * Math.cos(cHeight * 4.0) * 0.6;
        p5[i * 3 + 0] = Math.cos(cAng) * (cRad + waveform);
        p5[i * 3 + 1] = cHeight;
        p5[i * 3 + 2] = Math.sin(cAng) * (cRad + waveform);

        // --- SHAPE 6: 'Excellence' - The Flawless Diamond ---
        // Represents "Premium Output"
        const R6 = 2.8; 
        const isTop = t < 0.5;
        const dT = isTop ? t * 2.0 : (t - 0.5) * 2.0;
        const currentY = isTop ? (1.0 - dT) * R6 : (dT - 1.0) * R6; 
        // Max radius at Y=0 is R6, converging to 0 at poles
        const sliceRad = R6 * (1.0 - Math.abs(currentY)/R6);
        // Diamond has 4 corners at slice (octahedron)
        const dAng = Math.floor(Math.random() * 4) * (Math.PI / 2) + ((Math.random()-0.5)*0.2); // Snap to 4 points with slight jitter to draw edges
        const mixCenter = Math.random(); 
        p6[i * 3 + 0] = Math.cos(dAng) * sliceRad * mixCenter;
        p6[i * 3 + 1] = currentY;
        p6[i * 3 + 2] = Math.sin(dAng) * sliceRad * mixCenter;
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
