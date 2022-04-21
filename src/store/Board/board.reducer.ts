import { createReducer } from '@reduxjs/toolkit';
import { setCurrentBoardId, setCurrentBoardTitle } from './board.actions';

type BoardType = {
    currentBoardId: null | number;
    currentBoardTitle: null | string;
};

const initialState: BoardType = {
    currentBoardId: null,
    currentBoardTitle: null,
};

export const boardReducer = createReducer(initialState, (builder) => {
    builder.addCase(setCurrentBoardId, (state, action) => {
        state.currentBoardId = action.payload.currentBoardId;
    });
    builder.addCase(setCurrentBoardTitle, (state, action) => {
        state.currentBoardTitle = action.payload.currentBoardTitle
    })
});
