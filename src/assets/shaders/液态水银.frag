// 液态水银（扭曲镜面 / 高反射 / 高对比）


precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uMouse;
uniform vec3  u_bg;
uniform float u_fluidAlpha;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float smoothNoise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
    float a = hash(i), b = hash(i+vec2(1,0)), c = hash(i+vec2(0,1)), d = hash(i+vec2(1,1));
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}
float fbm(vec2 p) {
    float v=0.0, a=0.5; mat2 rot = mat2(0.8,-0.6,0.6,0.8);
    for(int i=0;i<4;i++){ v+=a*smoothNoise(p); p=rot*p*2.1+13.7; a*=0.48; }
    return v;
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) { return vec3(1.0); }

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5*uResolution.xy)/min(uResolution.x,uResolution.y);
    float t = uTime*0.06;
    vec2 mouse = (uMouse-0.5)*2.0;
    vec2 mousePos = mouse*0.6;
    float mouseDist = length(uv-mousePos);
    float mouseInfluence = exp(-mouseDist*2.5)*0.5;

    // 扭曲流程（完全保留）
    vec2 p = uv*1.4 + mousePos*0.2;
    float n1 = fbm(vec2(p.x*0.45+t*0.28, p.y*0.40-t*0.22));
    float n2 = fbm(vec2(p.x*0.65-t*0.24, p.y*0.55+t*0.32));
    float n3 = fbm(vec2(p.x*0.95+t*0.32, p.y*0.70-t*0.28));
    float n4 = fbm(vec2(p.x*1.40-t*0.18, p.y*1.10+t*0.20));

    float vortex = fbm(p*0.7+vec2(t*0.08));
    float mouseWarp = mouseInfluence*0.5;
    vec2 offset = vec2(
        (n1-0.5)*0.7+(n2-0.5)*0.3+mouseWarp*(mouse.x*0.5),
        (n2-0.5)*0.7+(n3-0.5)*0.3+mouseWarp*(mouse.y*0.5)
    );
    offset += (vortex-0.5)*0.25;
    vec2 q = p + offset*0.8;
    q.x += sin(q.y*4.5+t*1.8+n1*5.0+mouse.x*0.5)*0.10;
    q.y += cos(q.x*4.0-t*1.6+n2*4.5+mouse.y*0.5)*0.10;

    // 色散偏移
    float baseDisp = 0.028+0.018*(0.5+0.5*sin(t*0.25+q.x*0.6+q.y*0.5));
    float mouseDisp = mouseInfluence*0.025;
    float dispStrength = baseDisp+mouseDisp;
    float angleBase = t*0.18+fbm(q*0.4+t*0.1)*2.5;
    float angleMouse = atan(mouse.y,mouse.x)*0.3;
    float dispAngle = angleBase+angleMouse;
    vec2 offR = dispStrength*vec2(cos(dispAngle), sin(dispAngle)*0.85);
    vec2 offG = dispStrength*vec2(cos(dispAngle+2.094+0.12), sin(dispAngle+2.094+0.12)*0.85);
    vec2 offB = dispStrength*vec2(cos(dispAngle+4.189-0.10), sin(dispAngle+4.189-0.10)*0.85);
    vec2 qR = q+offR, qG = q+offG, qB = q+offB;

    // ---- 液态水银纹理 ----
    // 使用多层噪声制造凹凸反射感
    float bump1 = fbm(q*1.2 + vec2(t*0.15, -t*0.1));
    float bump2 = fbm(q*2.5 + vec2(-t*0.08, t*0.12));
    float bump3 = smoothNoise(q*4.0 + t*0.3);
    float bump = (bump1*0.6 + bump2*0.3 + bump3*0.1);
    // 使凹凸尖锐，产生镜面扭曲效果
    bump = sin(bump * 6.2832 * 3.0) * 0.5 + 0.5; // 增强波纹
    bump = smoothstep(0.1, 0.9, bump);

    // 模拟反射率：亮部极高，暗部极暗
    float reflect = bump * 0.9 + 0.1;
    // 加入高光斑点
    float spec = sin(q.x*30.0 + q.y*25.0 + t*3.0 + n4*8.0) * 0.5 + 0.5;
    spec = smoothstep(0.85, 1.0, spec);
    reflect = mix(reflect, 1.0, spec * 0.6);

    // 扭曲镜面效应：增加波浪扭曲
    vec2 distort = vec2(
        sin(q.y*12.0 + t*1.2 + bump*4.0),
        cos(q.x*10.0 - t*1.0 + bump*3.5)
    ) * 0.08;
    vec2 qRef = q + distort;
    float reflection = fbm(qRef*0.8 + vec2(t*0.05));

    // 混合主凹凸和反射
    float gray = mix(reflect, reflection, 0.3);

    // ---- 高对比度 ----
    gray = pow(gray, 1.5); // Gamma 增强对比
    gray = clamp((gray - 0.3) * 1.5, 0.0, 1.0); // 拉伸动态范围

    // ---- 颜色：银灰带淡蓝 ----
    vec3 color = vec3(0.8, 0.85, 0.95) * gray;
    // 暗部偏黑蓝
    color += vec3(0.0, 0.02, 0.05) * (1.0 - gray);

    // 高光（白色亮点）
    float spec2 = sin(q.x*40.0 + q.y*30.0 + t*2.0) * 0.5 + 0.5;
    spec2 = smoothstep(0.9, 1.0, spec2);
    color += vec3(1.0) * spec2 * 0.3 * (1.0 + mouseInfluence*0.5);

    // 鼠标辉光（淡蓝光晕）
    vec2 glowCenter = mousePos*0.3;
    float centerGlow = exp(-length(uv-glowCenter)*3.0)*0.25;
    color += vec3(0.3, 0.5, 0.8) * centerGlow;

    // 渐晕
    float vignette = 1.0-length(uv*0.85); vignette = smoothstep(0.0,0.65,vignette);
    color *= (0.2+vignette*0.85);

    // 噪点（微弱的金属颗粒）
    color += (hash(gl_FragCoord.xy+uTime*0.06)-0.5)*0.01;
    float scan = sin(gl_FragCoord.y*240.0+uTime*0.4)*0.5+0.5;
    color *= (1.0-scan*scan*0.004);

    // 与背景色混合（u_fluidAlpha 控制流体可见度）
    color = mix(u_bg, color, u_fluidAlpha);

    gl_FragColor = vec4(clamp(color,0.0,1.0),1.0);
}