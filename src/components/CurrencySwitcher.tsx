import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCurrency } from '../store/slices/settingsSlice';
import { CurrencyCode } from '../services/currency';
import { DollarSign } from 'lucide-react';

export default function CurrencySwitcher() {
  const dispatch = useDispatch();
  const currentCurrency = useSelector((state: RootState) => state.settings.currency);

  const currencies: CurrencyCode[] = ['USD', 'SYP'];

  return (
    <div className="relative inline-block">
      <select
        value={currentCurrency}
        onChange={(e) => dispatch(setCurrency(e.target.value as CurrencyCode))}
        className="appearance-none bg-transparent pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
    </div>
  );
}