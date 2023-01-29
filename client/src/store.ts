import { configureStore } from '@reduxjs/toolkit';
import tickerReducer from '~/features/ticker/slice';

const store = configureStore({
  reducer: {
    tickers: tickerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
