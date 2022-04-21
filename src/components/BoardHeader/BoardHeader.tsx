import styles from './BoardHeader.module.sass';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Button } from '@mui/material';
import ManageTagsModal from '../CustomModal/ManageTagsModal/ManageTagsModal';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'src/hooks/redux';
import { calculateTextColor } from '../../helpers/calculateTextColor';

export const BoardHeader = () => {
    const boardHeaderRef = useRef<null | HTMLDivElement>(null);
    const [manageTagsModalOpen, setManageTagsModalOpen] =
        useState<boolean>(false);

    const [colorScheme, boardTitle] = useAppSelector((state) => [
        state.persistedReducer.config.colorScheme,
        state.board.currentBoardTitle,
    ]);

    const [titleColor, setTitleColor] = useState('red');

    useEffect(() => {
        if (boardHeaderRef && boardHeaderRef.current) {
            setTitleColor(
                calculateTextColor(
                    boardHeaderRef.current.style.backgroundColor,
                    boardHeaderRef
                )
            );
        }
    }, [boardHeaderRef, colorScheme]);

    return (
        <div
            ref={boardHeaderRef}
            className={styles.boardHeader}
            style={{ backgroundColor: `var(--${colorScheme}-800)` }}
        >
            <div
                className={styles.boardHeader__title}
                style={{ color: titleColor }}
            >
                {boardTitle}
            </div>

            <div className={styles.boardHeader__actions}>
                <ManageTagsModal
                    open={manageTagsModalOpen}
                    handleClose={() => setManageTagsModalOpen(false)}
                />

                <Button
                    variant="outlined"
                    startIcon={<LocalOfferIcon />}
                    onClick={() => setManageTagsModalOpen(true)}
                    sx={{ color: 'white', border: '1px solid white' }}
                >
                    TAGS
                </Button>
            </div>
        </div>
    );
};

export default BoardHeader;
