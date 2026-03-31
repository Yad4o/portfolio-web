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
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i); 
    vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    float n = snoise(vec3(vUv * 2.0, uTime * 0.2));
    vec3 color = mix(vec3(0.08, 0.09, 0.12), vec3(0.15, 0.17, 0.20), n * 0.5 + 0.5);
    gl_FragColor = vec4(color, 1.0);
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
    
    if (progress <= 1.0) {
      pos = mix(position, aPosition2, progress);
    } else if (progress <= 2.0) {
      pos = mix(aPosition2, aPosition3, progress - 1.0);
    } else if (progress <= 3.0) {
      pos = mix(aPosition3, aPosition4, progress - 2.0);
    } else if (progress <= 4.0) {
      pos = mix(aPosition4, aPosition5, progress - 3.0);
    } else if (progress <= 5.0) {
      pos = mix(aPosition5, aPosition6, progress - 4.0);
    } else {
      pos = aPosition6;
    }

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
    
    // Enhanced professional animations with 4D influence
    float professionalBreathe = sin(uTime * 0.3 + w) * 0.02 * hyperScale;
    float elegantGlide = cos(uTime * 0.5 + w * 0.5) * 0.015 * hyperScale;
    
    // Apply professional motion
    pos.y += professionalBreathe;
    pos.x += elegantGlide;
    pos.z += elegantGlide;

    // 4D burst effects
    float burstPhase = uTime * 2.0 + length(pos) * 0.5;
    vec3 burstOffset = vec3(
      sin(burstPhase) * uBurstIntensity,
      cos(burstPhase * 1.3) * uSecondaryIntensity,
      sin(burstPhase * 0.7) * uTertiaryIntensity
    );
    pos += burstOffset;

    // Larger on-screen points so background sparkles stay visible
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float baseSize = 9.0 * hyperScale;
    gl_PointSize = baseSize * (22.0 / (max(0.1, -mvPosition.z)));
    gl_Position = projectionMatrix * mvPosition;

    // Brighter base tint (still cool / soft)
    float colorIntensity = 0.35 + abs(w) * 0.25;
    vColor = vec3(colorIntensity, colorIntensity * 0.88, colorIntensity * 1.08);
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
    float sparkleTwinkle = 0.82 + 0.18 * sin(uTime * 1.2 + gl_PointCoord.x * 20.0 + gl_PointCoord.y * 14.0);

    vec3 accentColor = vec3(0.18, 0.22, 0.34);
    vec3 mixed = mix(baseColor, accentColor, 0.42 + 0.12 * slowWave);

    float coreGlow = 1.0 - smoothstep(0.0, 0.22, dist);
    vec3 sparkleColor = mixed + vec3(0.12, 0.14, 0.2) * coreGlow * 0.55;
    float finalAlpha = alpha * radialFade * 0.65 * sparkleTwinkle;

    gl_FragColor = vec4(sparkleColor, finalAlpha);
  }
`;

// Holograph Panel Shader
export const hologramVertexShader = /* glsl */`
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    // Wave
    vec3 pos = position;
    pos.z += sin(pos.y * 10.0 + uTime * 5.0) * 0.02;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const hologramFragmentShader = /* glsl */`
  uniform float uTime;
  uniform vec3 uColor;
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    
    // Scanline
    float scanline = sin(vPosition.y * 100.0 - uTime * 10.0) * 0.2 + 0.8;
    
    // Fresnel rim
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);
    
    // Glitch lines
    float glitch = step(0.99, sin(uTime * 20.0 + vPosition.y * 200.0)) * 0.1;
    
    vec3 finalColor = uColor * (tex.rgb + fresnel + glitch);
    float alpha = (tex.a + fresnel) * scanline * 0.7;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export const floatingVertexShader = `void main(){gl_Position=vec4(0,0,0,0);}`;
export const floatingFragmentShader = `void main(){gl_FragColor=vec4(0,0,0,0);}`;
export const particleVertexShader = /* glsl */`
  attribute float aSize;
  attribute float aOffset;
  uniform float uTime;
  uniform float uScroll;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    
    vec3 pos = position;
    
    // Smooth, slow orbital motion
    float t = uTime * 0.25;
    pos.x += sin(t + aOffset) * 0.25;
    pos.y += cos(t * 0.8 + aOffset) * 0.18;
    pos.z += sin(t * 0.6 + aOffset) * 0.15;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (120.0 / (max(0.1, -mvPosition.z)));
    gl_Position = projectionMatrix * mvPosition;
  }
`;
export const particleFragmentShader = /* glsl */`
  uniform vec3 uColor;
  uniform float uTime;
  varying vec2 vUv;
  
  // Shape functions
  float circle(vec2 uv, float radius) {
    return 1.0 - smoothstep(radius, radius + 0.01, length(uv));
  }
  
  float square(vec2 uv, float size) {
    vec2 d = abs(uv) - size;
    return 1.0 - smoothstep(0.0, 0.01, max(d.x, d.y));
  }
  
  float cross(vec2 uv, float size) {
    float beam = 1.0 - smoothstep(size * 0.1, size * 0.1 + 0.01, abs(uv.x));
    beam *= 1.0 - smoothstep(size, size + 0.01, abs(uv.y));
    float beam2 = 1.0 - smoothstep(size * 0.1, size * 0.1 + 0.01, abs(uv.y));
    beam2 *= 1.0 - smoothstep(size, size + 0.01, abs(uv.x));
    return max(beam, beam2);
  }
  
  float ring(vec2 uv, float radius) {
    float r = length(uv);
    return 1.0 - smoothstep(0.02, 0.03, abs(r - radius));
  }
  
  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    
    // Different shapes based on time and position
    float shape_index = mod(floor(uTime * 0.5 + length(uv) * 8.0), 4.0);
    
    float alpha = 0.0;
    if (shape_index < 1.0) {
      alpha = circle(uv, 0.3);
    } else if (shape_index < 2.0) {
      alpha = square(uv, 0.25);
    } else if (shape_index < 3.0) {
      alpha = cross(uv, 0.3);
    } else {
      alpha = ring(uv, 0.25);
    }
    
    if (alpha < 0.01) discard;
    
    vec3 color = uColor + vec3(sin(uTime + uv.x), cos(uTime + uv.y), sin(uTime * 0.5)) * 0.1;
    gl_FragColor = vec4(color, alpha * 0.8);
  }
`;
