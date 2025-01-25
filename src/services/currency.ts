const exchangeRates = {
  USD: 1,
  SYP: 12000, // Updated Syrian Pound exchange rate
};

export type CurrencyCode = keyof typeof exchangeRates;

export const formatPrice = (amount: number, currency: CurrencyCode): string => {
  const rate = exchangeRates[currency];
  const convertedAmount = amount * rate;
  
  const formatter = new Intl.NumberFormat(getCurrencyLocale(currency), {
    style: 'currency',
    currency,
    maximumFractionDigits: 0, // Remove decimal places for SYP
  });
  
  return formatter.format(convertedAmount);
};

const getCurrencyLocale = (currency: CurrencyCode): string => {
  const locales: Record<CurrencyCode, string> = {
    USD: 'en-US',
    SYP: 'ar-SY',
  };
  return locales[currency];
};