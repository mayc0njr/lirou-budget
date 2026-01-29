<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionsStore } from '@/stores/transactions'
import type { Transaction, TransactionType } from '@/types/Transaction'

const router = useRouter()
const store = useTransactionsStore()

const description = ref('')
const date = ref('')
const value = ref<number | null>(null)
const type = ref<TransactionType>('expense')
const category = ref('')

function generateId() {
  return crypto.randomUUID()
}

function submit() {
  if (
    !description.value ||
    !date.value ||
    (value.value === null && value.value > 0)||
    !category.value
  ) {
    alert('Preencha todos os campos')
    return
  }
  const transaction: Transaction = {
    id: generateId(),
    description: description.value,
    date: date.value,
    value: value.value,
    type: type.value,
    category: category.value
  }
  store.addTransaction(transaction)
  console.log({
    description: description.value,
    date: date.value,
    value: value.value,
    type: type.value,
    category: category.value
  })
  router.push('/dashboard')
}
</script>

<template>
  <h2 class="text-2xl font-semibold mb-6">
    Nova Transação
  </h2>

  <form
    class="max-w-md space-y-4 mx-auto"
    @submit.prevent="submit"
  >
    <!-- Descrição -->
    <div>
      <label class="block text-sm font-medium mb-1">
        Descrição
      </label>
      <input
        v-model="description"
        type="text"
        class="w-full rounded border px-3 py-2"
      />
    </div>

    <!-- Data -->
    <div>
      <label class="block text-sm font-medium mb-1">
        Data
      </label>
      <input
        v-model="date"
        type="date"
        class="w-full rounded border px-3 py-2"
      />
    </div>

    <!-- Valor -->
    <div>
      <label class="block text-sm font-medium mb-1">
        Valor
      </label>
      <input
        v-model.number="value"
        type="number"
        step="0.01"
        class="w-full rounded border px-3 py-2"
      />
    </div>

    <!-- Tipo -->
    <div>
      <label class="block text-sm font-medium mb-1">
        Tipo
      </label>
      <select
        v-model="type"
        class="w-full rounded border px-3 py-2"
      >
        <option value="income">Entrada</option>
        <option value="expense">Saída</option>
      </select>
    </div>

    <!-- Categoria -->
    <div>
      <label class="block text-sm font-medium mb-1">
        Categoria
      </label>
      <input
        v-model="category"
        type="text"
        class="w-full rounded border px-3 py-2"
      />
    </div>

    <!-- Botão -->
    <button
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Salvar
    </button>
  </form>
</template>
