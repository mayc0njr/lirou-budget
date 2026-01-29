import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useTransactionsStore } from '@/stores/transactions'
import type { Transaction } from '@/types/Transaction'

describe('Transactions Store – Edge Cases', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('retorna zero para mês sem transações', () => {
    const store = useTransactionsStore()

    expect(store.getMonthlyIncome('2026-01')).toBe(0)
    expect(store.getMonthlyExpense('2026-01')).toBe(0)
    expect(store.getMonthlyBalance('2026-01')).toBe(0)
  })

  it('ignora transações fora do mês consultado', () => {
    const store = useTransactionsStore()

    store.addTransaction({
      id: '1',
      description: 'Fevereiro',
      date: '2026-02-10',
      value: 100,
      type: 'expense',
      category: 'Teste'
    })

    expect(store.getMonthlyExpense('2026-03')).toBe(0)
  })

  it('agrupa corretamente uma única categoria', () => {
    const store = useTransactionsStore()

    store.addTransaction({
      id: '1',
      description: 'Mercado',
      date: '2026-03-05',
      value: 200,
      type: 'expense',
      category: 'Alimentação'
    })

    const result = store.getCategoryTotalsByMonthAndType('2026-03', 'expense')

    expect(result).toEqual({
      Alimentação: 200
    })
  })

  it('separa corretamente entrada e saída da mesma categoria', () => {
    const store = useTransactionsStore()

    store.addTransaction({
      id: '1',
      description: 'Salário',
      date: '2026-03-01',
      value: 3000,
      type: 'income',
      category: 'Renda'
    })

    store.addTransaction({
      id: '2',
      description: 'Imposto',
      date: '2026-03-15',
      value: 500,
      type: 'expense',
      category: 'Renda'
    })

    const income = store.getCategoryTotalsByMonthAndType('2026-03', 'income')
    const expense = store.getCategoryTotalsByMonthAndType('2026-03', 'expense')

    expect(income['Renda']).toBe(3000)
    expect(expense['Renda']).toBe(500)
  })

  it('não inclui categorias sem transações', () => {
    const store = useTransactionsStore()

    const result = store.getCategoryTotalsByMonthAndType('2026-03', 'income')

    expect(Object.keys(result).length).toBe(0)
  })

  it('lida corretamente com valor zero', () => {
    const store = useTransactionsStore()

    store.addTransaction({
      id: '1',
      description: 'Ajuste',
      date: '2026-03-20',
      value: 0,
      type: 'expense',
      category: 'Ajustes'
    })

    const expense = store.getMonthlyExpense('2026-03')
    const categories = store.getCategoryTotalsByMonthAndType('2026-03', 'expense')

    expect(expense).toBe(0)
    expect(categories['Ajustes']).toBe(0)
  })

  it('ordem de inserção não afeta os totais', () => {
    const store = useTransactionsStore()

    const transactions: Transaction[] = [
      {
        id: '1',
        description: 'B',
        date: '2026-03-10',
        value: 100,
        type: 'expense',
        category: 'Teste'
      },
      {
        id: '2',
        description: 'A',
        date: '2026-03-01',
        value: 50,
        type: 'expense',
        category: 'Teste'
      }
    ]

    transactions.forEach(t => store.addTransaction(t))

    expect(store.getMonthlyExpense('2026-03')).toBe(150)
  })

  it('suporta múltiplas transações no mesmo dia', () => {
    const store = useTransactionsStore()

    store.addTransaction({
      id: '1',
      description: 'Manhã',
      date: '2026-03-05',
      value: 30,
      type: 'expense',
      category: 'Café'
    })

    store.addTransaction({
      id: '2',
      description: 'Tarde',
      date: '2026-03-05',
      value: 20,
      type: 'expense',
      category: 'Café'
    })

    expect(store.getMonthlyExpense('2026-03')).toBe(50)
  })
})
