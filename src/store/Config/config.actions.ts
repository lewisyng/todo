import { createAction } from '@reduxjs/toolkit';

export const setColorScheme = createAction(
    'config/setColorScheme',
    (colorScheme: string) => {
        return {
            payload: {
                colorScheme,
            },
        };
    }
);
