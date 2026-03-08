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
    vec3 color = mix(vec3(0.03, 0.03, 0.08), vec3(0.0, 0.4, 0.8), n * 0.5 + 0.5);
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Particle Morpher Shader
export const particleMorphVertexShader = /* glsl */`
  attribute vec3 aPosition2; // Box
  attribute vec3 aPosition3; // Torus (O)
  attribute vec3 aPosition4; // Galaxy (M Substitute/Space)
  uniform float uMorphProgress;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec3 vColor;

  void main() {
    vec3 pos;
    if (uMorphProgress <= 1.0) {
      pos = mix(position, aPosition2, uMorphProgress);
    } else if (uMorphProgress <= 2.0) {
      pos = mix(aPosition2, aPosition3, uMorphProgress - 1.0);
    } else {
      pos = mix(aPosition3, aPosition4, uMorphProgress - 2.0);
    }

    // Displacement
    pos.x += sin(pos.y + uTime) * 0.1;
    pos.z += cos(pos.x + uTime) * 0.1;

    // View-aligned points
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 4.0 * (10.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    
    vColor = mix(vec3(0.0, 0.8, 1.0), vec3(0.5, 0.0, 1.0), pos.y * 0.1 + 0.5);
  }
`;

export const particleMorphFragmentShader = /* glsl */`
  varying vec3 vColor;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, 1.0 - d * 2.0);
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
export const particleVertexShader = `void main(){gl_Position=vec4(0,0,0,0);}`;
export const particleFragmentShader = `void main(){gl_FragColor=vec4(0,0,0,0);}`;
