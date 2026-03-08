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
        const strand = i % 2; // Two strands
        const phase = strand * Math.PI; // 180 degrees between strands
        p1[i * 3 + 0] = r * Math.cos(t + phase) + Math.sin(t * 2) * 0.3;
        p1[i * 3 + 1] = helixY;
        p1[i * 3 + 2] = r * Math.sin(t + phase) + Math.cos(t * 2) * 0.3;

        // --- About Section: Tree of Life ---
        const treeProgress = i / COUNT;
        const branchLevel = Math.floor(treeProgress * 5);
        const branchT = (treeProgress * 5 - branchLevel) * Math.PI * 2;
        const trunkHeight = treeProgress * 4 - 2;
        const branchRadius = (1 - treeProgress) * 2;
        
        if (branchLevel === 0) { // Trunk
            p2[i * 3 + 0] = (Math.random() - 0.5) * 0.3;
            p2[i * 3 + 1] = trunkHeight * 2;
            p2[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        } else {
            const branchAngle = branchT + branchLevel * Math.PI * 0.4;
            p2[i * 3 + 0] = Math.cos(branchAngle) * branchRadius;
            p2[i * 3 + 1] = trunkHeight * 2 + Math.random() * 0.5;
            p2[i * 3 + 2] = Math.sin(branchAngle) * branchRadius;
        }

        // --- Projects Section: Neural Network ---
        const neuronIndex = Math.floor(i / (COUNT / 12));
        const particleInNeuron = i % (COUNT / 12);
        const layer = Math.floor(neuronIndex / 3);
        const neuronInLayer = neuronIndex % 3;
        
        const layerX = (layer - 1.5) * 3;
        const neuronY = (neuronInLayer - 1) * 2;
        
        // Create connections between neurons
        if (particleInNeuron < (COUNT / 12) * 0.7) {
            // Neuron center
            p3[i * 3 + 0] = layerX + (Math.random() - 0.5) * 0.5;
            p3[i * 3 + 1] = neuronY + (Math.random() - 0.5) * 0.5;
            p3[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        } else {
            // Connection particles
            const t = particleInNeuron / ((COUNT / 12) * 0.3);
            const nextLayer = layer < 3 ? layer + 1 : 0;
            const nextNeuron = Math.random() * 3 - 1.5;
            p3[i * 3 + 0] = layerX + (nextLayer - layer) * 3 * t;
            p3[i * 3 + 1] = neuronY + (nextNeuron - neuronY) * t;
            p3[i * 3 + 2] = Math.sin(t * Math.PI) * 0.3;
        }

        // --- Contact Section: Phoenix Bird ---
        const wingPhase = Math.floor(i / (COUNT / 3));
        const localT = (i % (COUNT / 3)) / (COUNT / 3) * Math.PI;
        
        if (wingPhase === 0) { // Body
            p4[i * 3 + 0] = 0;
            p4[i * 3 + 1] = Math.sin(localT) * 2;
            p4[i * 3 + 2] = localT * 2 - Math.PI;
        } else if (wingPhase === 1) { // Left wing
            const wingSpread = Math.sin(localT) * 3;
            p4[i * 3 + 0] = -wingSpread;
            p4[i * 3 + 1] = Math.cos(localT) * 1.5 + 1;
            p4[i * 3 + 2] = localT * 2 - Math.PI;
        } else { // Right wing
            const wingSpread = Math.sin(localT) * 3;
            p4[i * 3 + 0] = wingSpread;
            p4[i * 3 + 1] = Math.cos(localT) * 1.5 + 1;
            p4[i * 3 + 2] = localT * 2 - Math.PI;
        }

        // --- Footer: Dragon ---
        const dragonT = (i / COUNT) * Math.PI * 6;
        const dragonSegment = Math.floor(i / (COUNT / 8));
        const segmentProgress = (i % (COUNT / 8)) / (COUNT / 8);
        
        // Dragon body curve
        const bodyX = Math.sin(dragonT) * (2 + dragonSegment * 0.3);
        const bodyY = Math.cos(dragonT * 0.5) * 1.5 + dragonSegment * 0.2;
        const bodyZ = dragonT * 0.8 - Math.PI * 3;
        
        if (dragonSegment === 0) { // Head
            p5[i * 3 + 0] = bodyX + Math.sin(segmentProgress * Math.PI * 2) * 0.5;
            p5[i * 3 + 1] = bodyY + 0.5;
            p5[i * 3 + 2] = bodyZ + 0.5;
        } else if (dragonSegment < 6) { // Body
            p5[i * 3 + 0] = bodyX + Math.sin(segmentProgress * Math.PI * 2 + dragonSegment) * 0.3;
            p5[i * 3 + 1] = bodyY;
            p5[i * 3 + 2] = bodyZ;
        } else { // Tail
            const tailFlare = (1 - segmentProgress) * 2;
            p5[i * 3 + 0] = bodyX + Math.sin(segmentProgress * Math.PI * 4) * tailFlare;
            p5[i * 3 + 1] = bodyY - segmentProgress * 0.5;
            p5[i * 3 + 2] = bodyZ - segmentProgress * 0.3;
        }

        // --- Default: Crystal Formation ---
        const crystalIndex = i % 8; // 8 faces of crystal
        const crystalProgress = (i / COUNT) * 3;
        const angle = (crystalIndex / 8) * Math.PI * 2;
        
        const radius = crystalProgress * 2;
        const height = crystalProgress * 4 - 2;
        
        p6[i * 3 + 0] = Math.cos(angle) * radius * (1 + crystalProgress * 0.2);
        p6[i * 3 + 1] = height;
        p6[i * 3 + 2] = Math.sin(angle) * radius * (1 + crystalProgress * 0.2);
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
