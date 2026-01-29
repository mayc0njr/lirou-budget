<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import MonthlyBlock from '@/components/MonthlyBlock.vue'

const store = useTransactionsStore()

// gera lista de meses existentes com base nas transações
const allMonths = computed(() => {
  const months = new Set<string>()

  store.transactions.forEach(t => {
    months.add(t.date.slice(0, 7)) // YYYY-MM
  })

  return Array.from(months).sort()
})

const WINDOW_SIZE = 3 //numero de itens visíveis
const windowStart = ref(0)

const visibleMonths = computed(() =>
  allMonths.value.slice(
    windowStart.value,
    windowStart.value + WINDOW_SIZE
  )
)

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
</script>

<template>
  <h2 class="text-2xl font-semibold mb-6">
    Resumo Mensal
  </h2>

  <!-- 🔹 FILTRO -->
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

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <MonthlyBlock
    v-for="month in visibleMonths"
    :key="month"
    :month="month"
  />
</div>
</template>
