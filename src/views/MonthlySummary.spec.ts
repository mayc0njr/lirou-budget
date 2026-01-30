import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import MonthlySummary from '@/views/MonthlySummary.vue'
import { useTransactionsStore } from '@/stores/transactions'

describe('MonthlySummary.vue', () => {

  function seedStore(pinia: ReturnType<typeof createPinia>) {
    const store = useTransactionsStore(pinia)

    store.addTransaction({
      id: '1',
      description: 'Jan',
      date: '2026-01-10',
      value: 100,
      type: 'expense',
      category: 'Teste'
    })

    store.addTransaction({
      id: '2',
      description: 'Fev',
      date: '2026-02-10',
      value: 200,
      type: 'expense',
      category: 'Teste'
    })

    store.addTransaction({
      id: '3',
      description: 'Mar',
      date: '2026-03-10',
      value: 300,
      type: 'expense',
      category: 'Teste'
    })

    store.addTransaction({
      id: '4',
      description: 'Abr',
      date: '2026-04-10',
      value: 400,
      type: 'expense',
      category: 'Teste'
    })

    return store
  }

  it('renderiza apenas WINDOW_SIZE meses inicialmente', async () => {
    const pinia = createPinia()
    seedStore(pinia)

    const wrapper = mount(MonthlySummary, {
      global: {
        plugins: [pinia]
      }
    })
    
    await wrapper.vm.$nextTick()

    const blocks = wrapper.findAll('[data-testid="monthly-block"]')
    expect(blocks.length).toBe(3) // WINDOW_SIZE = 3
  })

  it('renderiza os meses corretos na primeira janela', () => {
    const pinia = createPinia()
    seedStore(pinia)

    const wrapper = mount(MonthlySummary, {
      global: {
        plugins: [pinia]
      }
    })

    const blockTitles = wrapper
      .findAll('[data-testid="monthly-block"]')
      .map(b => b.text())

    expect(blockTitles.some(t => t.includes('2026-01'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-02'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-03'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-04'))).toBe(false)
  })

  it('avança a janela ao clicar em próximo', async () => {
    const pinia = createPinia()
    seedStore(pinia)

    const wrapper = mount(MonthlySummary, {
      global: {
        plugins: [pinia]
      }
    })

    const nextButton = wrapper.find('button:last-of-type')
    await nextButton.trigger('click')
    await wrapper.vm.$nextTick()

    const blockTitles = wrapper
      .findAll('[data-testid="monthly-block"]')
      .map(b => b.text())

    expect(blockTitles.some(t => t.includes('2026-02'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-03'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-04'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-01'))).toBe(false)
  })

  it('avança a janela ao arrastar o mouse para a esquerda', async () => {
    const pinia = createPinia()
    seedStore(pinia)

    const wrapper = mount(MonthlySummary, {
      global: {
        plugins: [pinia]
      }
    })

    const container = wrapper.find('[data-testid="months-container"]')
    const el = container.element;
    await el.dispatchEvent( //Dispatch event = trigga o evento no DOM. Já o trigger() só dispara eventos do sistema do Vue, não eventos DOM nativos registrados com addEventListener.
      new MouseEvent('mousedown', {
        clientX: 200
      })
    )
    await window.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 100
      })
    )
    await window.dispatchEvent(new MouseEvent('mouseup'))

    await wrapper.vm.$nextTick()

    const blockTitles = wrapper
      .findAll('[data-testid="monthly-block"]')
      .map(b => b.text())

    expect(blockTitles.some(t => t.includes('2026-02'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-03'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-04'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-01'))).toBe(false)
  })

  it('avança a janela ao swipe para a esquerda', async () => {
    const pinia = createPinia()
    seedStore(pinia)

    const wrapper = mount(MonthlySummary, {
      global: {
        plugins: [pinia]
      }
    })

    const container = wrapper.find('[data-testid="months-container"]')
    await container.trigger('touchstart', {
      touches: [{ clientX: 200 }]
    })
    await container.trigger('touchmove', {
      touches: [{ clientX: 100 }]
    })
    await container.trigger('touchend')

    await wrapper.vm.$nextTick()

    const blockTitles = wrapper
      .findAll('[data-testid="monthly-block"]')
      .map(b => b.text())

    expect(blockTitles.some(t => t.includes('2026-02'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-03'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-04'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-01'))).toBe(false)
  })

  it('volta a janela ao clicar em anterior', async () => {
    const pinia = createPinia()
    seedStore(pinia)

    const wrapper = mount(MonthlySummary, {
      global: {
        plugins: [pinia]
      }
    })

    const [prevButton, nextButton] = wrapper.findAll('button')

    // avança
    await nextButton.trigger('click')
    await wrapper.vm.$nextTick()

    // volta
    await prevButton.trigger('click')
    await wrapper.vm.$nextTick()

    const blockTitles = wrapper
      .findAll('[data-testid="monthly-block"]')
      .map(b => b.text())

    expect(blockTitles.some(t => t.includes('2026-01'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-02'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-03'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-04'))).toBe(false)
  })

  it('volta a janela ao arrastar o mouse pra direita', async () => {
    const pinia = createPinia()
    seedStore(pinia)

    const wrapper = mount(MonthlySummary, {
      global: {
        plugins: [pinia]
      }
    })

    // avança

    const container = wrapper.find('[data-testid="months-container"]')
    const el = container.element
    await el.dispatchEvent( //Dispatch event = trigga o evento no DOM. Já o trigger() só dispara eventos do sistema do Vue, não eventos DOM nativos registrados com addEventListener.
      new MouseEvent('mousedown', {
        clientX: 200
      })
    )
    await window.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 100
      })
    )
    await window.dispatchEvent(new MouseEvent('mouseup'))

    // volta

    await el.dispatchEvent( 
      new MouseEvent('mousedown', {
        clientX: 200
      })
    )
    await window.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 300
      })
    )
    await window.dispatchEvent(new MouseEvent('mouseup'))


    const blockTitles = wrapper
      .findAll('[data-testid="monthly-block"]')
      .map(b => b.text())

    expect(blockTitles.some(t => t.includes('2026-01'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-02'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-03'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-04'))).toBe(false)
  })

  it('volta a janela ao swipe pra direita', async () => {
    const pinia = createPinia()
    seedStore(pinia)

    const wrapper = mount(MonthlySummary, {
      global: {
        plugins: [pinia]
      }
    })

    // avança

    const container = wrapper.find('[data-testid="months-container"]')
    await container.trigger('touchstart', {
      touches: [{ clientX: 200 }]
    })
    await container.trigger('touchmove', {
      touches: [{ clientX: 100 }]
    })
    await container.trigger('touchend')

    // volta

    await container.trigger('touchstart', {
      touches: [{ clientX: 200 }]
    })
    await container.trigger('touchmove', {
      touches: [{ clientX: 300 }]
    })
    await container.trigger('touchend')

    const blockTitles = wrapper
      .findAll('[data-testid="monthly-block"]')
      .map(b => b.text())

    expect(blockTitles.some(t => t.includes('2026-01'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-02'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-03'))).toBe(true)
    expect(blockTitles.some(t => t.includes('2026-04'))).toBe(false)
  })

  it('desabilita navegação quando não há mais meses', async () => {
    const pinia = createPinia()
    seedStore(pinia)

    const wrapper = mount(MonthlySummary, {
      global: {
        plugins: [pinia]
      }
    })

    const nextButton = wrapper.find('button:last-of-type')

    // avança até o fim
    await nextButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(nextButton.attributes('disabled')).toBeDefined()
  })
})
