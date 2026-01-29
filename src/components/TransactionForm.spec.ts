import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TransactionForm from '@/components/TransactionForm.vue'
import type { Transaction } from '@/types/Transaction'

describe('TransactionForm.vue', () => {
  it('renderiza o formulário corretamente', () => {
    const wrapper = mount(TransactionForm)

    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="date"]').exists()).toBe(true)
    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('não emite submit se campos obrigatórios estiverem vazios', async () => {
    const wrapper = mount(TransactionForm)

    await wrapper.find('form').trigger('submit')

    const events = wrapper.emitted('submit')
    expect(events).toBeUndefined()
  })

  it('emite evento submit com uma transação válida', async () => {
    const wrapper = mount(TransactionForm)

    // preencher campos
    await wrapper.find('input[type="text"]').setValue('Mercado')
    await wrapper.find('input[type="date"]').setValue('2026-03-10')
    await wrapper.find('input[type="number"]').setValue('150')
    await wrapper.find('select').setValue('expense')

    // categoria (segundo input text)
    const textInputs = wrapper.findAll('input[type="text"]')
    await textInputs[1].setValue('Alimentação')

    await wrapper.find('form').trigger('submit')

    const events = wrapper.emitted('submit')
    expect(events).toBeTruthy()
    expect(events!.length).toBe(1)

    const transaction = events![0][0] as Transaction

    expect(transaction.description).toBe('Mercado')
    expect(transaction.date).toBe('2026-03-10')
    expect(transaction.value).toBe(150)
    expect(transaction.type).toBe('expense')
    expect(transaction.category).toBe('Alimentação')
    expect(typeof transaction.id).toBe('string')
  })

  it('reseta o formulário após o submit', async () => {
    const wrapper = mount(TransactionForm)

    await wrapper.find('input[type="text"]').setValue('Salário')
    await wrapper.find('input[type="date"]').setValue('2026-03-01')
    await wrapper.find('input[type="number"]').setValue('3000')
    await wrapper.find('select').setValue('income')

    const textInputs = wrapper.findAll('input[type="text"]')
    await textInputs[1]!.setValue('Renda')

    await wrapper.find('form').trigger('submit')

    // inputs resetados
    expect((wrapper.find('input[type="text"]').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('input[type="date"]').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('input[type="number"]').element as HTMLInputElement).value).toBe('')
    expect((textInputs[1]!.element as HTMLInputElement).value).toBe('')
  })
})
