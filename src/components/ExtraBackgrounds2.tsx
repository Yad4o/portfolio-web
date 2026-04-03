import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Torus } from '@react-three/drei';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════
// 20 BRAND NEW UNIQUE INTERACTIVE BACKGROUNDS
// ═══════════════════════════════════════════════════════

// 18. DNA Helix — Double spiral of glowing spheres
export const BgOptionDNAHelix = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const count = 60;

    const helixData = useMemo(() => {
        const data: { pos1: [number, number, number]; pos2: [number, number, number] }[] = [];
        for (let i = 0; i < count; i++) {
            const t = (i / count) * Math.PI * 6;
            const y = (i - count / 2) * 0.8;
            data.push({
                pos1: [Math.cos(t) * 5, y, Math.sin(t) * 5],
                pos2: [Math.cos(t + Math.PI) * 5, y, Math.sin(t + Math.PI) * 5],
            });
        }
        return data;
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
            groupRef.current.position.y = -scroll * 10;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -15]}>
            {helixData.map((d, i) => (
                <group key={i}>
                    <Sphere args={[0.3, 16, 16]} position={d.pos1}>
                        <meshBasicMaterial color="#00d4ff" />
                    </Sphere>
                    <Sphere args={[0.3, 16, 16]} position={d.pos2}>
                        <meshBasicMaterial color="#ff00a0" />
                    </Sphere>
                    {i % 4 === 0 && (
                        <Line
                            points={[new THREE.Vector3(...d.pos1), new THREE.Vector3(...d.pos2)]}
                            color="#c77dff"
                            lineWidth={1}
                            transparent
                            opacity={0.4}
                        />
                    )}
                </group>
            ))}
        </group>
    );
};

// 19. Meteor Shower — Streaking particle trails
export const BgOptionMeteorShower = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const meteorCount = 80;

    const meteors = useMemo(() => {
        return Array.from({ length: meteorCount }, () => ({
            x: (Math.random() - 0.5) * 60,
            y: Math.random() * 40,
            z: (Math.random() - 0.5) * 40 - 20,
            speed: 0.5 + Math.random() * 2,
            size: 0.05 + Math.random() * 0.15,
        }));
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -scroll * 5;
            const time = clock.getElapsedTime();
            groupRef.current.children.forEach((child, i) => {
                const m = meteors[i];
                const yOff = ((time * m.speed * 10 + m.y) % 60) - 30;
                const xOff = m.x - yOff * 0.5;
                child.position.set(xOff, yOff, m.z);
            });
        }
    });

    return (
        <group ref={groupRef}>
            {meteors.map((m, i) => (
                <mesh key={i}>
                    <sphereGeometry args={[m.size, 8, 8]} />
                    <meshBasicMaterial color="#e0aaff" transparent opacity={0.8} />
                </mesh>
            ))}
        </group>
    );
};

// 20. Crystal Lattice — 3D grid of interconnected nodes
export const BgOptionCrystalLattice = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const gridN = 6;
    const spacing = 4;

    const nodes = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        for (let x = -gridN / 2; x < gridN / 2; x++)
            for (let y = -gridN / 2; y < gridN / 2; y++)
                for (let z = -gridN / 2; z < gridN / 2; z++)
                    pts.push(new THREE.Vector3(x * spacing, y * spacing, z * spacing));
        return pts;
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
            groupRef.current.rotation.x = clock.getElapsedTime() * 0.05;
            groupRef.current.position.y = -scroll * 12;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -20]}>
            {nodes.map((p, i) => (
                <Sphere key={i} args={[0.2, 8, 8]} position={p}>
                    <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
                </Sphere>
            ))}
            {nodes.map((p, i) =>
                i > 0 && p.distanceTo(nodes[i - 1]) <= spacing + 0.5 ? (
                    <Line key={'e' + i} points={[nodes[i - 1], p]} color="#5a189a" lineWidth={1} transparent opacity={0.3} />
                ) : null
            )}
        </group>
    );
};

// 21. Fireflies — Randomly drifting glowing orbs
export const BgOptionFireflies = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const count = 120;

    const flies = useMemo(() => {
        return Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 30,
            z: (Math.random() - 0.5) * 30 - 10,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            phase: Math.random() * Math.PI * 2,
        }));
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -scroll * 8;
            const time = clock.getElapsedTime();
            groupRef.current.children.forEach((child, i) => {
                const f = flies[i];
                child.position.x = f.x + Math.sin(time * f.speedX + f.phase) * 8;
                child.position.y = f.y + Math.cos(time * f.speedY + f.phase) * 5;
                child.position.z = f.z;
                const scale = 0.5 + Math.sin(time * 2 + f.phase) * 0.5;
                child.scale.setScalar(scale);
            });
        }
    });

    return (
        <group ref={groupRef}>
            {flies.map((_, i) => (
                <mesh key={i}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshBasicMaterial color="#ffff00" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
};

// 22. Pulse Radar — Expanding concentric rings
export const BgOptionPulseRadar = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const ringCount = 12;

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -scroll * 10;
            const time = clock.getElapsedTime();
            groupRef.current.children.forEach((child, i) => {
                const ring = child as THREE.Mesh;
                const phase = (time * 0.8 + (i / ringCount) * Math.PI * 2) % (Math.PI * 2);
                const scale = 1 + (phase / (Math.PI * 2)) * 20;
                ring.scale.set(scale, scale, 1);
                const mat = ring.material as THREE.MeshBasicMaterial;
                mat.opacity = Math.max(0, 1 - phase / (Math.PI * 2));
            });
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -25]} rotation={[Math.PI / 2, 0, 0]}>
            {[...Array(ringCount)].map((_, i) => (
                <mesh key={i}>
                    <torusGeometry args={[1, 0.05, 16, 100]} />
                    <meshBasicMaterial color="#00d4ff" transparent opacity={1} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
};

// 23. Constellation Map — Stars connected by faint lines
export const BgOptionConstellationMap = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);

    const stars = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i < 80; i++) {
            pts.push(new THREE.Vector3(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20 - 15
            ));
        }
        return pts;
    }, []);

    const connections = useMemo(() => {
        const conns: [THREE.Vector3, THREE.Vector3][] = [];
        for (let i = 0; i < stars.length; i++) {
            for (let j = i + 1; j < stars.length; j++) {
                if (stars[i].distanceTo(stars[j]) < 12) {
                    conns.push([stars[i], stars[j]]);
                }
            }
        }
        return conns.slice(0, 150);
    }, [stars]);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.03;
            groupRef.current.position.y = -scroll * 8;
        }
    });

    return (
        <group ref={groupRef}>
            {stars.map((s, i) => (
                <Sphere key={i} args={[0.15 + Math.random() * 0.2, 8, 8]} position={s}>
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
                </Sphere>
            ))}
            {connections.map((c, i) => (
                <Line key={'c' + i} points={c} color="#ffffff" lineWidth={0.5} transparent opacity={0.15} />
            ))}
        </group>
    );
};

// 24. Magnetic Field — Curved flowing lines
export const BgOptionMagneticField = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const lineCount = 20;

    const fieldLines = useMemo(() => {
        return Array.from({ length: lineCount }, (_, li) => {
            const pts: THREE.Vector3[] = [];
            const startAngle = (li / lineCount) * Math.PI * 2;
            for (let t = 0; t < 40; t++) {
                const progress = t / 40;
                const r = 5 + Math.sin(progress * Math.PI) * 15;
                const y = (progress - 0.5) * 30;
                const angle = startAngle + progress * Math.PI * 0.5;
                pts.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
            }
            return pts;
        });
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
            groupRef.current.position.y = -scroll * 10;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -20]}>
            {fieldLines.map((pts, i) => (
                <Line
                    key={i}
                    points={pts}
                    color={new THREE.Color().setHSL(i / lineCount, 1, 0.6)}
                    lineWidth={1.5}
                    transparent
                    opacity={0.6}
                />
            ))}
        </group>
    );
};

// 25. Hexagonal Grid — Animated honeycomb pattern
export const BgOptionHexGrid = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);

    const hexes = useMemo(() => {
        const list: { x: number; z: number }[] = [];
        const rows = 16;
        const cols = 20;
        for (let row = -rows / 2; row < rows / 2; row++) {
            for (let col = -cols / 2; col < cols / 2; col++) {
                const x = col * 2.5 + (row % 2 === 0 ? 1.25 : 0);
                const z = row * 2.2;
                list.push({ x, z });
            }
        }
        return list;
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -scroll * 8;
            const time = clock.getElapsedTime();
            groupRef.current.children.forEach((child, i) => {
                const h = hexes[i];
                const dist = Math.sqrt(h.x * h.x + h.z * h.z);
                const wave = Math.sin(dist * 0.3 - time * 2) * 2;
                child.position.y = wave;
                const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
                mat.opacity = 0.2 + Math.max(0, Math.sin(dist * 0.3 - time * 2)) * 0.5;
            });
        }
    });

    return (
        <group ref={groupRef} position={[0, -5, -20]} rotation={[Math.PI / 4, 0, 0]}>
            {hexes.map((h, i) => (
                <mesh key={i} position={[h.x, 0, h.z]}>
                    <cylinderGeometry args={[1, 1, 0.2, 6]} />
                    <meshBasicMaterial color="#c77dff" wireframe transparent opacity={0.3} />
                </mesh>
            ))}
        </group>
    );
};

// 26. Sound Bars — Audio equalizer columns
export const BgOptionSoundBars = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const barCount = 50;

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -5 - scroll * 8;
            const time = clock.getElapsedTime();
            groupRef.current.children.forEach((child, i) => {
                const height =
                    Math.abs(Math.sin(i * 0.5 + time * 3)) * 8 +
                    Math.abs(Math.cos(i * 0.3 + time * 2)) * 4 +
                    1;
                child.scale.y = height;
                child.position.y = height / 2;
            });
        }
    });

    return (
        <group ref={groupRef} position={[0, -5, -15]}>
            {[...Array(barCount)].map((_, i) => (
                <mesh key={i} position={[(i - barCount / 2) * 0.8, 0, 0]}>
                    <boxGeometry args={[0.5, 1, 0.5]} />
                    <meshBasicMaterial
                        color={new THREE.Color().setHSL(i / barCount, 1, 0.5)}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            ))}
        </group>
    );
};

// 27. Ripple Pool — Concentric expanding water-like rings on a plane
export const BgOptionRipplePool = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const ringCount = 20;

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -scroll * 10;
            const time = clock.getElapsedTime();
            groupRef.current.children.forEach((child, i) => {
                const phase = (time * 1.5 + i * 0.5) % 8;
                const scale = phase * 4;
                child.scale.set(scale, scale, 1);
                const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
                mat.opacity = Math.max(0, 0.6 - phase / 8);
            });
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -25]} rotation={[Math.PI / 3, 0, 0]}>
            {[...Array(ringCount)].map((_, i) => (
                <mesh key={i}>
                    <torusGeometry args={[1, 0.03, 8, 80]} />
                    <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
};

// 28. Orbit System — Planetary paths with orbiting spheres
export const BgOptionOrbitSystem = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const orbits = [4, 7, 10, 14, 18];
    const speeds = [1.2, 0.8, 0.5, 0.35, 0.2];
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#9d4edd'];

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -scroll * 10;
            groupRef.current.rotation.x = 0.5;
            const time = clock.getElapsedTime();
            // Planets are every other child (ring, planet, ring, planet...)
            for (let i = 0; i < orbits.length; i++) {
                const planet = groupRef.current.children[orbits.length + i] as THREE.Mesh;
                if (planet) {
                    const angle = time * speeds[i];
                    planet.position.x = Math.cos(angle) * orbits[i];
                    planet.position.z = Math.sin(angle) * orbits[i];
                }
            }
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -25]}>
            {/* Central sun */}
            <Sphere args={[1.5, 32, 32]}>
                <meshBasicMaterial color="#ffaa00" />
            </Sphere>
            {/* Orbit rings */}
            {orbits.map((r, i) => (
                <Torus key={'o' + i} args={[r, 0.03, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshBasicMaterial color={colors[i]} transparent opacity={0.3} />
                </Torus>
            ))}
            {/* Planets */}
            {orbits.map((_, i) => (
                <Sphere key={'p' + i} args={[0.4 + i * 0.15, 16, 16]}>
                    <meshBasicMaterial color={colors[i]} />
                </Sphere>
            ))}
        </group>
    );
};

// 29. Lightning Storm — Branching electric bolts
export const BgOptionLightningStorm = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);

    const bolts = useMemo(() => {
        return Array.from({ length: 8 }, () => {
            const pts: THREE.Vector3[] = [];
            let x = (Math.random() - 0.5) * 30;
            let y = 20;
            const z = (Math.random() - 0.5) * 10 - 15;
            for (let s = 0; s < 12; s++) {
                pts.push(new THREE.Vector3(x, y, z));
                x += (Math.random() - 0.5) * 6;
                y -= 2 + Math.random() * 2;
            }
            return pts;
        });
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -scroll * 10;
            const time = clock.getElapsedTime();
            groupRef.current.children.forEach((child, i) => {
                const flash = Math.sin(time * 8 + i * 3) > 0.7 ? 1 : 0.1;
                child.visible = flash > 0.5 || Math.random() > 0.95;
            });
        }
    });

    return (
        <group ref={groupRef}>
            {bolts.map((pts, i) => (
                <Line
                    key={i}
                    points={pts}
                    color="#e0aaff"
                    lineWidth={2 + Math.random() * 2}
                    transparent
                    opacity={0.9}
                />
            ))}
        </group>
    );
};

// 30. Wave Grid — Undulating grid of dots
export const BgOptionWaveGrid = ({ scroll }: { scroll: number }) => {
    const pointsRef = useRef<THREE.Points>(null!);
    const gridSize = 40;
    const count = gridSize * gridSize;

    const basePositions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const idx = (i * gridSize + j) * 3;
                pos[idx] = (i - gridSize / 2) * 1.2;
                pos[idx + 1] = 0;
                pos[idx + 2] = (j - gridSize / 2) * 1.2;
            }
        }
        return pos;
    }, []);

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.position.y = -scroll * 10;
            pointsRef.current.rotation.x = Math.PI / 4;
            const time = clock.getElapsedTime();
            const positions = pointsRef.current.geometry.attributes.position;
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const idx = i * gridSize + j;
                    const x = (i - gridSize / 2) * 1.2;
                    const z = (j - gridSize / 2) * 1.2;
                    const dist = Math.sqrt(x * x + z * z);
                    positions.setY(idx, Math.sin(dist * 0.4 - time * 3) * 3);
                }
            }
            positions.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef} position={[0, 0, -25]}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={basePositions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.15} color="#c77dff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
        </points>
    );
};

// 31. Smoke Wisps — Floating semi-transparent layers
export const BgOptionSmokeWisps = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const wispCount = 15;

    const wisps = useMemo(() => {
        return Array.from({ length: wispCount }, () => ({
            x: (Math.random() - 0.5) * 30,
            y: (Math.random() - 0.5) * 20,
            z: (Math.random() - 0.5) * 10 - 15,
            rotSpeed: (Math.random() - 0.5) * 0.5,
            driftSpeed: (Math.random() - 0.5) * 0.3,
            scale: 5 + Math.random() * 10,
            hue: 0.7 + Math.random() * 0.2,
        }));
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -scroll * 8;
            const time = clock.getElapsedTime();
            groupRef.current.children.forEach((child, i) => {
                const w = wisps[i];
                child.position.x = w.x + Math.sin(time * w.driftSpeed) * 5;
                child.position.y = w.y + Math.cos(time * w.driftSpeed * 0.7) * 3;
                child.rotation.z = time * w.rotSpeed;
            });
        }
    });

    return (
        <group ref={groupRef}>
            {wisps.map((w, i) => (
                <mesh key={i} position={[w.x, w.y, w.z]}>
                    <planeGeometry args={[w.scale, w.scale]} />
                    <meshBasicMaterial
                        color={new THREE.Color().setHSL(w.hue, 0.6, 0.5)}
                        transparent
                        opacity={0.08}
                        blending={THREE.AdditiveBlending}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </group>
    );
};

// 32. Prism Beams — Rainbow light rays from a central point
export const BgOptionPrismBeams = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const beamCount = 24;

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -scroll * 8;
            groupRef.current.rotation.z = clock.getElapsedTime() * 0.15;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -20]}>
            {[...Array(beamCount)].map((_, i) => {
                const angle = (i / beamCount) * Math.PI * 2;
                const length = 25;
                const endX = Math.cos(angle) * length;
                const endY = Math.sin(angle) * length;
                return (
                    <Line
                        key={i}
                        points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(endX, endY, 0)]}
                        color={new THREE.Color().setHSL(i / beamCount, 1, 0.6)}
                        lineWidth={2}
                        transparent
                        opacity={0.4}
                    />
                );
            })}
            <Sphere args={[0.8, 32, 32]}>
                <meshBasicMaterial color="#ffffff" />
            </Sphere>
        </group>
    );
};

// 33. Particle Fountain — Upward spray of particles falling back down
export const BgOptionParticleFountain = ({ scroll }: { scroll: number }) => {
    const pointsRef = useRef<THREE.Points>(null!);
    const count = 3000;

    const particleData = useMemo(() => {
        const offsets = new Float32Array(count * 3);
        const velocities: { vx: number; vy: number; vz: number; life: number }[] = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spread = Math.random() * 0.5;
            velocities.push({
                vx: Math.cos(angle) * spread,
                vy: 2 + Math.random() * 4,
                vz: Math.sin(angle) * spread,
                life: Math.random(), // phase offset
            });
            offsets[i * 3] = 0;
            offsets[i * 3 + 1] = 0;
            offsets[i * 3 + 2] = 0;
        }
        return { offsets, velocities };
    }, []);

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.position.y = -10 - scroll * 10;
            const time = clock.getElapsedTime();
            const positions = pointsRef.current.geometry.attributes.position;
            for (let i = 0; i < count; i++) {
                const v = particleData.velocities[i];
                const t = (time + v.life * 5) % 3; // 3 second cycle
                const gravity = -4;
                positions.setXYZ(
                    i,
                    v.vx * t * 3,
                    v.vy * t + 0.5 * gravity * t * t,
                    v.vz * t * 3
                );
            }
            positions.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef} position={[0, -10, -15]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particleData.offsets}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.1} color="#ffaa00" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
        </points>
    );
};

// 34. Hologram Cube — Wireframe rotating cube with inner structure
export const BgOptionHologramCube = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = clock.getElapsedTime() * 0.3;
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.4;
            groupRef.current.rotation.z = clock.getElapsedTime() * 0.1;
            groupRef.current.position.y = -scroll * 10;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -20]}>
            {/* Outer cube */}
            <mesh>
                <boxGeometry args={[15, 15, 15]} />
                <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.4} />
            </mesh>
            {/* Inner cube */}
            <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                <boxGeometry args={[10, 10, 10]} />
                <meshBasicMaterial color="#c77dff" wireframe transparent opacity={0.3} />
            </mesh>
            {/* Innermost cube */}
            <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
                <boxGeometry args={[6, 6, 6]} />
                <meshBasicMaterial color="#ff00a0" wireframe transparent opacity={0.5} />
            </mesh>
            {/* Corner spheres on outer cube */}
            {[[-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1],
              [1, -1, -1], [1, -1, 1], [1, 1, -1], [1, 1, 1]].map((c, i) => (
                <Sphere key={i} args={[0.3, 8, 8]} position={[c[0] * 7.5, c[1] * 7.5, c[2] * 7.5]}>
                    <meshBasicMaterial color="#00d4ff" />
                </Sphere>
            ))}
        </group>
    );
};

// 35. Aurora Curtain — Flowing vertical bands with shader-like motion
export const BgOptionAuroraCurtain = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const bandCount = 12;

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -scroll * 5;
            const time = clock.getElapsedTime();
            groupRef.current.children.forEach((child, i) => {
                const mesh = child as THREE.Mesh;
                const geom = mesh.geometry as THREE.PlaneGeometry;
                const pos = geom.attributes.position;
                for (let j = 0; j < pos.count; j++) {
                    const y = pos.getY(j);
                    const wave = Math.sin(y * 0.3 + time * 2 + i) * 3 + Math.sin(y * 0.1 + time) * 5;
                    pos.setZ(j, wave);
                }
                pos.needsUpdate = true;
            });
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -25]}>
            {[...Array(bandCount)].map((_, i) => (
                <mesh key={i} position={[(i - bandCount / 2) * 4, 0, 0]}>
                    <planeGeometry args={[3, 40, 1, 30]} />
                    <meshBasicMaterial
                        color={new THREE.Color().setHSL(0.3 + i * 0.05, 1, 0.5)}
                        transparent
                        opacity={0.12}
                        blending={THREE.AdditiveBlending}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </group>
    );
};

// 36. Bokeh Lights — Large, blurry out-of-focus light circles
export const BgOptionBokehLights = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);

    const lights = useMemo(() => {
        return Array.from({ length: 30 }, () => ({
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 25,
            z: (Math.random() - 0.5) * 10 - 15,
            scale: 1.5 + Math.random() * 4,
            hue: Math.random(),
            driftX: (Math.random() - 0.5) * 0.2,
            driftY: (Math.random() - 0.5) * 0.15,
            phase: Math.random() * Math.PI * 2,
        }));
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -scroll * 8;
            const time = clock.getElapsedTime();
            groupRef.current.children.forEach((child, i) => {
                const l = lights[i];
                child.position.x = l.x + Math.sin(time * l.driftX + l.phase) * 5;
                child.position.y = l.y + Math.cos(time * l.driftY + l.phase) * 3;
                const pulse = 0.9 + Math.sin(time * 1.5 + l.phase) * 0.1;
                child.scale.setScalar(l.scale * pulse);
            });
        }
    });

    return (
        <group ref={groupRef}>
            {lights.map((l, i) => (
                <mesh key={i} position={[l.x, l.y, l.z]}>
                    <circleGeometry args={[1, 32]} />
                    <meshBasicMaterial
                        color={new THREE.Color().setHSL(l.hue, 0.7, 0.6)}
                        transparent
                        opacity={0.15}
                        blending={THREE.AdditiveBlending}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </group>
    );
};

// 37. Digital Matrix — Falling green columns of dots
export const BgOptionDigitalMatrix = ({ scroll }: { scroll: number }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const colCount = 30;
    const dotsPerCol = 20;

    const columns = useMemo(() => {
        return Array.from({ length: colCount }, () => ({
            x: (Math.random() - 0.5) * 40,
            z: (Math.random() - 0.5) * 20 - 15,
            speed: 3 + Math.random() * 8,
            offset: Math.random() * 40,
        }));
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = -scroll * 5;
            const time = clock.getElapsedTime();
            let childIdx = 0;
            for (let c = 0; c < colCount; c++) {
                const col = columns[c];
                for (let d = 0; d < dotsPerCol; d++) {
                    const child = groupRef.current.children[childIdx] as THREE.Mesh;
                    if (child) {
                        const y = ((col.offset + time * col.speed + d * 1.5) % 40) - 20;
                        child.position.y = y;
                        const mat = child.material as THREE.MeshBasicMaterial;
                        mat.opacity = d === 0 ? 1 : Math.max(0, 0.8 - d * 0.04);
                    }
                    childIdx++;
                }
            }
        }
    });

    return (
        <group ref={groupRef}>
            {columns.flatMap((col, ci) =>
                Array.from({ length: dotsPerCol }, (_, di) => (
                    <mesh key={`${ci}-${di}`} position={[col.x, 0, col.z]}>
                        <sphereGeometry args={[0.12, 6, 6]} />
                        <meshBasicMaterial color="#00ff41" transparent opacity={0.8} />
                    </mesh>
                ))
            )}
        </group>
    );
};
