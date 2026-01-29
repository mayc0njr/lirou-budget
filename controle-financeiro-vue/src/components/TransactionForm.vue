<script setup lang="ts">
import { ref } from 'vue'
import type { Transaction, TransactionType } from '@/types/Transaction'

const emit = defineEmits<{
  (e: 'submit', transaction: Transaction): void
}>()

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
    value.value === null ||
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

  emit('submit', transaction)

  // opcional: resetar formulário
  description.value = ''
  date.value = ''
  value.value = null
  type.value = 'expense'
  category.value = ''
}
</script>

<template>
  <form
    class="max-w-md space-y-4 bg-white p-4 rounded shadow"
    @submit.prevent="submit"
  >
    <h3 class="text-lg font-semibold">
      Nova Transação
    </h3>

    <div>
      <label class="block text-sm font-medium mb-1">Descrição</label>
      <input
        v-model="description"
        type="text"
        class="w-full rounded border px-3 py-2"
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Data</label>
      <input
        v-model="date"
        type="date"
        class="w-full rounded border px-3 py-2"
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Valor</label>
      <input
        v-model.number="value"
        type="number"
        step="0.01"
        class="w-full rounded border px-3 py-2"
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Tipo</label>
      <select
        v-model="type"
        class="w-full rounded border px-3 py-2"
      >
        <option value="income">Entrada</option>
        <option value="expense">Saída</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Categoria</label>
      <input
        v-model="category"
        type="text"
        class="w-full rounded border px-3 py-2"
      />
    </div>

    <button
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Salvar
    </button>
  </form>
</template>
