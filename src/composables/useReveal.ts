import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/** Triggers once when element enters viewport. No scroll-linking. */
export function useReveal(threshold = 0.15) {
  const el = ref<HTMLElement | null>(null) as Ref<HTMLElement | null>
  const revealed = ref(false)
  let obs: IntersectionObserver | null = null

  onMounted(() => {
    if (!el.value) return
    obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { revealed.value = true; obs?.disconnect() } },
      { threshold }
    )
    obs.observe(el.value)
  })

  onUnmounted(() => obs?.disconnect())
  return { el, revealed }
}
