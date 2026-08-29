<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useConfig } from '@/hooks/useConfig'
import baseVert from '@/assets/shaders/base.vert?raw'
import fluidFrag from '@/assets/shaders/fluid-dots.frag?raw'

const props = withDefaults(
  defineProps<{
    fragmentShader?: string
    opaque?: boolean
  }>(),
  {
    fragmentShader: fluidFrag,
    opaque: false,
  },
)

const { theme } = useConfig()
const canvasRef = ref<HTMLCanvasElement | null>(null)

let gl: WebGLRenderingContext | null = null
let program: WebGLProgram | null = null
let animId = 0
let startTime = 0
let uniformCache: Record<string, WebGLUniformLocation | null> = {}

function parseRgb(s: string): [number, number, number] {
  const p = s.split(' ').map(Number)
  return [p[0] / 255, p[1] / 255, p[2] / 255]
}

function getUniform(name: string): WebGLUniformLocation | null {
  if (!(name in uniformCache) && gl && program) {
    uniformCache[name] = gl.getUniformLocation(program, name)
  }
  return uniformCache[name] ?? null
}

function mkShader(g: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = g.createShader(type)
  if (!s) return null
  g.shaderSource(s, src)
  g.compileShader(s)
  if (!g.getShaderParameter(s, g.COMPILE_STATUS)) {
    g.deleteShader(s)
    return null
  }
  return s
}

function init() {
  const c = canvasRef.value
  if (!c) return

  gl = c.getContext('webgl', { alpha: !props.opaque, premultipliedAlpha: false })
  if (!gl) { return }

  const vs = mkShader(gl, gl.VERTEX_SHADER, baseVert)
  const fs = mkShader(gl, gl.FRAGMENT_SHADER, props.fragmentShader)
  if (!vs || !fs) return

  program = gl.createProgram()
  if (!program) return
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    program = null
    return
  }

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(program, 'a_pos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  if (!props.opaque) {
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  }
}

function resize() {
  const c = canvasRef.value
  if (!c) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  c.width = window.innerWidth * dpr
  c.height = window.innerHeight * dpr
  c.style.width = `${window.innerWidth}px`
  c.style.height = `${window.innerHeight}px`
  gl?.viewport(0, 0, c.width, c.height)
}



function frame() {
  if (!gl || !program) return

  const fluid = theme.fluid
  const isDark = document.documentElement.classList.contains('dark')

  if (props.opaque) {
    gl.clearColor(0, 0, 0, 1)
  } else {
    gl.clearColor(0, 0, 0, 0)
  }
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.useProgram(program)

  const t = (performance.now() - startTime) / 1000
  const w = canvasRef.value!.width
  const h = canvasRef.value!.height

  // 通用 uniform：尝试多种命名，兼容不同着色器
  const timeLoc = getUniform('u_time') ?? getUniform('uTime')
  const resLoc = getUniform('u_res') ?? getUniform('uResolution')
  const mouseLoc = getUniform('u_mouse') ?? getUniform('uMouse')

  if (timeLoc) gl.uniform1f(timeLoc, t)
  if (resLoc) gl.uniform2f(resLoc, w, h)
  if (mouseLoc) gl.uniform2f(mouseLoc, 0.5, 0.5)

  // fluid.frag 系列 uniform
  const c1 = parseRgb(fluid.color1)
  const c2 = parseRgb(fluid.color2)
  const c3 = parseRgb(fluid.color3)
  const fluidAlpha = isDark ? fluid.intensityDark : fluid.intensity

  const bgRgb = parseRgb(isDark ? theme.bg.dark : theme.bg.light)

  const bgLoc = getUniform('u_bg')
  const c1Loc = getUniform('u_c1')
  const c2Loc = getUniform('u_c2')
  const c3Loc = getUniform('u_c3')
  const alphaLoc = getUniform('u_fluidAlpha')
  const speedLoc = getUniform('u_speed')

  if (bgLoc) gl.uniform3f(bgLoc, bgRgb[0], bgRgb[1], bgRgb[2])
  if (c1Loc) gl.uniform3f(c1Loc, c1[0], c1[1], c1[2])
  if (c2Loc) gl.uniform3f(c2Loc, c2[0], c2[1], c2[2])
  if (c3Loc) gl.uniform3f(c3Loc, c3[0], c3[1], c3[2])
  if (alphaLoc) gl.uniform1f(alphaLoc, fluidAlpha)
  if (speedLoc) gl.uniform1f(speedLoc, fluid.speed)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  animId = requestAnimationFrame(frame)
}

let onResize: (() => void) | null = null

onMounted(() => {
  startTime = performance.now()
  uniformCache = {}
  init()
  resize()
  onResize = resize
  window.addEventListener('resize', onResize)
  frame()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  if (onResize) window.removeEventListener('resize', onResize)
  if (gl && program) gl.deleteProgram(program)
  gl = null
  program = null
  uniformCache = {}
})
</script>

<template>
  <canvas ref="canvasRef" class="fixed inset-0" style="z-index:0" />
</template>
