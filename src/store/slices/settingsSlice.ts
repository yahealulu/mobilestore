import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyCode } from '../../services/currency';

interface SettingsState {
  currency: CurrencyCode;
  language: string;
}

const initialState: SettingsState = {
  currency: 'USD',
  language: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setCurrency, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;