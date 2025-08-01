import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import userReducer from './slice/userSlice'
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";

const persistConfig = {
    key:"root",
    storage
}
const rootReducer = combineReducers({
    user:userReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
reducer:persistedReducer,
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store);

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;