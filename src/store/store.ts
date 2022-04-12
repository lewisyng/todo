import { combineReducers, createStore } from 'redux';
import { configReducer, ConfigType } from './Config/config.reducer';
import { boardReducer } from './Board/board.reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
// import { configSlice } from './Config/config.reducer';

export type PersistedRootState = ConfigType;

const persistedRootReducer /*: PersistedRootState*/ = combineReducers({
    config: configReducer,
});

const persistConfig = {
    key: 'persistedStore',
    storage,
    whitelist: ['config'],
};

const persistedReducer = persistReducer(persistConfig, persistedRootReducer);

export const store = configureStore({
    reducer: {
        persistedReducer,
        board: boardReducer,
        // config: configSlice.reducer,
    },
});

// store type
export type RootState = ReturnType<typeof store.getState>;

// dispatch type
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
