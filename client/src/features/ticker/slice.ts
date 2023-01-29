import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TicketResponse {
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  yield: number;
  last_trade_time: string;
}

type TickerState = TicketResponse[];

const initialState: TickerState = [];

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TicketResponse>) => {
      state = [...state, action.payload];
    },
    updateByName: (state, action: PayloadAction<TicketResponse>) => {
      state = state.map((item) => (item.ticker === action.payload.ticker ? action.payload : item));
    },
    removeByName: (state, action: PayloadAction<string>) => {
      state = state.filter((item) => item.ticker !== action.payload);
    },
  },
});

export const { add, removeByName } = tickerSlice.actions;

export default tickerSlice.reducer;
