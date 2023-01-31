import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TickerResponse {
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  yield: number;
  last_trade_time: string;
}

interface TickerState {
  track: string[];
  data: TickerResponse[];
}

const initialState: TickerState = {
  track: [],
  data: [],
};

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    addTrackByName: (state, action: PayloadAction<string>) => {
      state.track = [...state.track, action.payload];
    },
    removeTrackByName: (state, action: PayloadAction<string>) => {
      state.track = state.track.filter((item) => item !== action.payload);
    },
    updateData: (state, action: PayloadAction<TickerResponse[]>) => {
      state.data = action.payload;
    },
  },
});

export const { addTrackByName, updateData, removeTrackByName } = tickerSlice.actions;

export default tickerSlice.reducer;
