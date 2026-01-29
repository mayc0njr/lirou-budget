import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTransactionsStore } from './transactions'
import type { Transaction } from '@/types/Transaction'

describe('Transactions Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adiciona uma transação', () => {
    const store = useTransactionsStore()

    const transaction: Transaction = {
      id: '1',
      description: 'Salário',
      date: '2026-03-10',
      value: 3000,
      type: 'income',
      category: 'Renda'
    }

    store.addTransaction(transaction)

    expect(store.transactions.length).toBe(1)
    expect(store.totalIncome).toBe(3000)
    expect(store.balance).toBe(3000)
  })

  it('calcula totais por mês', () => {
    const store = useTransactionsStore()

    store.addTransaction({
      id: '1',
      description: 'Aluguel',
      date: '2026-03-05',
      value: 1000,
      type: 'expense',
      category: 'Moradia'
    })

    store.addTransaction({
      id: '2',
      description: 'salario',
      date: '2026-03-05',
      value: 500,
      type: 'income',
      category: 'Moradia'
    })

    store.addTransaction({
      id: '3',
      description: 'Aluguel',
      date: '2026-04-05',
      value: 500,
      type: 'expense',
      category: 'Moradia'
    })

    expect(store.getMonthlyIncome('2026-03')).toBe(500)
    expect(store.getMonthlyExpense('2026-03')).toBe(1000)
    expect(store.getMonthlyBalance('2026-03')).toBe(-500)
    
    expect(store.getMonthlyIncome('2026-04')).toBe(0)
    expect(store.getMonthlyExpense('2026-04')).toBe(500)
    expect(store.getMonthlyBalance('2026-04')).toBe(-500)
  })

  it('agrupa por categoria', () => {
    const store = useTransactionsStore()

    store.addTransaction({
      id: '1',
      description: 'Mercado',
      date: '2026-03-02',
      value: 200,
      type: 'expense',
      category: 'Alimentação'
    })

    store.addTransaction({
      id: '2',
      description: 'Mercado',
      date: '2026-03-15',
      value: 100,
      type: 'expense',
      category: 'Alimentação'
    })

    store.addTransaction({
      id: '3',
      description: 'Aluguel',
      date: '2026-03-15',
      value: 200,
      type: 'expense',
      category: 'Contas'
    })

    const result = store.getCategoryTotalsByMonth('2026-03')

    expect(result['Alimentação']).toBe(-300)
    expect(result['Contas']).toBe(-200)
  })
})
