import Category from './category';

export interface TransactionModelData {
    id: number;
    date?: Date;
    payee?: string;
    category?: Category;
    memo?: string;
    value: number;
}

export default class TransactionModel implements TransactionModel {
    id: number;
    date?: Date;
    payee?: string;
    category?: Category;
    memo?: string;
    value: number = 0;

    constructor(id: number) {
        this.id = id;
    }
}
