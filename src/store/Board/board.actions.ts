import { createAction } from "@reduxjs/toolkit";

export const setCurrentBoardId = createAction(
    'board/setCurrentBoardId',
    (currentBoardId: number) => {
        return {
            payload: {
                currentBoardId,
            },
        };
    }
)