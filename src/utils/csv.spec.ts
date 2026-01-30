import { describe, it, expect } from 'vitest'
import { transactionsToCSV } from './csv'
import type { Transaction } from '@/types/Transaction'

describe('transactionsToCSV', () => {
  it('gera CSV corretamente', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        description: 'Salário',
        date: '2026-03-01',
        value: 3000,
        type: 'income',
        category: 'Renda'
      },
      {
        id: '2',
        description: 'Mercado',
        date: '2026-03-10',
        value: 150,
        type: 'expense',
        category: 'Alimentação'
      }
    ]

    const csv = transactionsToCSV(transactions)

    expect(csv).toContain('Descrição,Data,Tipo,Categoria,Valor')
    expect(csv).toContain('Salário,2026-03-01,Entrada,Renda,3000')
    expect(csv).toContain('Mercado,2026-03-10,Saída,Alimentação,150')
  })
})
