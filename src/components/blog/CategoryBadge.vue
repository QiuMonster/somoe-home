<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  count: number
  active?: boolean
  index?: number
  wiggle?: boolean
}>(), { active: false, index: 0, wiggle: false })

const palette = [
  { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-500', activeBg: 'bg-rose-500', activeBorder: 'border-rose-500', hover: 'hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-rose-500/25 hover:ring-2 hover:ring-rose-300/50' },
  { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-500', activeBg: 'bg-violet-500', activeBorder: 'border-violet-500', hover: 'hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-violet-500/25 hover:ring-2 hover:ring-violet-300/50' },
  { bg: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-500', activeBg: 'bg-sky-500', activeBorder: 'border-sky-500', hover: 'hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-sky-500/25 hover:ring-2 hover:ring-sky-300/50' },
  { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-500', activeBg: 'bg-amber-500', activeBorder: 'border-amber-500', hover: 'hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:shadow-amber-500/25 hover:ring-2 hover:ring-amber-300/50' },
  { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-500', activeBg: 'bg-emerald-500', activeBorder: 'border-emerald-500', hover: 'hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-emerald-500/25 hover:ring-2 hover:ring-emerald-300/50' },
  { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-500', activeBg: 'bg-cyan-500', activeBorder: 'border-cyan-500', hover: 'hover:bg-cyan-500 hover:text-white hover:border-cyan-500 hover:shadow-cyan-500/25 hover:ring-2 hover:ring-cyan-300/50' },
]

function getColor(index: number) {
  return palette[index % palette.length]
}
</script>

<template>
  <button
    type="button"
    class="group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
    :class="[wiggle ? 'hover:animate-wiggle' : '', active
      ? `${getColor(index).activeBg} ${getColor(index).activeBorder} text-white shadow-lg`
      : `${getColor(index).bg} ${getColor(index).border} ${getColor(index).text} ${getColor(index).hover}`]"
  >
    {{ name }}
    <span class="text-xs" :class="active ? 'opacity-80' : 'opacity-60'">{{ count }}</span>
  </button>
</template>
