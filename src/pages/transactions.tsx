import { CurrencyCircleDollar } from '@phosphor-icons/react';
import TransactionModel from 'models/transaction';
import Transaction from './transaction';
import { Checkbox } from '@headlessui/react';
import { useState } from 'react';

function Transactions({ transactions }: { transactions: TransactionModel[] }) {
    const [allSelected, selectAll] = useState(false);
    console.log(transactions);
    return (
        <table className="">
            <thead>
                <tr className="py-0.5 pl-0.5">
                    <th>
                        <Checkbox
                            checked={allSelected}
                            onChange={selectAll}
                        ></Checkbox>
                    </th>
                    <th className="pr-1">Date</th>
                    <th className="pr-1">Payee</th>
                    <th className="pr-1">Category</th>
                    <th className="pr-1">Memo</th>
                    <th className="pr-1">Outflow</th>
                    <th className="pr-1">Inflow</th>
                    <th className="pr-1">
                        <CurrencyCircleDollar size={24} />
                    </th>
                </tr>
            </thead>
            <tbody>
                {transactions &&
                    transactions.map((transaction: TransactionModel) => (
                        <Transaction
                            key={`transaction${transaction.id}`}
                            transaction={transaction}
                            onchange={() => true}
                        />
                    ))}
            </tbody>
        </table>
    );
}

export default Transactions;
