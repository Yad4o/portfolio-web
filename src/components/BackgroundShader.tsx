import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { noiseVertexShader, noiseFragmentShader } from '../shaders';

/**
 * Full-screen GLSL background plane with animated noise shader.
 * Renders behind all other 3D objects.
 */
export const BackgroundShader = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  }), []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[30, 20, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={noiseVertexShader}
        fragmentShader={noiseFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
};
