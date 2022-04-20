import { createReducer } from '@reduxjs/toolkit';
import { setColorScheme } from './config.actions';

export type ConfigType = {
    colorScheme: string;
};

const initialState = {
    colorScheme: 'blue',
} as ConfigType;

export const configReducer = createReducer(initialState, (builder) => {
    builder.addCase(setColorScheme, (state, action) => {
        state.colorScheme = action.payload.colorScheme;
    });
});
