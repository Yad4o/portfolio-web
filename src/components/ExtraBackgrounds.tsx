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
            <Torus ref={planeRef} args={[30, 8, 30, 100]}>
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
                    color="#e0aaff" 
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
                <meshBasicMaterial color="#5a189a" wireframe transparent opacity={0.6} />
            </Cylinder>
            <Cylinder args={[10, 5, 40, 32, 10]} rotation={[Math.PI/2, 0, 0]}>
                <meshBasicMaterial color="#9d4edd" wireframe transparent opacity={0.3} />
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
                <meshBasicMaterial color="#ff00a0" wireframe transparent opacity={0.6} />
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
            {points.map((p, i) => i > 0 && <Line key={'l'+i} points={[points[i-1], p]} color="#c77dff" transparent opacity={0.8} lineWidth={2} />)}
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
// NEW HIGH-IMPACT ANIMATIONS (QUANTUM FLOW STYLE)
// ────────────────────────────────────────────────────────

// 13. Hyper Helix
export const BgOptionHyperHelix = ({ scroll }: { scroll: number }) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.z = clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
            meshRef.current.position.y = -scroll * 12;
        }
    });
    return (
        <TorusKnot ref={meshRef} args={[10, 1.5, 400, 64, 5, 8]} position={[0, 0, -20]}>
            <meshNormalMaterial wireframe={false} />
        </TorusKnot>
    );
};

// 14. Mobius Strip
export const BgOptionMobiusStrip = ({ scroll }: { scroll: number }) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.x = clock.getElapsedTime() * 0.4;
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
            meshRef.current.position.y = -scroll * 15;
        }
    });
    return (
        <TorusKnot ref={meshRef} args={[12, 3, 300, 64, 1, 3]} position={[0, 0, -25]}>
            <meshNormalMaterial wireframe={false} />
        </TorusKnot>
    );
};

// 15. Astral Rings
export const BgOptionAstralRings = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if(groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
            groupRef.current.position.y = -scroll * 10;
        }
    });
    return (
        <group ref={groupRef} position={[0, 0, -25]}>
            <Torus args={[15, 1, 64, 100]} rotation={[Math.PI/2, 0, 0]}>
                <meshNormalMaterial />
            </Torus>
            <Torus args={[12, 1, 64, 100]} rotation={[0, Math.PI/2, 0]}>
                <meshNormalMaterial />
            </Torus>
            <Torus args={[9, 1, 64, 100]} rotation={[Math.PI/4, Math.PI/4, 0]}>
                <meshNormalMaterial />
            </Torus>
            <Torus args={[20, 0.5, 64, 100]} rotation={[-Math.PI/4, -Math.PI/4, 0]}>
                <meshNormalMaterial />
            </Torus>
        </group>
    );
};

// 16. Fractal Spine
export const BgOptionFractalSpine = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if(groupRef.current) {
            groupRef.current.rotation.z = clock.getElapsedTime() * 0.2;
            groupRef.current.rotation.x = clock.getElapsedTime() * 0.1;
            groupRef.current.position.y = -scroll * 15;
        }
    });
    return (
        <group ref={groupRef} position={[0, 0, -20]}>
            <Cylinder args={[8, 1, 30, 64, 64]}>
                <meshNormalMaterial />
            </Cylinder>
            <Cylinder args={[1, 8, 30, 64, 64]} rotation={[0, 0, Math.PI/2]}>
                <meshNormalMaterial />
            </Cylinder>
        </group>
    );
};

// 17. Chromatic Web
export const BgOptionChromaticWeb = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if(groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
            groupRef.current.rotation.x = clock.getElapsedTime() * 0.15;
            groupRef.current.position.y = -scroll * 12;
        }
    });
    return (
        <group ref={groupRef} position={[0, 0, -15]}>
            <Icosahedron args={[12, 2]}>
                <meshNormalMaterial wireframe={true} />
            </Icosahedron>
            <Icosahedron args={[6, 3]}>
                <meshNormalMaterial />
            </Icosahedron>
        </group>
    );
};

// 18. Liquid Metal
export const BgOptionLiquidMetal = ({ scroll }: { scroll: number }) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
            meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
            meshRef.current.position.y = -scroll * 10;
        }
    });
    return (
        <group position={[0, 0, -15]}>
            <TorusKnot ref={meshRef} args={[7, 3, 200, 64]}>
                <meshStandardMaterial 
                    color="#ffffff" 
                    metalness={1} 
                    roughness={0.1}
                />
            </TorusKnot>
            <ambientLight intensity={2} />
            <directionalLight position={[10, 20, 10]} intensity={5} color="#c77dff" />
            <directionalLight position={[-10, -20, -10]} intensity={5} color="#00d4ff" />
        </group>
    );
};

// 19. Dimensional Vortex
export const BgOptionDimensionalVortex = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if(groupRef.current) {
            groupRef.current.rotation.z = clock.getElapsedTime() * 0.5;
            groupRef.current.position.y = -scroll * 15;
        }
    });
    return (
        <group ref={groupRef} position={[0, 0, -25]}>
            {[...Array(8)].map((_, i) => (
                <Torus key={i} args={[2 + i * 3, 0.5 + i*0.2, 32, 100]} rotation={[Math.PI/2 + (i*0.1), i*0.2, 0]}>
                    <meshNormalMaterial />
                </Torus>
            ))}
        </group>
    );
};

// 20. Serpentine Flow
export const BgOptionSerpentineFlow = ({ scroll }: { scroll: number }) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.4;
            meshRef.current.position.y = -scroll * 12;
        }
    });
    return (
        <TorusKnot ref={meshRef} args={[15, 1.5, 600, 64, 2, 7]} position={[0, 0, -30]}>
            <meshNormalMaterial />
        </TorusKnot>
    );
};
