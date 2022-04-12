import { createReducer } from '@reduxjs/toolkit';
import { setCurrentBoardId } from './board.actions';

type BoardType = {
    currentBoardId: null | number;
};

const initialState: BoardType = {
    currentBoardId: null,
};

export const boardReducer = createReducer(initialState, (builder) => {
    builder.addCase(setCurrentBoardId, (state, action) => {
        state.currentBoardId = action.payload.currentBoardId;
    });
});
