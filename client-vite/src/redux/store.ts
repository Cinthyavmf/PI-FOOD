import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'; // o combineReducers si tenés varios

export const store = configureStore({
  reducer: rootReducer, // puede ser directamente un reducer o un combineReducers
  devTools: true,       // las devtools ya están integradas en Redux Toolkit
});

// Exportamos también RootState y AppDispatch para TS:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



