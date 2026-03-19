import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { particleMorphVertexShader, particleMorphFragmentShader } from '../shaders';

const COUNT = 1800;

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
        const t = i / COUNT;
        const angle = t * Math.PI * 2;
        const spiralFactor = i / COUNT;
        
        // --- Hero Section: Hypersphere with Fibonacci Spiral ---
        const phi = Math.acos(1 - 2 * t);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i; // Golden angle
        const sphereRadius = 2.5 + Math.sin(angle * 3) * 0.3;
        p1[i * 3 + 0] = sphereRadius * Math.sin(phi) * Math.cos(theta) * (1 + spiralFactor * 0.2);
        p1[i * 3 + 1] = sphereRadius * Math.cos(phi) * (1 + Math.sin(angle * 2) * 0.1);
        p1[i * 3 + 2] = sphereRadius * Math.sin(phi) * Math.sin(theta) * (1 + spiralFactor * 0.2);

        // --- About Section: Dynamic Star with Inner Core ---
        const starPoints = 8; // 8-pointed star
        const starAngle = angle;
        const starStep = Math.floor(starAngle / (Math.PI * 2 / starPoints));
        const coreRadius = 0.5 + Math.sin(angle * 8) * 0.2;
        
        if (i % 3 === 0) { // Core particles
            const coreAngle = angle * 4;
            p2[i * 3 + 0] = Math.cos(coreAngle) * coreRadius;
            p2[i * 3 + 1] = Math.sin(coreAngle) * coreRadius;
            p2[i * 3 + 2] = Math.sin(angle * 6) * 0.1;
        } else { // Star formation
            const outerRadius = 2.8 + Math.sin(angle * 4) * 0.4;
            const innerRadius = 1.2 + Math.cos(angle * 3) * 0.2;
            const radius = (starStep % 2 === 0) ? outerRadius : innerRadius;
            
            p2[i * 3 + 0] = Math.cos(starAngle) * radius;
            p2[i * 3 + 1] = Math.sin(starAngle) * radius * 0.3;
            p2[i * 3 + 2] = Math.sin(starAngle) * radius;
        }

        // --- Projects Section: Enhanced Globe with Energy Grid ---
        const globeSection = Math.floor(i / (COUNT / 4)); // 4 sections
        const globeProgress = (i % (COUNT / 4)) / (COUNT / 4);
        const globeTime = globeProgress * Math.PI * 2;
        
        if (globeSection === 0) { // Globe surface with waves
            const globeTheta = globeProgress * Math.PI * 2;
            const globePhi = Math.acos(2 * globeProgress - 1);
            const waveRadius = 2.2 + Math.sin(globeTheta * 8 + globePhi * 4) * 0.15;
            p3[i * 3 + 0] = waveRadius * Math.sin(globePhi) * Math.cos(globeTheta);
            p3[i * 3 + 1] = waveRadius * Math.cos(globePhi);
            p3[i * 3 + 2] = waveRadius * Math.sin(globePhi) * Math.sin(globeTheta);
        } else if (globeSection === 1) { // Energy latitude lines
            const latLines = 12;
            const latIndex = Math.floor(globeProgress * latLines);
            const latAngle = (latIndex / latLines) * Math.PI - Math.PI/2;
            const lineTheta = globeTime * 6;
            const lineRadius = 2.2 * Math.cos(latAngle) * (1 + Math.sin(lineTheta) * 0.1);
            p3[i * 3 + 0] = lineRadius * Math.cos(lineTheta);
            p3[i * 3 + 1] = 2.2 * Math.sin(latAngle);
            p3[i * 3 + 2] = lineRadius * Math.sin(lineTheta);
        } else if (globeSection === 2) { // Energy longitude lines
            const lonLines = 16;
            const lonIndex = Math.floor(globeProgress * lonLines);
            const lonAngle = (lonIndex / lonLines) * Math.PI * 2;
            const linePhi = globeTime * 4 - Math.PI/2;
            const lineRadius = 2.2 * Math.cos(linePhi) * (1 + Math.cos(lonAngle * 2) * 0.1);
            p3[i * 3 + 0] = lineRadius * Math.cos(lonAngle);
            p3[i * 3 + 1] = 2.2 * Math.sin(linePhi);
            p3[i * 3 + 2] = lineRadius * Math.sin(lonAngle);
        } else { // Orbital particles
            const orbitRadius = 2.8 + Math.sin(globeTime * 3) * 0.3;
            const orbitHeight = Math.sin(globeTime * 2) * 0.5;
            p3[i * 3 + 0] = Math.cos(globeTime * 8) * orbitRadius;
            p3[i * 3 + 1] = orbitHeight;
            p3[i * 3 + 2] = Math.sin(globeTime * 8) * orbitRadius;
        }

        // --- Contact Section: Enhanced Diamond with Energy Core ---
        const diamondLayer = Math.floor(i / (COUNT / 3)); // 3 layers
        const diamondProgress = (i % (COUNT / 3)) / (COUNT / 3);
        const diamondSize = 2.8;
        
        if (diamondLayer === 0) { // Upper diamond with curves
            const curve = Math.sin(diamondProgress * Math.PI) * 0.3;
            p4[i * 3 + 0] = (diamondProgress - 0.5) * diamondSize * 2.2;
            p4[i * 3 + 1] = (diamondProgress * diamondSize + curve);
            p4[i * 3 + 2] = Math.sin(diamondProgress * Math.PI * 2) * 0.3;
        } else if (diamondLayer === 1) { // Energy core
            const coreAngle = diamondProgress * Math.PI * 4;
            const coreRadius = 0.3 + Math.sin(coreAngle * 3) * 0.2;
            p4[i * 3 + 0] = Math.cos(coreAngle) * coreRadius;
            p4[i * 3 + 1] = 0;
            p4[i * 3 + 2] = Math.sin(coreAngle) * coreRadius;
        } else { // Lower diamond with curves
            const curve = Math.sin(diamondProgress * Math.PI) * 0.3;
            p4[i * 3 + 0] = (diamondProgress - 0.5) * diamondSize * 2.2;
            p4[i * 3 + 1] = ((1 - diamondProgress) * -diamondSize - curve);
            p4[i * 3 + 2] = Math.sin(diamondProgress * Math.PI * 2) * 0.3;
        }

        // --- Footer: Enhanced Cube with Energy Flow ---
        const cubeFace = Math.floor(i / (COUNT / 8)); // 8 sections for edges
        const cubeProgress = (i % (COUNT / 8)) / (COUNT / 8);
        const cubeSize = 2.0;
        
        if (cubeFace < 6) { // 6 faces
            const face = cubeFace;
            const flowOffset = Math.sin(angle * 4) * 0.1;
            
            if (face === 0) { // Front face with grid
                p5[i * 3 + 0] = (cubeProgress - 0.5) * cubeSize * 2 + flowOffset;
                p5[i * 3 + 1] = (Math.floor(cubeProgress * 4) / 4 - 0.5) * cubeSize * 2;
                p5[i * 3 + 2] = cubeSize;
            } else if (face === 1) { // Back face
                p5[i * 3 + 0] = (cubeProgress - 0.5) * cubeSize * 2 + flowOffset;
                p5[i * 3 + 1] = (Math.floor(cubeProgress * 4) / 4 - 0.5) * cubeSize * 2;
                p5[i * 3 + 2] = -cubeSize;
            } else if (face === 2) { // Left face
                p5[i * 3 + 0] = -cubeSize;
                p5[i * 3 + 1] = (cubeProgress - 0.5) * cubeSize * 2 + flowOffset;
                p5[i * 3 + 2] = (Math.floor(cubeProgress * 4) / 4 - 0.5) * cubeSize * 2;
            } else if (face === 3) { // Right face
                p5[i * 3 + 0] = cubeSize;
                p5[i * 3 + 1] = (cubeProgress - 0.5) * cubeSize * 2 + flowOffset;
                p5[i * 3 + 2] = (Math.floor(cubeProgress * 4) / 4 - 0.5) * cubeSize * 2;
            } else if (face === 4) { // Top face
                p5[i * 3 + 0] = (Math.floor(cubeProgress * 4) / 4 - 0.5) * cubeSize * 2;
                p5[i * 3 + 1] = cubeSize;
                p5[i * 3 + 2] = (cubeProgress - 0.5) * cubeSize * 2 + flowOffset;
            } else { // Bottom face
                p5[i * 3 + 0] = (Math.floor(cubeProgress * 4) / 4 - 0.5) * cubeSize * 2;
                p5[i * 3 + 1] = -cubeSize;
                p5[i * 3 + 2] = (cubeProgress - 0.5) * cubeSize * 2 + flowOffset;
            }
        } else { // Edge particles with energy flow
            const edgeType = cubeFace - 6;
            const edgeProgress = cubeProgress;
            const energyPulse = Math.sin(angle * 8) * 0.2;
            
            if (edgeType === 0) { // Vertical edges
                p5[i * 3 + 0] = cubeSize * (edgeProgress < 0.5 ? 1 : -1) + energyPulse;
                p5[i * 3 + 1] = (edgeProgress - 0.5) * cubeSize * 2;
                p5[i * 3 + 2] = cubeSize * (edgeProgress < 0.5 ? 1 : -1);
            } else { // Horizontal edges
                p5[i * 3 + 0] = (edgeProgress - 0.5) * cubeSize * 2;
                p5[i * 3 + 1] = cubeSize * (edgeType === 1 ? 1 : -1) + energyPulse;
                p5[i * 3 + 2] = cubeSize * (edgeProgress < 0.5 ? 1 : -1);
            }
        }

        // --- Default: Enhanced Moon with Crater Field ---
        const moonSection = Math.floor(i / (COUNT / 4)); // 4 sections
        const moonProgress = (i % (COUNT / 4)) / (COUNT / 4);
        const moonAngle = moonProgress * Math.PI * 2;
        
        if (moonSection === 0) { // Moon surface with enhanced detail
            const moonRadius = 2.2 + Math.sin(moonAngle * 6) * 0.15;
            p6[i * 3 + 0] = Math.cos(moonAngle) * moonRadius;
            p6[i * 3 + 1] = Math.sin(moonAngle * 8) * 0.25; // Enhanced craters
            p6[i * 3 + 2] = Math.sin(moonAngle) * moonRadius;
        } else if (moonSection === 1) { // Detailed crater field
            const craterAngle = moonAngle * 12;
            const craterRadius = 0.4 + Math.sin(moonProgress * Math.PI * 8) * 0.25;
            const craterX = Math.cos(craterAngle) * (1.5 + Math.sin(moonAngle * 4) * 0.6);
            const craterZ = Math.sin(craterAngle) * (1.5 + Math.sin(moonAngle * 4) * 0.6);
            p6[i * 3 + 0] = craterX + Math.cos(moonAngle) * craterRadius;
            p6[i * 3 + 1] = Math.sin(moonAngle * 3) * 0.15;
            p6[i * 3 + 2] = craterZ + Math.sin(moonAngle) * craterRadius;
        } else if (moonSection === 2) { // Moon atmosphere/glow
            const glowRadius = 2.8 + Math.sin(moonProgress * Math.PI * 6) * 0.4;
            const glowHeight = Math.sin(moonAngle * 4) * 0.2;
            p6[i * 3 + 0] = Math.cos(moonAngle) * glowRadius;
            p6[i * 3 + 1] = glowHeight;
            p6[i * 3 + 2] = Math.sin(moonAngle) * glowRadius;
        } else { // Orbital ring particles
            const orbitAngle = moonAngle * 3;
            const orbitRadius = 3.2 + Math.sin(orbitAngle * 2) * 0.3;
            p6[i * 3 + 0] = Math.cos(orbitAngle) * orbitRadius;
            p6[i * 3 + 1] = Math.sin(moonAngle * 5) * 0.1;
            p6[i * 3 + 2] = Math.sin(orbitAngle) * orbitRadius;
        }
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
        matRef.current.uniforms.uTime.value = time * 0.6;
        matRef.current.uniforms.uMorphProgress.value = scroll * 5.0; // 0.0 to 5.0
        
        // 4D animation effects based on scroll
        matRef.current.uniforms.u4DRotation.value = time * 0.5 + scroll * Math.PI * 2;
        matRef.current.uniforms.uHyperScale.value = 1.0 + Math.sin(time * 0.3 + scroll * Math.PI) * 0.3;
        matRef.current.uniforms.uDimensionalShift.value = Math.sin(time * 0.2) * 0.5 + scroll * 0.5;
        
        // Enhanced burst effects for 4D visualization
        matRef.current.uniforms.uBurstIntensity.value = 0.1 + Math.sin(time * 0.7) * 0.05;
        matRef.current.uniforms.uSecondaryIntensity.value = 0.05 + Math.cos(time * 0.4) * 0.03;
        matRef.current.uniforms.uTertiaryIntensity.value = 0.02 + Math.sin(time * 0.6) * 0.02;
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
