precision mediump float;
uniform float u_time;
uniform vec2 u_res;
uniform vec3 u_bg;
uniform vec3 u_dotColor;
uniform float u_dotAlpha;
uniform float u_dotSize;
uniform float u_dotRadius;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform float u_fluidAlpha;
uniform float u_speed;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.877, 0.479, -0.479, 0.877);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;

  // 背景
  vec3 col = u_bg;

  // 波点
  vec2 cell = mod(gl_FragCoord.xy, u_dotSize);
  float halfSize = u_dotSize * 0.5;
  float dist = length(cell - halfSize);
  float dotMask = 1.0 - smoothstep(u_dotRadius - 0.1, u_dotRadius + 0.1, dist);
  col = mix(col, u_dotColor, dotMask * u_dotAlpha);

  // 流体
  float t = u_time * u_speed;
  float n1 = fbm(uv * 2.5 + vec2(t * 0.4, t * 0.2));
  float n2 = fbm(uv * 3.0 + vec2(-t * 0.3 + 5.0, t * 0.15 + 3.0));
  float warp = fbm(uv * 2.0 + vec2(n1 * 0.4, n2 * 0.4) + t * 0.1);

  vec3 fluidCol = mix(u_c1, u_c2, smoothstep(0.3, 0.7, n1));
  fluidCol = mix(fluidCol, u_c3, smoothstep(0.35, 0.65, n2));

  float fa = smoothstep(0.25, 0.75, warp) * u_fluidAlpha;
  fa *= smoothstep(1.1, 0.3, length(uv - 0.5) * 1.4);

  col = mix(col, fluidCol, fa);

  gl_FragColor = vec4(col, 1.0);
}
