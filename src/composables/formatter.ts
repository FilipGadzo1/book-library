type MaybeObjectValue<T> = T | { value: T };
type NumberValue = number;
type FormatterNumberOptions = Intl.NumberFormatOptions & {
  fractionDigits?: number;
  negativeParentheses?: boolean;
};

interface Formatter {
  number(value: MaybeObjectValue<NumberValue>, options?: FormatterNumberOptions): string;
}

function isObject(value: Object | unknown): value is Object {
  return value !== null && value !== undefined && (typeof value === 'object' || typeof value === 'function');
}

function resolveValue<T>(payload: MaybeObjectValue<T>) {
  return isObject(payload) ? payload.value : payload;
}

export function useFormatter(locales: string | string[] = 'en-US'): Formatter {
  function number(value: MaybeObjectValue<NumberValue>, options: FormatterNumberOptions = {}) {
    const { fractionDigits, negativeParentheses, ...numberOptions } = options;
    const numberFormat = new Intl.NumberFormat(locales, {
      style: 'decimal',
      currency: options.style === 'currency' ? 'USD' : undefined,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits ?? 0,
      ...numberOptions,
    });

    const numberValue = resolveValue(value);
    let formattedNumber = numberFormat.format(numberValue);

    if (negativeParentheses && numberValue < 0) {
      formattedNumber = `(${formattedNumber.slice(1)})`;
    }

    return formattedNumber;
  }
  return { number };
}
