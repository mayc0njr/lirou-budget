export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  description: string
  date: string        // ISO yyyy-mm-dd
  value: number
  type: TransactionType
  category: string
}
