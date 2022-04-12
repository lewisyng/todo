import styles from './SelectBoardModal.module.css';
import CustomModal from '../CustomModal';
import cn from 'classnames';
import { database } from 'src/database';
import { Board } from 'src/models/Board';
import { useEffect, useState } from 'react';
import CustomModalBody from '../CustomModalParts/CustomModalBody/CustomModalBody';
import { useAppDispatch } from 'src/hooks/redux';
import { setCurrentBoardId } from 'src/store/Board/board.actions';

export const SelectBoardModal = ({
    open,
    handleClose,
    className,
}: {
    open: boolean;
    handleClose: () => void;
    className?: string;
}) => {
    const [boards, setBoards] = useState<Board[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        database.boards.toArray().then(setBoards);
    }, []);

    const handleClick = (id: number) => {
        dispatch(setCurrentBoardId(id));
    };

    return (
        <CustomModal
            className={cn(className, styles.selectBoardModal)}
            open={open}
            onClose={handleClose}
            title="Select a board"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <CustomModalBody>
                <div className={styles.boardTiles}>
                    {boards &&
                        boards.map((board: Board, idx: number) => (
                            <div
                                key={idx}
                                className={styles.boardTile}
                                onClick={() => handleClick(board.id as number)}
                            >
                                {board.title}
                            </div>
                        ))}
                </div>
            </CustomModalBody>
        </CustomModal>
    );
};

export default SelectBoardModal;
