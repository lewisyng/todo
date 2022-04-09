import { createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setColorScheme } from './config.actions';

export type ConfigType = {
    colorScheme: string;
};

const initialState = {
    colorScheme: 'dark',
} as ConfigType;

export const configReducer = createReducer(initialState, (builder) => {
    builder.addCase(setColorScheme, (state, action) => {
        state.colorScheme = action.payload.colorScheme;
    });
});
