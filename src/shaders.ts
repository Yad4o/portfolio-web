// Vertex Shader for animated noise background
export const noiseVertexShader = /* glsl */`
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader: animated gradient noise (Lusion-style)
export const noiseFragmentShader = /* glsl */`
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Classic 3D noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;

    // Layered noise for organic movement
    float n1 = snoise(vec3(uv * 2.5, t));
    float n2 = snoise(vec3(uv * 5.0 + 1.3, t * 1.2));
    float composite = (n1 * 0.6 + n2 * 0.4) * 0.5 + 0.5;

    // Colors: deep space blues and cyans
    vec3 colorA = vec3(0.02, 0.02, 0.06);   // near black
    vec3 colorB = vec3(0.0,  0.1,  0.22);   // deep navy
    vec3 colorC = vec3(0.0,  0.55, 0.8);    // cyan accent
    vec3 colorD = vec3(0.04, 0.0,  0.12);   // deep purple

    vec3 color = mix(colorA, colorB, composite);
    color = mix(color, colorC, pow(composite, 5.0) * 0.4);
    color = mix(color, colorD, (1.0 - composite) * 0.3);

    // Vignette
    float dist = distance(uv, vec2(0.5));
    float vignette = smoothstep(0.8, 0.2, dist);
    color *= vignette * 0.5 + 0.5;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// Vertex shader for floating geometry
export const floatingVertexShader = /* glsl */`
  uniform float uTime;
  uniform float uIndex;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position;
    // Vertex displacement for organic distortion
    float displace = sin(pos.x * 3.0 + uTime * 0.8 + uIndex) * 0.04
                   + cos(pos.y * 4.0 + uTime * 0.6) * 0.03;
    pos += normal * displace;
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment for glowing floating objects
export const floatingFragmentShader = /* glsl */`
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uIndex;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    // Fresnel rim glow
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);

    // Animated inner color
    float pulse = sin(uTime * 1.5 + uIndex * 0.8) * 0.5 + 0.5;
    vec3 innerColor = uColor * (0.1 + pulse * 0.05);
    vec3 rimColor = uColor * fresnel * 1.5;

    vec3 finalColor = innerColor + rimColor;
    float alpha = fresnel * 0.7 + 0.05;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// Particle vertex shader
export const particleVertexShader = /* glsl */`
  attribute float aSize;
  attribute float aOffset;
  uniform float uTime;
  uniform float uScroll;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    // Drift with time and scroll
    pos.y += mod(uTime * 0.08 + aOffset, 12.0) - 6.0;
    pos.x += sin(uTime * 0.3 + aOffset * 2.0) * 0.15;
    pos.z += cos(uTime * 0.25 + aOffset * 1.5) * 0.1;

    // Fade based on lifecycle position
    float cycle = mod(uTime * 0.08 + aOffset, 12.0);
    vAlpha = smoothstep(0.0, 2.0, cycle) * smoothstep(12.0, 10.0, cycle);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Particle fragment shader
export const particleFragmentShader = /* glsl */`
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    // Circular point
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;
    float alpha = (1.0 - dist * 2.0) * vAlpha * 0.8;
    gl_FragColor = vec4(uColor, alpha);
  }
`;
