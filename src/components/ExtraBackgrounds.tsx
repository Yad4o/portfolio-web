import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, TorusKnot, Sphere, Float, Stars, Line, Torus, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

// 3. Neon Geometric (SCALED UP)
export const BgOptionNeonGeometric = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if(groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
            groupRef.current.rotation.x = clock.getElapsedTime() * 0.08;
            groupRef.current.position.y = -scroll * 8;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={2} floatIntensity={4}>
                <Icosahedron args={[10, 1]}>
                    <meshBasicMaterial color="#00ffff" wireframe />
                </Icosahedron>
            </Float>
            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={3}>
                <Icosahedron args={[15, 1]}>
                    <meshBasicMaterial color="#ff00ff" wireframe transparent opacity={0.4} />
                </Icosahedron>
            </Float>
        </group>
    );
};

// 4. Cosmic Dust
export const BgOptionCosmicDust = ({ scroll }: { scroll: number }) => {
    const starsRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if(starsRef.current) {
            starsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
            starsRef.current.position.y = -scroll * 15;
        }
    });
    return (
        <group ref={starsRef}>
            <Stars radius={100} depth={100} count={10000} factor={8} saturation={1} fade speed={3} />
            <ambientLight intensity={0.5} />
        </group>
    );
};

// 5. Quantum Flow (MASSIVE)
export const BgOptionQuantumFlow = ({ scroll }: { scroll: number }) => {
    const knotRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        if(knotRef.current) {
            knotRef.current.rotation.x = clock.getElapsedTime() * 0.3;
            knotRef.current.rotation.y = clock.getElapsedTime() * 0.4;
            knotRef.current.position.y = Math.sin(clock.getElapsedTime()*0.5) * 2 - scroll * 15;
        }
    });
    return (
        <TorusKnot ref={knotRef} args={[8, 2.5, 300, 64]} position={[0,0,-15]}>
            <meshNormalMaterial wireframe={true} />
        </TorusKnot>
    );
};

// 6. Holographic Topography (MASSIVE WIREFRAME TORUS)
export const BgOptionHoloTopography = ({ scroll }: { scroll: number }) => {
    const planeRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        if(planeRef.current) {
            planeRef.current.rotation.x = Math.PI / 2 + Math.sin(clock.getElapsedTime()*0.2)*0.2;
            planeRef.current.rotation.z = clock.getElapsedTime() * -0.1;
            planeRef.current.position.y = -5 - scroll * 10;
        }
    });
    return (
        <group position={[0, 0, -25]}>
            <Torus ref={planeRef} args={[30, 8, 16, 64]}>
                <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.3} />
            </Torus>
            <fog attach="fog" args={["#05060b", 10, 60]} />
        </group>
    );
};

// 7. Prismatic Glass (MASSIVE KNOT)
export const BgOptionPrismaticGlass = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if(groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
            groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
            groupRef.current.position.y = -scroll * 12;
        }
    });
    return (
        <group ref={groupRef} position={[0, 0, -10]}>
            <TorusKnot args={[6, 2.5, 200, 32]}>
                <meshPhysicalMaterial 
                    roughness={0.1} 
                    transmission={1} 
                    thickness={4} 
                    color="#e2e8f0" 
                    emissive="#110022"
                    emissiveIntensity={0.5}
                />
            </TorusKnot>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={3} color="#fff" />
            <pointLight position={[-10, -10, -10]} intensity={3} color="#00d4ff" />
        </group>
    );
};

// 8. Abyssal Spine (MASSIVE WIREFRAME CYLINDERS)
export const BgOptionAbyssalVoid = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if(groupRef.current) {
            groupRef.current.rotation.x = clock.getElapsedTime() * 0.2;
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
            groupRef.current.position.y = -scroll * 10;
        }
    });
    return (
        <group ref={groupRef} position={[0,0,-15]}>
            <Cylinder args={[5, 10, 40, 32, 10]}>
                <meshBasicMaterial color="#334155" wireframe transparent opacity={0.6} />
            </Cylinder>
            <Cylinder args={[10, 5, 40, 32, 10]} rotation={[Math.PI/2, 0, 0]}>
                <meshBasicMaterial color="#475569" wireframe transparent opacity={0.3} />
            </Cylinder>
        </group>
    );
};

// 9. Retro Synthwave (MASSIVE)
export const BgOptionRetroSynthwave = ({ scroll }: { scroll: number }) => {
    const gridRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        if(gridRef.current) {
            gridRef.current.position.z = (clock.getElapsedTime() * 10) % 4 - 20;
            gridRef.current.position.y = -10 - scroll * 5;
        }
    });
    return (
        <group>
            <mesh ref={gridRef} rotation={[-Math.PI/2, 0, 0]} position={[0, -10, -20]}>
                <planeGeometry args={[200, 200, 100, 100]} />
                <meshBasicMaterial color="#64748b" wireframe transparent opacity={0.6} />
            </mesh>
            <Sphere args={[25, 32, 32]} position={[0, 10, -60]}>
                <meshBasicMaterial color="#ffaa00" />
            </Sphere>
            <fog attach="fog" args={["#05060b", 10, 80]} />
        </group>
    );
};

// 10. Neural Network (MASSIVE DATA SPHERES & LINES)
export const BgOptionNeuralNetwork = ({ scroll }: { scroll: number }) => {
    const ref = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if(ref.current) {
            ref.current.rotation.y = clock.getElapsedTime() * 0.1;
            ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.15;
            ref.current.position.y = -scroll * 15;
        }
    });

    const points = useMemo(() => {
        const pts = [];
        for(let i=0; i<40; i++) pts.push(new THREE.Vector3((Math.random()-0.5)*40, (Math.random()-0.5)*40, (Math.random()-0.5)*30 - 15));
        return pts;
    }, []);

    return (
        <group ref={ref}>
            {points.map((p, i) => (
                <Sphere key={i} args={[0.8]} position={p}>
                    <meshBasicMaterial color="#00d4ff" />
                </Sphere>
            ))}
            {points.map((p, i) => i > 0 && <Line key={'l'+i} points={[points[i-1], p]} color="#94a3b8" transparent opacity={0.8} lineWidth={2} />)}
            {points.map((p, i) => i < points.length - 2 && <Line key={'c'+i} points={[p, points[i+2]]} color="#00d4ff" transparent opacity={0.4} lineWidth={1.5} />)}
        </group>
    );
}

// 11. Plasma Orbs (MASSIVE)
export const BgOptionPlasmaOrbs = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if(groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
            groupRef.current.position.y = -scroll * 10;
        }
    });
    return (
        <group ref={groupRef} position={[0,0,-20]}>
            {[...Array(6)].map((_, i) => (
                <Float key={i} speed={4} rotationIntensity={4} floatIntensity={5}>
                    <Sphere args={[8 + Math.random()*4, 64, 64]} position={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random()-0.5)*10]}>
                        <meshBasicMaterial color={new THREE.Color().setHSL(Math.random(), 1, 0.5)} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
                    </Sphere>
                </Float>
            ))}
        </group>
    );
};

// 12. Ethereal Aurora (MASSIVE PLANES)
export const BgOptionEtherealAurora = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if(groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
            groupRef.current.position.y = -scroll * 10;
        }
    });
    return (
        <group ref={groupRef} position={[0,0,-30]}>
            {[...Array(5)].map((_, i) => (
                <mesh key={i} position={[0, (i - 2.5) * 10, 0]} rotation={[-Math.PI / 2.5, 0, i * 0.5]}>
                    <planeGeometry args={[150, 150]} />
                    <meshBasicMaterial color={new THREE.Color().setHSL(0.6 + i * 0.08, 1, 0.6)} transparent opacity={0.15} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
                </mesh>
            ))}
        </group>
    );
};

// ────────────────────────────────────────────────────────
// NEW TRULY UNIQUE ANIMATIONS
// ────────────────────────────────────────────────────────

// 13. Galactic Spiral (Complex Particle System)
export const BgOptionGalacticSpiral = ({ scroll }: { scroll: number }) => {
    const pointsRef = useRef<THREE.Points>(null!);
    const count = 15000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for(let i=0; i<count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.pow(Math.random(), 2) * 50; // Dense center
            const branchOffset = (i % 5) * ((Math.PI * 2) / 5);
            const spiralAngle = angle + radius * 0.1 + branchOffset;
            
            pos[i*3] = Math.cos(spiralAngle) * radius;
            pos[i*3+1] = (Math.random() - 0.5) * (10 - radius * 0.15); // Flatter at edges
            pos[i*3+2] = Math.sin(spiralAngle) * radius;
        }
        return pos;
    }, []);

    useFrame(({ clock }) => {
        if(pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.1;
            pointsRef.current.rotation.x = clock.getElapsedTime() * 0.05 + 0.5;
            pointsRef.current.position.y = -scroll * 10;
        }
    });

    return (
        <group position={[0, -5, -40]}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.15} color="#e2e8f0" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
            </points>
        </group>
    );
};

// 14. Voxel City (Dynamic Grid Equalizer)
export const BgOptionVoxelCity = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const gridSize = 15;
    const spacing = 1.2;

    useFrame(({ clock }) => {
        if(groupRef.current) {
            groupRef.current.position.y = -8 - scroll * 12;
            groupRef.current.position.z = -15 + (clock.getElapsedTime() * 2) % spacing;
            const children = groupRef.current.children;
            let i = 0;
            const time = clock.getElapsedTime();
            for (let x = -gridSize; x < gridSize; x++) {
                for (let z = -gridSize; z < gridSize; z++) {
                    const child = children[i] as THREE.Mesh;
                    if (child) {
                        // Wave physics
                        const wave = Math.sin(x * 0.5 + time) * Math.cos(z * 0.5 + time) * 3;
                        child.scale.y = Math.max(0.1, wave + 4);
                    }
                    i++;
                }
            }
        }
    });

    const boxes = [];
    for (let x = -gridSize; x < gridSize; x++) {
        for (let z = -gridSize; z < gridSize; z++) {
            boxes.push(
                <mesh key={`${x}-${z}`} position={[x * spacing, 0, z * spacing]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.3} />
                </mesh>
            );
        }
    }

    return (
        <group rotation={[Math.PI / 8, Math.PI / 4, 0]}>
            <group ref={groupRef}>
                {boxes}
            </group>
            <fog attach="fog" args={["#05060b", 10, 40]} />
        </group>
    );
};

// 15. Tunnel Vision (Infinite Flythrough)
export const BgOptionTunnelVision = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const ringsCount = 40;
    const spacing = 2;

    useFrame(({ clock }) => {
        if(groupRef.current) {
            groupRef.current.position.z = (clock.getElapsedTime() * 15) % spacing;
            groupRef.current.position.y = -scroll * 5;
            
            // Wobble the tunnel
            groupRef.current.children.forEach((child, i) => {
                const zOffset = i * spacing;
                child.position.x = Math.sin(zOffset * 0.1 + clock.getElapsedTime()) * 5;
                child.position.y = Math.cos(zOffset * 0.15 + clock.getElapsedTime()) * 5;
            });
        }
    });

    return (
        <group position={[0, 0, 5]}>
            <group ref={groupRef}>
                {[...Array(ringsCount)].map((_, i) => (
                    <mesh key={i} position={[0, 0, -i * spacing]}>
                        <torusGeometry args={[8, 0.1, 16, 64]} />
                        <meshBasicMaterial color={new THREE.Color().setHSL(0.8 - i*0.02, 1, 0.6)} wireframe transparent opacity={Math.max(0, 1 - i/ringsCount)} />
                    </mesh>
                ))}
            </group>
        </group>
    );
};

// 16. Oscilloscope Waves (Line based visualization)
export const BgOptionOscilloscope = ({ scroll }: { scroll: number }) => {
    const linesRef = useRef<THREE.Group>(null!);
    
    useFrame(({ clock }) => {
        if (linesRef.current) {
            linesRef.current.position.y = -scroll * 8;
            linesRef.current.rotation.x = Math.PI / 6;
            const time = clock.getElapsedTime();
            
            linesRef.current.children.forEach((child: any, i) => {
                const geom = child.geometry;
                const pos = geom.attributes.position;
                for (let j = 0; j < pos.count; j++) {
                    const x = pos.getX(j);
                    // Add wild sin waves mixing
                    const y = Math.sin(x * 0.5 + time * 2 + i) * 3 
                            + Math.sin(x * 1.5 - time * 3) * 1.5 
                            + Math.cos(x * 0.2 + time);
                    pos.setY(j, y);
                }
                pos.needsUpdate = true;
            });
        }
    });

    const lines = useMemo(() => {
        return [...Array(5)].map((_, i) => {
            const points = [];
            for (let x = -30; x <= 30; x += 0.5) {
                points.push(new THREE.Vector3(x, 0, i * 2 - 4));
            }
            return points;
        });
    }, []);

    return (
        <group ref={linesRef} position={[0, 0, -15]}>
            {lines.map((pts, i) => (
                <Line key={i} points={pts} color={i % 2 === 0 ? "#64748b" : "#94a3b8"} lineWidth={2} transparent opacity={0.8} />
            ))}
        </group>
    );
};

// 17. Fluid Blob (Custom Shader Vertex Displacement)
const blobVertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  
  // Classic 3D Noise loosely
  float noise(vec3 p) {
      return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
  }

  void main() {
    vNormal = normal;
    
    vec3 p = position;
    // Displace heavily based on normal and sine waves + time
    float displacement = sin(p.x * 2.0 + uTime * 2.0) * sin(p.y * 2.0 + uTime) * sin(p.z * 1.5 + uTime * 1.5);
    p += normal * displacement * 1.5;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const blobFragmentShader = `
  varying vec3 vNormal;
  
  void main() {
    // Normal color mapping but highly saturated
    vec3 color = normalize(vNormal) * 0.5 + 0.5;
    
    // Mix with a hot pink/purple aesthetic
    vec3 target = vec3(1.0, 0.0, 0.8);
    color = mix(color, target, 0.3);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const BgOptionFluidBlob = ({ scroll }: { scroll: number }) => {
    const materialRef = useRef<THREE.ShaderMaterial>(null!);
    useFrame(({ clock }) => {
        if(materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 }
    }), []);

    return (
        <group position={[0, 0, -15]}>
            <mesh position={[0, -scroll * 8, 0]}>
                <icosahedronGeometry args={[8, 128]} />
                <shaderMaterial 
                    ref={materialRef}
                    vertexShader={blobVertexShader}
                    fragmentShader={blobFragmentShader}
                    uniforms={uniforms}
                    wireframe={false}
                />
            </mesh>
        </group>
    );
};
