import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Dashboard from '@/views/Dashboard.vue'
import TransactionForm from '@/components/TransactionForm.vue'
import type { Transaction } from '@/types/Transaction'
import { useTransactionsStore } from '@/stores/transactions'

describe('Dashboard.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza o dashboard corretamente', () => {
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [createPinia()]
      }
    })

    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.findComponent(TransactionForm).exists()).toBe(true)
  })

  it('adiciona transação ao capturar evento do TransactionForm', async () => {
    const pinia = createPinia()
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [pinia]
      }
    })

    const store = useTransactionsStore()

    const transaction: Transaction = {
      id: '1',
      description: 'Mercado',
      date: '2026-03-10',
      value: 150,
      type: 'expense',
      category: 'Alimentação'
    }

    // emitir evento manualmente
    await wrapper.findComponent(TransactionForm)
      .vm.$emit('submit', transaction)

    expect(store.transactions.length).toBe(1)
    expect(store.transactions[0].description).toBe('Mercado')
  })

  it('renderiza transações adicionadas na tabela', async () => {
    const pinia = createPinia()
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [pinia]
      }
    })

    const store = useTransactionsStore()

    store.addTransaction({
      id: '1',
      description: 'Salário',
      date: '2026-03-01',
      value: 3000,
      type: 'income',
      category: 'Renda'
    })
    


    // Filtrar o mês correto:
    const yearInput = wrapper.find('input#inputYear')
    const monthSelect = wrapper.find('select#inputMonth')

    await yearInput.setValue(2026)
    await monthSelect.setValue('3')

    await wrapper.vm.$nextTick()


    const rows = wrapper.findAll('tbody tr')

    // deve existir pelo menos uma linha de transação
    expect(rows.length).toBeGreaterThan(0)
    const firstRowText = rows[0].text()
    expect(firstRowText).toContain('Salário')
    expect(firstRowText).toContain('3000')
  })

  it('filtra transações por ano e mês', async () => {
    const pinia = createPinia()
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [pinia]
      }
    })

    const store = useTransactionsStore()

    store.addTransaction({
      id: '1',
      description: 'Aluguel',
      date: '2026-02-05',
      value: 1000,
      type: 'expense',
      category: 'Moradia'
    })

    store.addTransaction({
      id: '2',
      description: 'Mercado',
      date: '2026-03-10',
      value: 200,
      type: 'expense',
      category: 'Alimentação'
    })

    // setar ano e mês
    const yearInput = wrapper.find('input#inputYear')
    const monthSelect = wrapper.find('select#inputMonth')

    await yearInput.setValue(2026)
    await monthSelect.setValue(3)

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Mercado') //Testar texto não é o recomendado, mas aqui estou testando de diferentes formas.
    expect(wrapper.text()).not.toContain('Aluguel')
  })
})
