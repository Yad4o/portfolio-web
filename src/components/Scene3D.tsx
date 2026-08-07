import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { BgOptionCyber } from './BgOptionCyber';
import { BgOptionHoloTopography, BgOptionGalacticSpiral } from './ExtraBackgrounds';
import { BgOptionWaveGrid } from './ExtraBackgrounds2';
import { CameraRig } from './CameraRig';

// IMMERSIVE 3D BACKGROUND CONTENTS
const ImmersiveCore = ({ scroll, activePage }: { scroll: number; activePage: string }) => {
  return (
    <Suspense fallback={null}>
      <CameraRig />
      {activePage === 'home' && <BgOptionGalacticSpiral scroll={scroll} />}
      {activePage === 'resume' && <BgOptionWaveGrid scroll={scroll} />}
      {activePage === 'github' && (
        <>
          <BgOptionCyber scroll={scroll} />
          <BgOptionHoloTopography scroll={scroll} />
        </>
      )}
    </Suspense>
  );
};

// This whole tree (react-three-fiber + three.js + all shader backgrounds) is
// the heaviest part of the bundle by far. It's loaded via React.lazy() from
// App.tsx so the text/UI shell can paint immediately while this streams in
// separately, instead of blocking first paint on a ~1MB three.js chunk.
const Scene3D = ({ scroll, activePage }: { scroll: number; activePage: 'home' | 'resume' | 'github' }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
        alpha: false,
      }}
      dpr={[1, 1]}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
    >
      <ImmersiveCore scroll={scroll} activePage={activePage} />
    </Canvas>
  );
};

export default Scene3D;
