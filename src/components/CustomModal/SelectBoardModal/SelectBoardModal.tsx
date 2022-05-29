import styles from './SelectBoardModal.module.css';
import CustomModal from '../CustomModal';
import cs from 'classnames';
import { database } from 'src/database';
import { Board } from 'src/models/Board';
import { useEffect, useState } from 'react';
import CustomModalBody from '../CustomModalParts/CustomModalBody/CustomModalBody';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { setCurrentBoardId } from 'src/store/Board/board.actions';
import { useLiveQuery } from 'dexie-react-hooks';
import { BasicModal } from '../BasicModal/BasicModal';
import { Typography } from 'src/components/ui/Typography/Typography';
import { setCurrentBoardTitle } from '../../../store/Board/board.actions';

export const SelectBoardModal = ({
    open,
    handleClose,
    className,
}: {
    open: boolean;
    handleClose: () => void;
    className?: string;
}) => {
    const currentBoardId = useAppSelector(
        (state) => state.board.currentBoardId
    );
    const dispatch = useAppDispatch();

    const boards = useLiveQuery(() => database.boards.toArray());

    const handleClick = (id: number) => {
        dispatch(setCurrentBoardId(id));
        const boardTitle = boards?.find(
            (board: Board) => board.id === id
        )?.title;

        if (boardTitle) {
            dispatch(setCurrentBoardTitle(boardTitle));
        }
    };

    const boardIsCurrent = (currentBoard: number, boardId: number) =>
        currentBoard === boardId;

    const SelectBoardBody = (
        <div className={styles.boardTiles}>
            {boards &&
                boards.map((board: Board, idx: number) => (
                    <div
                        key={idx}
                        className={cs(
                            styles.boardTile,
                            boardIsCurrent(currentBoardId!, board.id!) &&
                                styles.boardTile__selected
                        )}
                        onClick={() => handleClick(board.id as number)}
                    >
                        <Typography
                            size="text-sm"
                            weight={
                                boardIsCurrent(currentBoardId!, board.id!)
                                    ? 'bold'
                                    : 'normal'
                            }
                            uppercase
                        >
                            {board.title}
                        </Typography>
                    </div>
                ))}
        </div>
    );

    return (
        <BasicModal
            open={open}
            onClose={handleClose}
            header="Select a board"
            secondaryActionTitle="Exit"
            body={SelectBoardBody}
            secondaryAction={handleClose}
        />
    );
};

export default SelectBoardModal;
