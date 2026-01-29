<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'

const store = useTransactionsStore()

// gera lista de meses existentes com base nas transações
const allMonths = computed(() => {
  const months = new Set<string>()

  store.transactions.forEach(t => {
    months.add(t.date.slice(0, 7)) // YYYY-MM
  })

  return Array.from(months).sort()
})

const WINDOW_SIZE = 4 //numero de itens visíveis
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

// dados agregados
const incomeTotal = computed(() =>
  selectedMonth.value
    ? store.getMonthlyIncome(selectedMonth.value)
    : 0
)

const expenseTotal = computed(() =>
  selectedMonth.value
    ? store.getMonthlyExpense(selectedMonth.value)
    : 0
)

const incomeByCategory = computed(() =>
  selectedMonth.value
    ? store.getCategoryTotalsByMonthAndType(selectedMonth.value, 'income')
    : {}
)

const expenseByCategory = computed(() =>
  selectedMonth.value
    ? store.getCategoryTotalsByMonthAndType(selectedMonth.value, 'expense')
    : {}
)
</script>

<template>
  <h2 class="text-2xl font-semibold mb-6">
    Resumo Mensal
  </h2>

  <!-- 🔹 FILTRO -->
  <div class="flex gap-4 mb-8">
    <div>
      <label class="block text-sm font-medium mb-1">Ano</label>
      <input
        id="year-input"
        type="number"
        v-model="selectedYear"
        class="border rounded px-3 py-2 w-28"
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Mês</label>
      <select
        id="month-select"
        v-model="selectedMonthNumber"
        class="border rounded px-3 py-2 w-36"
      >
        <option value="">Selecione</option>
        <option v-for="m in 12" :key="m" :value="m">
          {{ String(m).padStart(2, '0') }}
        </option>
      </select>
    </div>
  </div>

  <!-- 🔹 BLOCO MENSAL -->
  <div v-if="selectedMonth" class="space-y-6">
    <!-- Entradas -->
    <section class="bg-white p-4 rounded shadow">
      <h3 class="font-semibold mb-2">Entradas</h3>
      <p class="mb-2">Total: {{ incomeTotal }}</p>

      <ul>
        <li
          v-for="(value, category) in incomeByCategory"
          :key="category"
          class="flex justify-between"
          data-testid="income-category-row"
        >
          <span>{{ category }}</span>
          <span>{{ value }}</span>
        </li>
      </ul>
    </section>

    <!-- Saídas -->
    <section class="bg-white p-4 rounded shadow">
      <h3 class="font-semibold mb-2">Saídas</h3>
      <p class="mb-2">Total: {{ expenseTotal }}</p>

      <ul>
        <li
          v-for="(value, category) in expenseByCategory"
          :key="category"
          class="flex justify-between"
          data-testid="expense-category-row"
        >
          <span>{{ category }}</span>
          <span>{{ value }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
