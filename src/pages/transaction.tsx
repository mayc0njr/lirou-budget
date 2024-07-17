import { CheckSquare, CurrencyCircleDollar } from '@phosphor-icons/react';
import Checkbox from 'components/checkbox';
import TransactionModel from 'models/transaction';
import { intlDate } from 'utils/formatter';

function Transaction({
    onchange,
    transaction
}: {
    onchange: (value: boolean, id: number) => void;
    transaction: TransactionModel;
}) {
    let enabled = false;
    function setEnabled(value: boolean) {
        enabled = value;
        if (onchange) onchange(value, transaction.id);
    }
    return (
        <tr className="py-0.5 pl-0.5 odd:bg-blue-100">
            <td>
                <Checkbox checked={enabled} onChange={setEnabled} />
            </td>
            <td className="pr-1">{intlDate(transaction.date)}</td>
            <td className="pr-1">{transaction.payee}</td>
            <td className="pr-1">{transaction.category?.name}</td>
            <td className="pr-1">{transaction.memo}</td>
            <td className="pr-1">
                {transaction.value >= 0 ? transaction.value : ''}
            </td>
            <td className="pr-1">
                {transaction.value < 0 ? -transaction.value! : ''}
            </td>
            <td className="pr-1">
                {transaction.value != undefined && transaction.value >= 0 ? (
                    <CurrencyCircleDollar
                        size={24}
                        weight="fill"
                        className="text-green-500"
                    />
                ) : (
                    <CurrencyCircleDollar size={24} className="text-red-500" />
                )}
            </td>
        </tr>
    );
}

export default Transaction;
