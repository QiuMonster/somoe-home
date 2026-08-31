import { ref, computed, watch, type Ref } from 'vue'

export function usePagination<T>(source: Ref<T[]>, pageSize = 12) {
  const current = ref(1)
  const total = computed(() => Math.ceil(source.value.length / pageSize) || 1)

  const displayed = computed(() => {
    const start = (current.value - 1) * pageSize
    return source.value.slice(start, start + pageSize)
  })

  const hasPrev = computed(() => current.value > 1)
  const hasNext = computed(() => current.value < total.value)

  function go(page: number) {
    current.value = Math.max(1, Math.min(page, total.value))
  }

  function prev() { go(current.value - 1) }
  function next() { go(current.value + 1) }
  function first() { go(1) }
  function last() { go(total.value) }

  watch(source, () => {
    if (current.value > total.value) current.value = total.value
  })

  return { displayed, current, total, hasPrev, hasNext, go, prev, next, first, last }
}
