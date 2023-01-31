import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import tickerReducer from '~/features/ticker/slice';

export const rootReducer = combineReducers({
  tickers: tickerReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
