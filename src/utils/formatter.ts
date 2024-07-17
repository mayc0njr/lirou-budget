import { intlFormat } from 'date-fns';

export function classNames(...classes: unknown[]): string {
    return classes.filter(Boolean).join(' ');
}

export function intlDate(date?: Date) {
    if (!date) return '';
    return intlFormat(date);
}
