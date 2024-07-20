import TransactionModel from 'models/transaction';
import TransactionList from 'components/transaction-list';
import { formatCurrency } from 'utils/formatter';

function Account({ transactions }: { transactions: TransactionModel[] }) {
    console.log(transactions);
    return (
        <div className="flex h-screen flex-col">
            <TransactionList key="transactions" transactions={transactions} />
            <div className="table w-full bg-slate-300 p-2">
                <div className="float-end table rounded-md border-gray-800 bg-slate-50 p-2 font-bold text-black shadow-inner">
                    <div className="flex w-fit flex-col px-2 py-1 text-center align-middle text-sm">
                        <div className="font-normal">Inflow</div>
                        <div>{formatCurrency(7)}</div>
                    </div>
                    <div className="table-cell w-fit px-2 py-1 text-center align-middle text-sm">
                        -
                    </div>
                    <div className="flex w-fit flex-col px-2 py-1 text-center align-middle text-sm">
                        <div className="font-normal">Outflow</div>
                        <div>{formatCurrency(4)}</div>
                    </div>
                    <div className="table-cell w-fit px-2 py-1 text-center align-middle text-sm">
                        =
                    </div>
                    <div className="flex w-fit flex-col px-2 py-1 text-center align-middle text-sm">
                        <div className="font-normal">Total</div>
                        <div>{formatCurrency(3)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
