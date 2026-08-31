<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useBlog } from '@/hooks/useBlog'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

const props = defineProps<{ content: string }>()
const { renderMarkdownAsync } = useBlog()
const rendered = ref('')
const contentEl = ref<HTMLElement | null>(null)

function applyFancybox() {
  if (!contentEl.value) return
  const images = contentEl.value.querySelectorAll('img')
  images.forEach((img) => {
    const src = img.getAttribute('src')
    if (!src) return
    const wrapper = document.createElement('div')
    wrapper.className = 'img-loading-wrapper'
    const shimmer = document.createElement('div')
    shimmer.className = 'img-shimmer'
    const a = document.createElement('a')
    a.setAttribute('href', src)
    a.setAttribute('data-fancybox', 'blog-gallery')
    const alt = img.getAttribute('alt')
    if (alt) a.setAttribute('data-caption', alt)
    img.parentNode?.replaceChild(wrapper, img)
    wrapper.appendChild(shimmer)
    a.appendChild(img)
    wrapper.appendChild(a)
    if (img.complete) {
      wrapper.dataset.loaded = 'true'
    } else {
      img.addEventListener('load', () => { wrapper.dataset.loaded = 'true' })
      img.addEventListener('error', () => { wrapper.dataset.loaded = 'true' })
    }
  })
  Fancybox.bind(contentEl.value, '[data-fancybox="blog-gallery"]', {
    hideScrollbar: false,
    modal: false,
  })
}

function applyCopyButtons() {
  if (!contentEl.value) return
  contentEl.value.querySelectorAll('.code-copy-btn').forEach((btn) => {
    if ((btn as HTMLElement).dataset.bound) return
    ;(btn as HTMLElement).dataset.bound = 'true'
    btn.addEventListener('click', () => {
      const pre = btn.closest('pre')
      const code = pre?.querySelector('code')
      const text = code?.textContent || ''
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied')
        const textEl = btn.querySelector('.copy-text')
        if (textEl) textEl.textContent = '已复制'
        setTimeout(() => {
          btn.classList.remove('copied')
          if (textEl) textEl.textContent = '复制'
        }, 2000)
      })
    })
  })
}

function destroyFancybox() {
  Fancybox.destroy()
}

async function render() {
  rendered.value = await renderMarkdownAsync(props.content)
  destroyFancybox()
  await nextTick()
  applyFancybox()
  applyCopyButtons()
}

watch(() => props.content, () => render())

onMounted(() => render())

onUnmounted(() => {
  destroyFancybox()
})
</script>

<template>
  <article ref="contentEl" class="blog-content prose prose-slate dark:prose-invert max-w-none min-h-[70vh]" v-html="rendered" />
</template>

<style scoped>
.blog-content :deep(h1) {
  @apply text-2xl font-extrabold text-ink mt-8 mb-4;
}
.blog-content :deep(h2) {
  @apply text-xl font-bold text-ink mt-8 mb-3 pb-2 border-b border-line;
}
.blog-content :deep(h3) {
  @apply text-lg font-bold text-ink mt-6 mb-2;
}
.blog-content :deep(h4) {
  @apply text-base font-bold text-ink mt-4 mb-2;
}
.blog-content :deep(p) {
  @apply text-base leading-relaxed text-ink my-3;
}
.blog-content :deep(ul),
.blog-content :deep(ol) {
  @apply my-3 pl-6;
}
.blog-content :deep(ul) {
  @apply list-disc;
}
.blog-content :deep(ol) {
  @apply list-decimal;
}
.blog-content :deep(li) {
  @apply text-base leading-relaxed text-ink my-1;
}
.blog-content :deep(li)::marker {
  @apply font-bold text-primary;
}
.blog-content :deep(code) {
  @apply rounded bg-sky-500/10 px-1.5 py-0.5 text-sm font-mono font-semibold text-sky-500;
}
.blog-content :deep(pre.code-block-wrapper) {
  @apply rounded-xl my-4 p-0;
  background-color: rgb(var(--color-bg-soft));
  overflow: visible;
}
.blog-content :deep(pre.code-block-wrapper .code-header) {
  @apply flex items-center justify-between px-4 py-2 border-b border-line bg-bg-soft/60 rounded-t-xl;
}
.blog-content :deep(pre.code-block-wrapper .code-lang) {
  @apply text-xs font-bold text-ink-muted uppercase tracking-wider;
}
.blog-content :deep(pre.code-block-wrapper .code-copy-btn) {
  @apply flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-ink-faint transition-colors hover:text-primary hover:bg-primary/10 cursor-pointer;
}
.blog-content :deep(pre.code-block-wrapper .code-copy-btn.copied) {
  @apply text-emerald-500;
}
.blog-content :deep(pre.code-block-wrapper .code-body) {
  @apply p-4 overflow-x-auto rounded-b-xl;
  background-color: rgb(var(--color-surface) / 0.5);
}
.blog-content :deep(pre.code-block-wrapper .code-body pre) {
  @apply m-0 p-0 bg-transparent;
}
.blog-content :deep(pre.code-block-wrapper .code-body code) {
  @apply bg-transparent p-0 text-sm font-mono;
}
.blog-content :deep(pre:not(.code-block-wrapper)) {
  @apply bg-surface p-4 my-4 overflow-x-auto;
}
.blog-content :deep(pre:not(.code-block-wrapper) code) {
  @apply bg-transparent p-0 font-normal text-ink-muted text-sm;
}
.blog-content :deep(blockquote) {
  @apply border-l-4 border-primary/40 pl-4 my-4 text-ink;
}
.blog-content :deep(blockquote p) {
  @apply font-medium;
}
.blog-content :deep(a) {
  @apply text-primary font-semibold underline decoration-primary/30 transition-colors hover:decoration-primary;
}
.blog-content :deep(strong) {
  @apply font-extrabold text-ink;
}
.blog-content :deep(em) {
  @apply font-medium not-italic text-primary/80;
}
.blog-content :deep(hr) {
  @apply border-line my-6;
}
.blog-content :deep(table) {
  @apply w-full my-4;
}
.blog-content :deep(th),
.blog-content :deep(td) {
  @apply border border-line px-3 py-2 text-sm;
}
.blog-content :deep(th) {
  @apply bg-surface font-bold text-ink;
}

.blog-content :deep(.img-loading-wrapper) {
  position: relative;
  margin: 1rem 0;
  min-height: 200px;
  border-radius: 0.5rem;
  overflow: hidden;
  background: rgb(var(--color-bg-soft));
}
.blog-content :deep(.img-loading-wrapper[data-loaded="true"]) {
  min-height: 0;
  background: transparent;
}
.blog-content :deep(.img-loading-wrapper .img-shimmer) {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgb(var(--color-bg-soft)) 0%,
    rgb(var(--color-surface)) 50%,
    rgb(var(--color-bg-soft)) 100%
  );
  background-size: 200% 100%;
  animation: img-shimmer 1.5s ease-in-out infinite;
  transition: opacity 0.3s ease;
}
.blog-content :deep(.img-loading-wrapper[data-loaded="true"] .img-shimmer) {
  opacity: 0;
  pointer-events: none;
}
.blog-content :deep(.img-loading-wrapper img) {
  @apply my-0 max-w-full h-auto cursor-zoom-in transition-opacity transition-shadow;
  opacity: 0;
  position: relative;
  z-index: 2;
}
.blog-content :deep(.img-loading-wrapper[data-loaded="true"] img) {
  opacity: 1;
}
.blog-content :deep(.img-loading-wrapper a[data-fancybox]) {
  @apply block no-underline;
}

@keyframes img-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.blog-content :deep(a[data-fancybox]) {
  @apply block no-underline;
}
.blog-content :deep(img) {
  @apply my-4 max-w-full h-auto cursor-zoom-in transition-shadow hover:shadow-lg;
}
</style>
