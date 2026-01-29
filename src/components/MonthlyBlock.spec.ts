import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import MonthlyBlock from '@/components/MonthlyBlock.vue'
import { useTransactionsStore } from '@/stores/transactions'

function setupTest(pinia = createPinia()) {
  const store = useTransactionsStore(pinia)

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
    description: 'Mercado',
    date: '2026-03-10',
    value: 500,
    type: 'expense',
    category: 'Alimentação'
  })

  store.addTransaction({
    id: '3',
    description: 'Aluguel',
    date: '2026-03-05',
    value: 1000,
    type: 'expense',
    category: 'Moradia'
  })

  const wrapper = mount(MonthlyBlock, {
    props: {
      month: '2026-03'
    },
    global: {
      plugins: [pinia]
    }
  })

  return { wrapper }
}

describe('MonthlyBlock.vue', () => {
  it('renderiza o mês corretamente', () => {
    const { wrapper } = setupTest()

    const block = wrapper.find('[data-testid="monthly-block"]')
    expect(block.exists()).toBe(true)
    expect(block.text()).toContain('2026-03')
  })

  it('exibe total correto de entradas', () => {
    const { wrapper } = setupTest()

    expect(wrapper.text()).toContain('Entradas')
    expect(wrapper.text()).toContain('3000')
  })

  it('exibe total correto de saídas', () => {
    const { wrapper } = setupTest()

    expect(wrapper.text()).toContain('Saídas')
    expect(wrapper.text()).toContain('1500') // 500 + 1000
  })

  it('lista categorias de entrada corretamente', () => {
    const { wrapper } = setupTest()

    const incomeList = wrapper.find('[data-testid="income-list"]')
    expect(incomeList.exists()).toBe(true)
    expect(incomeList.text()).toContain('Renda')
    expect(incomeList.text()).toContain('3000')
  })

  it('lista categorias de saída corretamente', () => {
    const { wrapper } = setupTest()

    const expenseList = wrapper.find('[data-testid="expense-list"]')
    expect(expenseList.exists()).toBe(true)

    const text = expenseList.text()
    expect(text).toContain('Alimentação')
    expect(text).toContain('500')
    expect(text).toContain('Moradia')
    expect(text).toContain('1000')
  })

  it('não renderiza categorias de outros meses', () => {
    const pinia = createPinia()
    const store = useTransactionsStore(pinia)

    store.addTransaction({
      id: '1',
      description: 'Fevereiro',
      date: '2026-02-01',
      value: 999,
      type: 'expense',
      category: 'Erro'
    })

    const wrapper = mount(MonthlyBlock, {
      props: { month: '2026-03' },
      global: { plugins: [pinia] }
    })

    expect(wrapper.text()).not.toContain('Erro')
  })
})
