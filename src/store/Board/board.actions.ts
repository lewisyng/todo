import { createAction } from '@reduxjs/toolkit';

export const setCurrentBoardId = createAction(
    'board/setCurrentBoardId',
    (currentBoardId: number) => {
        return {
            payload: {
                currentBoardId,
            },
        };
    }
);

export const setCurrentBoardTitle = createAction(
    'board/setCurrentBoardTitle',
    (currentBoardTitle: string) => {
        return {
            payload: {
                currentBoardTitle,
            },
        };
    }
);
