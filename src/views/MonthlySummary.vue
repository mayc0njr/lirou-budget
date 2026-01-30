<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import MonthlyBlock from '@/components/MonthlyBlock.vue'

/**
 * Store
 */
const store = useTransactionsStore()

/**
 * Geração da linha do tempo de meses (YYYY-MM)
 */
const allMonths = computed(() => {
  const months = new Set<string>()

  store.transactions.forEach(t => {
    months.add(t.date.slice(0, 7))
  })

  return Array.from(months).sort()
})

/**
 * Janela de renderização
 */
const WINDOW_SIZE = 3
const windowStart = ref(0)

const visibleMonths = computed(() =>
  allMonths.value.slice(
    windowStart.value,
    windowStart.value + WINDOW_SIZE
  )
)

/**
 * Navegação lógica
 */
function canGoPrev() {
  return windowStart.value > 0
}

function canGoNext() {
  return windowStart.value + WINDOW_SIZE < allMonths.value.length
}

function goPrev() {
  if (canGoPrev()) {
    windowStart.value--
  }
}

function goNext() {
  if (canGoNext()) {
    windowStart.value++
  }
}

/**
 * Scroll horizontal real (wheel + drag)
 */
const scrollContainer = ref<HTMLElement | null>(null)

// wheel / trackpad
function onWheel(event: WheelEvent) {
  const delta = event.deltaX !== 0 ? event.deltaX : event.deltaY

  if (delta > 0) {
    goNext()
  } else if (delta < 0) {
    goPrev()
  }
}

// drag
const isDragging = ref(false)
let startX = 0
let touchStartX = 0
let touchEndX = 0

function onMouseDown(e: MouseEvent) {
  isDragging.value = true
  startX = e.clientX
}

function onMouseUp() {
  isDragging.value = false
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return

  const diff = e.clientX - startX
  console.log("startX - ", startX);
  console.log("e.clientX - ", e.clientX);
  console.log("diff - ", diff);
  if (diff > 80) {
    goPrev()
    isDragging.value = false
  } else if (diff < -80) {
    goNext()
    isDragging.value = false
  }
}

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0]!.clientX
}

function onTouchMove(e: TouchEvent) {
  touchEndX = e.touches[0]!.clientX
}

function onTouchEnd() {
  const diff = touchEndX - touchStartX

  if (diff > 60) {
    goPrev()
  } else if (diff < -60) {
    goNext()
  }

  touchStartX = 0
  touchEndX = 0
}

/**
 * Lifecycle
 */
onMounted(() => {
  const el = scrollContainer.value
  if (!el) return

  el.addEventListener('wheel', onWheel, { passive: true })
  el.addEventListener('mousedown', onMouseDown)
  el.addEventListener('touchstart', onTouchStart, { passive: true })
  el.addEventListener('touchmove', onTouchMove, { passive: true })
  el.addEventListener('touchend', onTouchEnd)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  const el = scrollContainer.value
  if (!el) return

  el.removeEventListener('wheel', onWheel)
  el.removeEventListener('mousedown', onMouseDown)
  el.removeEventListener('touchstart', onTouchStart)
  el.removeEventListener('touchmove', onTouchMove)
  el.removeEventListener('touchend', onTouchEnd)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <section>
    <h2 class="text-2xl font-semibold mb-6">
      Resumo Mensal
    </h2>

    <!-- Navegação (fallback visual + acessibilidade) -->
    <div class="flex items-center justify-between mb-6">
      <button
        @click="goPrev"
        :disabled="!canGoPrev()"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        ◀
      </button>

      <button
        @click="goNext"
        :disabled="!canGoNext()"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        ▶
      </button>
    </div>

    <!-- Container com scroll horizontal real -->
    <div
      ref="scrollContainer"
      data-testid="months-container"
      class="overflow-hidden cursor-grab active:cursor-grabbing select-none"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MonthlyBlock
          v-for="month in visibleMonths"
          :key="month"
          :month="month"
        />
      </div>
    </div>

    <!-- Estado vazio -->
    <p
      v-if="allMonths.length === 0"
      class="text-gray-500 mt-6"
    >
      Nenhum dado disponível.
    </p>
  </section>
</template>
