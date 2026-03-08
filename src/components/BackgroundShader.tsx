import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { noiseVertexShader, noiseFragmentShader } from '../shaders';

/**
 * Full-screen GLSL background plane with animated noise shader.
 * Renders behind all other 3D objects.
 */
export const BackgroundShader = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { gl, camera, size } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size]);

  // Handle resize and ensure fullscreen coverage
  useEffect(() => {
    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      }
      
      // Update camera aspect ratio for proper scaling (only for perspective cameras)
      if (camera.type === 'PerspectiveCamera') {
        const perspectiveCamera = camera as THREE.PerspectiveCamera;
        perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
        perspectiveCamera.updateProjectionMatrix();
      }
      
      // Ensure renderer fills entire viewport
      gl.setSize(window.innerWidth, window.innerHeight);
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gl, camera]);

  useFrame(({ clock, gl }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
    
    // Ensure canvas always fills viewport
    const currentSize = gl.getSize(new THREE.Vector2());
    if (currentSize.width !== window.innerWidth || currentSize.height !== window.innerHeight) {
      gl.setSize(window.innerWidth, window.innerHeight);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[50, 50, 50]}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={noiseVertexShader}
        fragmentShader={noiseFragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
};
