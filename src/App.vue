<script setup lang="ts">
import { computed } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import FluidCanvas from '@/components/base/FluidCanvas.vue'
import { useConfig } from '@/hooks/useConfig'
import customFrag from '@/assets/shaders/fluid-dots.frag?raw'

const { theme } = useConfig()

const dotStyle = computed(() => {
  const d = theme.dots
  return {
    '--dot-size': `${d.size}px`,
    '--dot-radius': `${d.radius}px`,
    '--dot-opacity': d.opacity,
    '--dot-opacity-dark': d.opacityDark,
  }
})
</script>

<template>
  <div class="relative min-h-screen">
    <!-- GLSL 流体背景层（底层） -->
    <FluidCanvas
      v-if="theme.fluid.enabled"
      :fragment-shader="customFrag"
      :opaque="false"
    />
    <!-- 波点层（不透明背景+波点，在 canvas 之上） -->
    <div v-if="theme.dots.enabled" class="bg-dots" :style="dotStyle" />

    <div class="relative" style="z-index:2">
      <Navbar />
      <main class="min-h-screen">
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>
