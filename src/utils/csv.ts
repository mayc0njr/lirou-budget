import type { Transaction } from '@/types/Transaction'

export function transactionsToCSV(transactions: Transaction[]): string {
  const header = [
    'Descrição',
    'Data',
    'Tipo',
    'Categoria',
    'Valor'
  ]

  const rows = transactions.map(t => [
    t.description,
    t.date,
    t.type === 'income' ? 'Entrada' : 'Saída',
    t.category,
    t.value.toString()
  ])

  const csv = [
    header,
    ...rows
  ]
    .map(row => row.join(','))
    .join(';\n')

  return csv
}

export function downloadCSV(
  transactions: Transaction[],
  filename: string
) {

  const content = transactionsToCSV(transactions)
  const blob = new Blob([content], {
    type: 'text/csv;charset=utf-8;'
  })

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()

  URL.revokeObjectURL(url)
}
