<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import TransactionForm from '@/components/TransactionForm.vue'
import type { Transaction } from '@/types/Transaction'
import { transactionsToCSV, downloadCSV } from '@/utils/csv'

const store = useTransactionsStore()

// estado LOCAL do filtro (não vai para a store)
const selectedMonth = computed<string>(() => {
  if (!selectedYear.value || !selectedMonthNumber.value) {
    return ''
  }

  const month = String(selectedMonthNumber.value).padStart(2, '0')
  return `${selectedYear.value}-${month}`
})
const selectedYear = ref<number | ''>('')
const selectedMonthNumber = ref<number | ''>('') // 1 a 12
// dados derivados do mês selecionado
const monthlyIncome = computed(() =>
  selectedMonth.value
    ? store.getMonthlyIncome(selectedMonth.value)
    : 0
)

const monthlyExpense = computed(() =>
  selectedMonth.value
    ? store.getMonthlyExpense(selectedMonth.value)
    : 0
)

const monthlyBalance = computed(() =>
  selectedMonth.value
    ? store.getMonthlyBalance(selectedMonth.value)
    : 0
)

const monthlyTransactions = computed(() =>
  selectedMonth.value
  ? store.getTransactionsByMonth(selectedMonth.value)
  : []
)

const categoryTotals = computed(() =>
  selectedMonth.value
    ? store.getCategoryTotalsByMonth(selectedMonth.value)
    : {}
)

const exportableTransactions = computed(() =>
  selectedMonth.value
    ? store.getTransactionsByMonth(selectedMonth.value)
    : store.transactions
)

function handleSubmit(transaction: Transaction) {
  store.addTransaction(transaction)
}

function exportCSV() {

  const suffix = selectedMonth.value
    ? `-${selectedMonth.value}`
    : ''

  downloadCSV(exportableTransactions.value, `transacoes${suffix}.csv`)
}

</script>

<template>

  <section>
    <div class="place-items-center grid">
      <TransactionForm
        data-testid="transaction-form"
        @submit="handleSubmit"
      />
    </div>
  </section>

  <hr class="my-8" />

  <h2 class="text-2xl font-semibold mb-6">
    Dashboard
  </h2>

  <!-- 🔹 RESUMO GLOBAL -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
    <div class="bg-green-50 p-4 rounded shadow" data-testid="summary-income">
      <p class="text-sm text-gray-500">Entradas (Total)</p>
      <p class="text-xl font-semibold text-green-600">
        {{ store.totalIncome }}
      </p>
    </div>

    <div class="bg-red-50 p-4 rounded shadow" data-testid="summary-expense">
      <p class="text-sm text-gray-500">Saídas (Total)</p>
      <p class="text-xl font-semibold text-red-600">
        {{ store.totalExpense }}
      </p>
    </div>

    <div class="bg-grey-50 p-4 rounded shadow"a data-testid="summary-balance">
      <p class="text-sm text-gray-500">Saldo (Total)</p>
      <p
        class="text-xl font-semibold"
        :class="store.balance < 0 ? 'text-red-600' : 'text-green-600'"
      >
        {{ store.balance }}
      </p>
    </div>
  </div>

  <!-- 🔹 FILTRO DE MÊS (ANO + MÊS) -->
  <div class="flex gap-4 mb-6">
    <!-- Ano -->
    <div>
      <label class="block text-sm font-medium mb-1">
        Ano
      </label>
      <input
        type="number"
        min="2000"
        max="2100"
        v-model="selectedYear"
        class="rounded border px-3 py-2 w-28"
        id="inputYear"
        data-testid="filter-year"
      />
    </div>

    <!-- Mês -->
    <div>
      <label class="block text-sm font-medium mb-1">
        Mês
      </label>
      <select
        v-model="selectedMonthNumber"
        class="rounded border px-3 py-2 w-36"
        id="inputMonth"
        data-testid="filter-month"
      >
        <option value="">Selecione</option>
        <option
          v-for="m in 12"
          :key="m"
          :value="m"
        >
          {{ m.toString().padStart(2, '0') }}
        </option>
      </select>
    </div>
    <button
      data-testid="export-csv"
      class="px-4 py-2 border rounded bg-gray-600 hover:bg-gray-700 text-white"
      @click="exportCSV"
    >
      Exportar CSV
    </button>
  </div>

  <!-- 🔹 RESUMO MENSAL -->
  <div
    v-if="selectedMonth"
    class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
  >
    <div class="bg-green-50 p-4 rounded shadow" data-testid="monthly-income">
      <p class="text-sm text-gray-500">Entradas do mês</p>
      <p class="text-xl font-semibold text-green-600">
        {{ monthlyIncome }}
      </p>
    </div>

    <div class="bg-red-50 p-4 rounded shadow" data-testid="monthly-expense">
      <p class="text-sm text-gray-500">Saídas do mês</p>
      <p class="text-xl font-semibold text-red-600">
        {{ monthlyExpense }}
      </p>
    </div>

    <div class="bg-gray-50 p-4 rounded shadow" data-testid="monthly-balance">
      <p class="text-sm text-gray-500">Saldo do mês</p>
      <p
        class="text-xl font-semibold"
        :class="monthlyBalance < 0 ? 'text-red-600' : 'text-green-600'"
      >
        {{ monthlyBalance }}
      </p>
    </div>
  </div>

  <!-- 🔹 LISTA DE TRANSAÇÕES DO MÊS -->
  <div
    v-if="selectedMonth"
    class="bg-white rounded shadow overflow-x-auto"
  >
    <table class="min-w-full text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">Data</th>
          <th class="px-4 py-2 text-left">Descrição</th>
          <th class="px-4 py-2 text-left">Categoria</th>
          <th class="px-4 py-2 text-right">Valor</th>
          <th class="px-4 py-2 text-center">Tipo</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="t in monthlyTransactions"
          :key="t.id"
          class="border-t"
          data-testid="transaction-row"
        >
          <td class="px-4 py-2">
            {{ t.date }}
          </td>

          <td class="px-4 py-2">
            {{ t.description }}
          </td>

          <td class="px-4 py-2">
            {{ t.category }}
          </td>

          <td
            class="px-4 py-2 text-right font-medium"
            :class="t.type === 'expense' ? 'text-red-600' : 'text-green-600'"
          >
            {{ t.value }}
          </td>

          <td class="px-4 py-2 text-center">
            {{ t.type === 'expense' ? 'Saída' : 'Entrada' }}
          </td>
        </tr>

        <tr v-if="monthlyTransactions.length === 0">
          <td
            colspan="5"
            class="px-4 py-6 text-center text-gray-500"
          >
            Nenhuma transação neste mês
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 🔹 AGRUPAMENTO POR CATEGORIA -->
  <div
    v-if="selectedMonth && Object.keys(categoryTotals).length"
    class="bg-white rounded shadow p-4 mb-8"
  >
    <h3 class="text-lg font-semibold mb-4">
      Totais por categoria
    </h3>

    <table class="min-w-full text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">Categoria</th>
          <th class="px-4 py-2 text-right">Total</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(total, category) in categoryTotals"
          :key="category"
          class="border-t"
        >
          <td class="px-4 py-2">
            {{ category }}
          </td>

          <td
            class="px-4 py-2 text-right font-medium"
            :class="total < 0 ? 'text-red-600' : 'text-green-600'"
          >
            {{ total }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>
