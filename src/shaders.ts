// Vertex Shader for animated noise background
export const noiseVertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const noiseFragmentShader = /* glsl */`
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  #define PI 3.14159265359

  // 2D Rotation matrix
  mat2 rot(float a) {
      float c = cos(a), s = sin(a);
      return mat2(c, -s, s, c);
  }

  // Neon glowing palette
  vec3 palette(float t) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.263, 0.416, 0.557);
      return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    // Map vUv from [0,1] to [-1, 1]
    vec2 uv = (vUv - 0.5) * 2.0;
    
    // Aspect ratio correction (prevent stretching)
    if (uResolution.x > 0.0 && uResolution.y > 0.0) {
        uv.x *= uResolution.x / uResolution.y;
    }

    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    
    // Slow majestic rotation
    uv *= rot(uTime * 0.05);
    
    // Iterate to create profound geometric fractals (Sacred Math)
    for (float i = 0.0; i < 4.0; i++) {
        // Space folding
        uv = fract(uv * 1.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));

        // Shift color palette dynamically
        vec3 col = palette(length(uv0) + float(i)*0.4 + uTime * 0.4);

        // Core geometric repeating
        d = sin(d * 8.0 + uTime * 0.5) / 8.0;
        d = abs(d);

        // Neon bloom glow (inverse falloff)
        d = pow(0.01 / d, 1.3);

        finalColor += col * d;
    }
    
    // Blend with an ultra-premium dark background
    vec3 spaceBg = vec3(0.02, 0.0, 0.04);
    finalColor = mix(spaceBg, finalColor, 0.45);
    
    // Outer vignette
    float v = length(uv0);
    finalColor *= smoothstep(2.5, 0.1, v);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Particle Morpher Shader
export const particleMorphVertexShader = /* glsl */`
  attribute vec3 aPosition2; // Perfect Grid
  attribute vec3 aPosition3; // Perfect Hexagon
  attribute vec3 aPosition4; // 3D Torus
  attribute vec3 aPosition5; // 3D Dodecahedron
  attribute vec3 aPosition6; // Perfect Spiral
  uniform float uMorphProgress;
  uniform float uTime;
  uniform float uBurstIntensity;
  uniform float uSecondaryIntensity;
  uniform float uTertiaryIntensity;
  uniform float u4DRotation;
  uniform float uHyperScale;
  uniform float uDimensionalShift;
  uniform vec2 uMouse;
  varying vec3 vColor;
  varying float vShapeSeed;

  // 4D rotation functions
  vec4 rotate4DXW(vec4 p, float angle) {
    float cos_a = cos(angle);
    float sin_a = sin(angle);
    return vec4(
      p.x * cos_a - p.w * sin_a,
      p.y,
      p.z,
      p.x * sin_a + p.w * cos_a
    );
  }

  vec4 rotate4DYZ(vec4 p, float angle) {
    float cos_a = cos(angle);
    float sin_a = sin(angle);
    return vec4(
      p.x,
      p.y * cos_a - p.w * sin_a,
      p.z,
      p.y * sin_a + p.w * cos_a
    );
  }

  vec4 rotate4DZW(vec4 p, float angle) {
    float cos_a = cos(angle);
    float sin_a = sin(angle);
    return vec4(
      p.x,
      p.y,
      p.z * cos_a - p.w * sin_a,
      p.z * sin_a + p.w * cos_a
    );
  }

  // Noise function for dimensional effects
  float noise(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
  }

  void main() {
    // Stable per-particle seed from base position (does not depend on extra buffer attributes)
    vShapeSeed = fract(sin(dot(position, vec3(12.9898, 78.233, 45.164))) * 43758.5453123);

    vec3 pos;
    float progress = uMorphProgress;
    
    // Smooth out the interpolation for buttery morphing
    float p1 = smoothstep(0.0, 1.0, progress);
    float p2 = smoothstep(1.0, 2.0, progress);
    float p3 = smoothstep(2.0, 3.0, progress);
    float p4 = smoothstep(3.0, 4.0, progress);
    float p5 = smoothstep(4.0, 5.0, progress);

    if (progress <= 1.0) {
      pos = mix(position, aPosition2, p1);
    } else if (progress <= 2.0) {
      pos = mix(aPosition2, aPosition3, p2);
    } else if (progress <= 3.0) {
      pos = mix(aPosition3, aPosition4, p3);
    } else if (progress <= 4.0) {
      pos = mix(aPosition4, aPosition5, p4);
    } else if (progress <= 5.0) {
      pos = mix(aPosition5, aPosition6, p5);
    } else {
      pos = aPosition6;
    }

    // Disable organic curl noise drift for clean geometric fidelity
    vec3 curl = vec3(0.0);
    // Add turbulence scale based on scrolling entirely removed.
    pos += curl;

    // 4D transformations
    vec4 pos4D = vec4(pos, 0.0);
    
    // Apply 4D rotations based on scroll and time
    pos4D = rotate4DXW(pos4D, u4DRotation);
    pos4D = rotate4DYZ(pos4D, u4DRotation * 0.7);
    pos4D = rotate4DZW(pos4D, u4DRotation * 0.3);
    
    // Project back to 3D with hyper-dimensional effects
    float w = pos4D.w;
    pos = pos4D.xyz;
    
    // Add dimensional shifting effects
    float dimensionalNoise = noise(pos * 2.0 + uTime * 0.1);
    pos += vec3(
      sin(uTime * 0.5 + dimensionalNoise * 6.28) * uDimensionalShift * 0.3,
      cos(uTime * 0.3 + dimensionalNoise * 6.28) * uDimensionalShift * 0.2,
      sin(uTime * 0.7 + dimensionalNoise * 6.28) * uDimensionalShift * 0.25
    );
    
    // Hyper-scaling based on 4D position
    float hyperScale = uHyperScale * (1.0 + w * 0.5);
    pos *= hyperScale;
    
    // Extra organic breathing
    float professionalBreathe = sin(uTime * 0.6 + w * 2.0 + vShapeSeed * 6.28) * 0.08 * hyperScale;
    float elegantGlide = cos(uTime * 0.4 + w * 1.5 - vShapeSeed * 6.28) * 0.08 * hyperScale;
    pos.y += professionalBreathe;
    pos.x += elegantGlide;
    pos.z -= professionalBreathe;

    // Burst effects
    float burstPhase = uTime * 2.5 + length(pos) * 0.8;
    vec3 burstOffset = vec3(
      sin(burstPhase) * uBurstIntensity,
      cos(burstPhase * 1.3) * uSecondaryIntensity,
      sin(burstPhase * 0.7) * uTertiaryIntensity
    );
    pos += burstOffset;

    // Scale down points a bit because there are so many of them now.
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float baseSize = 4.0 * hyperScale * (1.0 + vShapeSeed);
    gl_PointSize = baseSize * (22.0 / (max(0.1, -mvPosition.z)));
    gl_Position = projectionMatrix * mvPosition;

    // Premium Iridescent Colors
    vec3 c1 = vec3(0.5, 0.5, 0.5);
    vec3 c2 = vec3(0.5, 0.5, 0.5);
    vec3 c3 = vec3(1.0, 1.0, 1.0);
    vec3 c4 = vec3(0.2, 0.4, 0.8);
    
    float tColor = uTime * 0.15 + length(pos) * 0.12 + w * 0.4;
    vec3 iridescence = c1 + c2 * cos(6.28318 * (c3 * tColor + c4));
    
    // Blend with a hot/cyan premium palette depending on shape/seed
    vec3 hotPink = vec3(1.0, 0.1, 0.6);
    vec3 neonCyan = vec3(0.0, 0.8, 1.0);
    vec3 neonPurple = vec3(0.6, 0.1, 0.9);
    
    float colorMix = sin(uTime * 0.3 + vShapeSeed * 6.28) * 0.5 + 0.5;
    vec3 premiumBase = mix(neonCyan, mix(hotPink, neonPurple, vShapeSeed), colorMix);
    
    vColor = mix(iridescence, premiumBase, 0.65);
    vColor *= (1.2 + abs(w) * 0.3); // Brightness pop based on 4D depth
  }
`;

export const particleMorphFragmentShader = /* glsl */`
  varying vec3 vColor;
  varying float vShapeSeed;
  uniform float uTime;
  uniform float u4DRotation;
  uniform float uHyperScale;

  float softCircle(vec2 uv, float radius) {
    float d = length(uv);
    return 1.0 - smoothstep(radius, radius + 0.14, d);
  }

  // Soft 4-lobe star (distinct silhouette, smooth edges)
  float softStar4(vec2 uv, float scale) {
    float a = atan(uv.y, uv.x);
    float r = length(uv);
    float lobes = 0.52 + 0.22 * cos(4.0 * a);
    float radius = scale * lobes;
    return 1.0 - smoothstep(radius - 0.03, radius + 0.06, r);
  }

  float softRing(vec2 uv, float rInner, float rOuter) {
    float d = length(uv);
    float inner = smoothstep(rInner - 0.05, rInner, d);
    float outer = 1.0 - smoothstep(rOuter, rOuter + 0.06, d);
    return inner * outer;
  }

  float softDiamond(vec2 uv, float size) {
    float d = abs(uv.x) + abs(uv.y);
    return 1.0 - smoothstep(size * 0.48, size * 0.48 + 0.1, d);
  }

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    float r = 0.42 * uHyperScale;

    float s0 = softCircle(uv, r);
    float s1 = softStar4(uv, r * 1.05);
    float s2 = softRing(uv, r * 0.38, r * 0.72);
    float s3 = softDiamond(uv, r * 1.1);

    // One dominant silhouette per particle (0–3) so shapes read clearly
    float k = floor(vShapeSeed * 4.0);
    float alpha = s0 * (1.0 - step(1.0, k))
      + s1 * (step(1.0, k) - step(2.0, k))
      + s2 * (step(2.0, k) - step(3.0, k))
      + s3 * step(3.0, k);

    // Soft morph between neighboring types over time (still readable)
    float phase = u4DRotation * 0.25 + uTime * 0.15;
    float morph = sin(phase + vShapeSeed * 6.28318530718) * 0.5 + 0.5;
    float alt = mod(k + 1.0, 4.0);
    float sAlt = s0 * (1.0 - step(1.0, alt)) + s1 * (step(1.0, alt) - step(2.0, alt))
      + s2 * (step(2.0, alt) - step(3.0, alt)) + s3 * step(3.0, alt);
    alpha = mix(alpha, sAlt, morph * 0.22);

    if (alpha < 0.02) discard;

    vec3 baseColor = vColor;
    float slowWave = sin(uTime * 0.6 + u4DRotation * 0.2);
    float radialFade = 1.0 - smoothstep(0.0, 0.88, dist * 2.0);
    float sparkleTwinkle = 0.6 + 0.4 * sin(uTime * 3.0 + gl_PointCoord.x * 20.0 + gl_PointCoord.y * 14.0);

    // Keep the premium vibrant colors, only slightly modulate
    vec3 mixed = baseColor * (0.85 + 0.25 * slowWave);

    float coreGlow = 1.0 - smoothstep(0.0, 0.22, dist);
    // Give the core a bright white/blue intense glow
    vec3 sparkleColor = mixed + vec3(0.8, 0.9, 1.0) * coreGlow * 0.8;
    
    // Higher transparency for a more ethereal feel
    float finalAlpha = alpha * radialFade * 0.8 * sparkleTwinkle;

    gl_FragColor = vec4(sparkleColor, finalAlpha);
  }
`;


