import { Button, Field, Input } from '@headlessui/react';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import Checkbox from 'components/checkbox';
import TransactionModel from 'models/transaction';
import { formatCurrency, intlDate } from 'utils/formatter';

function Transaction({
    onChange,
    editMode = true,
    transaction
}: {
    onChange: (value: boolean, id: number) => void;
    editMode: boolean;
    transaction: TransactionModel;
}) {
    let enabled = editMode;
    function setEnabled(value: boolean) {
        enabled = value;
        if (onChange) onChange(value, transaction.id);
    }
    if (editMode)
        return (
            <>
                <tr className="bg-yellow-200 py-2 pl-0.5">
                    <td className="py-2">
                        <Checkbox
                            checked={enabled}
                            onChange={setEnabled}
                            size={24}
                        />
                    </td>
                    <td className="pr-1 text-start">
                        <input
                            type="date"
                            name="date"
                            id={'date-' + transaction.id}
                        />
                    </td>
                    <td className="pr-1 text-start">
                        <input
                            type="text"
                            name="description"
                            id={'description-' + transaction.id}
                            form="editTransaction"
                            placeholder="description"
                            className="w-full"
                        />
                    </td>
                    <td className="pr-1 text-start">
                        {transaction.category?.name}
                    </td>
                    <td className="pr-1 text-start">
                        <Field>
                            <Input
                                type="text"
                                name="memo"
                                form="editTransaction"
                                className="w-full"
                                placeholder="Memo"
                            />
                        </Field>
                    </td>
                    <td className="pr-1 text-end">
                        {transaction.value >= 0 ? transaction.value : ''}
                    </td>
                    <td className="pr-1 text-end">
                        {transaction.value < 0 ? -transaction.value! : ''}
                    </td>
                </tr>
                <tr className="bg-yellow-200">
                    <td colSpan={6}></td>
                    <td className="inline-flex w-full justify-end pb-2">
                        <Button className="mr-4 flex rounded-md bg-slate-200 px-2 py-0.5 shadow-lg">
                            <CheckCircle size={24} /> Save
                        </Button>
                        <Button className="flex rounded-md bg-slate-200 px-2 py-0.5 shadow-xl">
                            <XCircle size={24} /> Cancel
                        </Button>
                    </td>
                </tr>
            </>
        );
    else
        return (
            <tr className="py-0.5 pl-0.5 odd:bg-blue-100">
                <td>
                    <Checkbox
                        checked={enabled}
                        onChange={setEnabled}
                        size={24}
                    />
                </td>
                <td className="pr-1 text-start">
                    {intlDate(transaction.date)}
                </td>
                <td className="pr-1 text-start">{transaction.description}</td>
                <td className="pr-1 text-start">
                    {transaction.category?.name}
                </td>
                <td className="pr-1 text-start">{transaction.memo}</td>
                <td className="pr-1 text-end">
                    {transaction.value >= 0
                        ? formatCurrency(transaction.value)
                        : ''}
                </td>
                <td className="pr-1 text-end">
                    {transaction.value < 0
                        ? formatCurrency(-transaction.value!)
                        : ''}
                </td>
            </tr>
        );
}

export default Transaction;
