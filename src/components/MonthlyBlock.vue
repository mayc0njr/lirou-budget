<script setup lang="ts">
import { computed } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'

const props = defineProps<{
  month: string
}>()

const store = useTransactionsStore()

const incomeTotal = computed(() =>
  store.getMonthlyIncome(props.month)
)

const expenseTotal = computed(() =>
  store.getMonthlyExpense(props.month)
)

const incomeByCategory = computed(() =>
  store.getCategoryTotalsByMonthAndType(props.month, 'income')
)

const expenseByCategory = computed(() =>
  store.getCategoryTotalsByMonthAndType(props.month, 'expense')
)
</script>

<template>
  <section class="bg-white p-4 rounded shadow space-y-4" data-testid="monthly-block">
    <h3 class="text-lg font-semibold">
      {{ month }}
    </h3>

    <!-- Entradas -->
    <div>
      <p class="font-medium">Entradas — {{ incomeTotal }}</p>
      <ul data-testid="income-list">
        <li
          v-for="(value, category) in incomeByCategory"
          :key="category"
          class="flex justify-between"
        >
          <span>{{ category }}</span>
          <span>{{ value }}</span>
        </li>
      </ul>
    </div>

    <!-- Saídas -->
    <div>
      <p class="font-medium">Saídas — {{ expenseTotal }}</p>
      <ul data-testid="expense-list">
        <li
          v-for="(value, category) in expenseByCategory"
          :key="category"
          class="flex justify-between"
        >
          <span>{{ category }}</span>
          <span>{{ value }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
