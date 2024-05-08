export function useFormat() {
  function formatCreditCardNumber(e: Event) {
    const input = e.target as HTMLInputElement;
    let trimmedValue = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    if (trimmedValue.length > 16) {
      trimmedValue = trimmedValue.slice(0, 16);
    }

    const formattedValue = [];

    for (let i = 0; i < trimmedValue.length; i += 4) {
      formattedValue.push(trimmedValue.substring(i, i + 4));
    }

    return formattedValue.join(' ');
  }

  function formatDate(e: Event) {
    const input = e.target as HTMLInputElement;
    let trimmedValue = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    if (trimmedValue.length > 4) {
      trimmedValue = trimmedValue.slice(0, 4);
    }

    const formattedValue = [];

    for (let i = 0; i < trimmedValue.length; i += 2) {
      formattedValue.push(trimmedValue.substring(i, i + 2));
    }

    return formattedValue.join('/');
  }

  function formatCvv(e: Event) {
    const input = e.target as HTMLInputElement;
    let trimmedValue = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    if (trimmedValue.length > 3) {
      trimmedValue = trimmedValue.slice(0, 3);
    }

    return trimmedValue;
  }

  function formatZip(e: Event) {
    const input = e.target as HTMLInputElement;
    let trimmedValue = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    if (trimmedValue.length > 5) {
      trimmedValue = trimmedValue.slice(0, 5);
    }

    return trimmedValue;
  }

  return {
    formatCreditCardNumber,
    formatDate,
    formatCvv,
    formatZip,
  };
}
