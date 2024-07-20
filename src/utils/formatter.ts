import { intlFormat } from 'date-fns';
const locale = navigator && navigator.language;

export function classNames(...classes: unknown[]): string {
    return classes.filter(Boolean).join(' ');
}

const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    currency: 'BRL'
});

export function formatCurrency(value: number) {
    return currencyFormatter.format(value);
}

export function intlDate(date?: Date) {
    if (!date) return '';
    return intlFormat(date);
}
