import TransactionModel from 'models/transaction';
import { useState } from 'react';
import Transaction from 'components/transaction';
import Checkbox from 'components/checkbox';

function TransactionList({
    transactions
}: {
    transactions: TransactionModel[];
}) {
    const [allSelected, selectAll] = useState(false);
    console.log(transactions);
    return (
        <div className="w-full grow basis-full">
            <table className="w-full">
                <thead>
                    <tr className="bg-gradient-to-b from-gray-500 to-gray-600 py-0.5 pl-0.5 text-gray-200">
                        <th className="w-1 border-r-2 border-r-slate-700 ring-2 ring-gray-400">
                            <Checkbox
                                checked={allSelected}
                                onChange={selectAll}
                                size={24}
                            ></Checkbox>
                        </th>
                        <th className="w-28 border-r-2 border-r-slate-700 ring-2 ring-gray-400">
                            Date
                        </th>
                        <th className="border-r-2 border-r-slate-700 ring-2 ring-gray-400">
                            Description
                        </th>
                        <th className="border-r-2 border-r-slate-700 ring-2 ring-gray-400">
                            Category
                        </th>
                        <th className="border-r-2 border-r-slate-700 ring-2 ring-gray-400">
                            Memo
                        </th>
                        <th className="w-28 border-r-2 border-r-slate-700 ring-2 ring-gray-400">
                            Outflow
                        </th>
                        <th className="w-28 border-r-2 border-r-slate-700 ring-2 ring-gray-400">
                            Inflow
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions &&
                        transactions.map((transaction: TransactionModel) => (
                            <Transaction
                                key={`transaction${transaction.id}`}
                                transaction={transaction}
                                onChange={() => true}
                                editMode={transaction.id === 2}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionList;
