import styles from './BoardHeader.module.sass';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Button } from '@mui/material';
import ManageTagsModal from '../CustomModal/ManageTagsModal/ManageTagsModal';
import { useState } from 'react';
import { useAppSelector } from 'src/hooks/redux';

export const BoardHeader = ({ title }: { title: string }) => {
    const [manageTagsModalOpen, setManageTagsModalOpen] =
        useState<boolean>(false);

    const colorScheme = useAppSelector(
        (state) => state.persistedReducer.config.colorScheme
    );

    return (
        <div
            className={styles.boardHeader}
            style={{ backgroundColor: `var(--${colorScheme}-800)` }}
        >
            <div className={styles.boardHeader__title}>{title}</div>

            <div className={styles.boardHeader__actions}>
                <ManageTagsModal
                    open={manageTagsModalOpen}
                    handleClose={() => setManageTagsModalOpen(false)}
                />

                <Button
                    variant="contained"
                    startIcon={<LocalOfferIcon />}
                    onClick={() => setManageTagsModalOpen(true)}
                >
                    TAGS
                </Button>
            </div>
        </div>
    );
};

export default BoardHeader;
