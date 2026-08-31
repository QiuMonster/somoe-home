import { ref, onUnmounted, watch, type Ref } from 'vue'

export function useInfiniteScroll<T>(source: Ref<T[]>, pageSize = 9) {
  const displayed = ref<T[]>([]) as Ref<T[]>
  const page = ref(1)
  const hasMore = ref(true)
  const sentinel = ref<Element | null>(null)

  let observer: IntersectionObserver | null = null

  function loadMore() {
    if (!hasMore.value) return
    const end = page.value * pageSize
    displayed.value = source.value.slice(0, end)
    hasMore.value = end < source.value.length
  }

  function reset() {
    page.value = 1
    loadMore()
  }

  function ensureObserver() {
    if (observer) return
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore.value) {
          page.value++
          loadMore()
        }
      },
      { rootMargin: '200px' },
    )
  }

  watch(source, () => reset(), { immediate: true })

  watch(sentinel, (el, oldEl) => {
    if (oldEl && observer) observer.unobserve(oldEl)
    if (!el) return
    ensureObserver()
    observer!.observe(el)
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { displayed, hasMore, sentinel, loadMore, reset }
}
