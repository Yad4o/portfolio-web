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
        // Shared randomizers
        const t = i / COUNT;
        const r1 = Math.random();
        const r2 = Math.random();

        // --- SHAPE 1: Massive Double-Spiral Galaxy ---
        const arms = 3;
        const armOffset = (Math.floor(r1 * arms) / arms) * Math.PI * 2;
        const galaxyRadius = Math.pow(r2, 0.5) * 4.5; 
        const galaxyTheta = galaxyRadius * 2.0 + armOffset;
        p1[i * 3 + 0] = Math.cos(galaxyTheta) * galaxyRadius + (Math.random() - 0.5) * 0.4;
        p1[i * 3 + 1] = (Math.random() - 0.5) * 0.3 * (4.5 - galaxyRadius) + (Math.random() - 0.5) * 0.1;
        p1[i * 3 + 2] = Math.sin(galaxyTheta) * galaxyRadius + (Math.random() - 0.5) * 0.4;

        // --- SHAPE 2: Clifford-style Strange Attractor Swirl ---
        // Generates cool twisted ribbon clouds
        let cx = (Math.random() - 0.5) * 2;
        let cy = (Math.random() - 0.5) * 2;
        let cz = (Math.random() - 0.5) * 2;
        const a = 1.4, b = 1.56, c = 1.4, d = -1.56;
        // Warm up iteration
        for(let j=0; j<8; j++) {
            let nx = Math.sin(a * cy) + c * Math.cos(a * cx);
            let ny = Math.sin(b * cx) + d * Math.cos(b * cy);
            let nz = Math.sin(c * cz) + a * Math.cos(d * cx);
            cx = nx; cy = ny; cz = nz;
        }
        p2[i * 3 + 0] = cx * 1.8;
        p2[i * 3 + 1] = cy * 1.8;
        p2[i * 3 + 2] = cz * 1.8;

        // --- SHAPE 3: Deep Vortex Tornado ---
        const vortexHeight = (r1 * 2.0 - 1.0) * 3.5;
        const vortexRad = Math.exp(vortexHeight * 0.6) * 0.4 + 0.1;
        const vortexAngle = t * Math.PI * 150.0 + vortexHeight * 3.0;
        p3[i * 3 + 0] = Math.cos(vortexAngle) * vortexRad + (Math.random()-0.5) * 0.2;
        p3[i * 3 + 1] = vortexHeight;
        p3[i * 3 + 2] = Math.sin(vortexAngle) * vortexRad + (Math.random()-0.5) * 0.2;

        // --- SHAPE 4: Organic Dual DNA Helix Network ---
        const dnaLength = (r1 * 2.0 - 1.0) * 4.0;
        const dnaPhase = t * Math.PI * 8.0;
        const strand = Math.random() > 0.5 ? 1 : -1;
        const dnaRadius = 1.5;
        p4[i * 3 + 0] = Math.cos(dnaPhase + (strand > 0 ? 0 : Math.PI)) * dnaRadius + (Math.random() - 0.5)*0.3;
        p4[i * 3 + 1] = dnaLength;
        p4[i * 3 + 2] = Math.sin(dnaPhase + (strand > 0 ? 0 : Math.PI)) * dnaRadius + (Math.random() - 0.5)*0.3;

        // Add bridging bonds randomly
        if (Math.random() > 0.85) {
            const bridgeT = Math.random();
            const bX1 = Math.cos(dnaPhase) * dnaRadius;
            const bZ1 = Math.sin(dnaPhase) * dnaRadius;
            const bX2 = Math.cos(dnaPhase + Math.PI) * dnaRadius;
            const bZ2 = Math.sin(dnaPhase + Math.PI) * dnaRadius;
            p4[i * 3 + 0] = bX1 + (bX2 - bX1) * bridgeT;
            p4[i * 3 + 2] = bZ1 + (bZ2 - bZ1) * bridgeT;
        }

        // --- SHAPE 5: Parametric Math Rose / Lotus ---
        const roseT = t * Math.PI * 2 * 7;
        const pMod = 5.0 / 3.0;
        const rRad = Math.cos(pMod * roseT) * 3.5;
        const rTh = roseT;
        const rPhi = r1 * Math.PI;
        p5[i * 3 + 0] = rRad * Math.cos(rTh) * Math.sin(rPhi) + (Math.random() - 0.5)*0.1;
        p5[i * 3 + 1] = rRad * Math.sin(rTh) * Math.sin(rPhi) + (Math.random() - 0.5)*0.1;
        p5[i * 3 + 2] = rRad * Math.cos(rPhi) + (Math.random() - 0.5)*0.1;

        // --- SHAPE 6: Expanding Nova Sphere (Porous Core) ---
        const thetaSp = Math.random() * Math.PI * 2;
        const phiSp = Math.acos((Math.random() * 2) - 1);
        const R = 3.5 * Math.pow(Math.random(), 0.3) + 0.5; // Core clustered, expands out
        // Punchholes via sin function
        const holePunch = Math.sin(thetaSp * 6) * Math.cos(phiSp * 6);
        const finalR = holePunch > 0.3 ? R * 1.5 : R;
        p6[i * 3 + 0] = finalR * Math.sin(phiSp) * Math.cos(thetaSp);
        p6[i * 3 + 1] = finalR * Math.cos(phiSp);
        p6[i * 3 + 2] = finalR * Math.sin(phiSp) * Math.sin(thetaSp);
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
