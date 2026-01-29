import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Transaction } from '../types/Transaction'

export const useTransactionsStore = defineStore('transactions', () => {
  // 🧠 State
  const transactions = ref<Transaction[]>([])

  // ➕ Actions
  function addTransaction(transaction: Transaction) {
    transactions.value.push(transaction)
    saveToLocalStorage()
  }

  function removeTransaction(id: string) {
    transactions.value = transactions.value.filter(t => t.id !== id)
    saveToLocalStorage()
  }

  // 💾 Persistência
  function saveToLocalStorage() {
    localStorage.setItem(
      'transactions',
      JSON.stringify(transactions.value)
    )
  }

  function loadFromLocalStorage() {
    const data = localStorage.getItem('transactions')
    if (data) {
      transactions.value = JSON.parse(data)
    }
  }

  // 🧮 Getters (já preparando o dashboard)
  const totalIncome = computed(() =>
    transactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0)
  )

  const totalExpense = computed(() =>
    transactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0)
  )

  const balance = computed(() => totalIncome.value - totalExpense.value)

  function getTransactionsByMonth(month: string) {
    return transactions.value.filter(t =>
      t.date.startsWith(month)
    )
  }
  
  function getMonthlyIncome(month: string) {
    return getTransactionsByMonth(month)
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0)
  }

  function getMonthlyExpense(month: string) {
    return getTransactionsByMonth(month)
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0)
  }

  function getMonthlyBalance(month: string) {
    return getMonthlyIncome(month) - getMonthlyExpense(month)
  }

  function getCategoryTotalsByMonth(month: string) {
    const result: Record<string, number> = {}

    getTransactionsByMonth(month).forEach(t => {
      if (!result[t.category]) {
        result[t.category] = 0
      }

      // entrada soma, saída subtrai
      const signedValue = t.type === 'expense'
        ? -t.value
        : t.value

      result[t.category] += signedValue
    })

    return result
  }

  function getCategoryTotalsByMonthAndType(
    month: string,
    type: 'income' | 'expense'
  ) {
    const result: Record<string, number> = {}

    getTransactionsByMonth(month)
      .filter(t => t.type === type)
      .forEach(t => {
        if (!result[t.category]) {
          result[t.category] = 0
        }

        result[t.category] += t.value
      })

    return result
  }


  return {
    // state
    transactions,

    // actions
    addTransaction,
    removeTransaction,
    loadFromLocalStorage,

    // getters
    totalIncome,
    totalExpense,
    balance,

    // seletores parametrizados
    getTransactionsByMonth,
    getMonthlyIncome,
    getMonthlyExpense,
    getMonthlyBalance,
    getCategoryTotalsByMonth,
    getCategoryTotalsByMonthAndType,
  }
})
