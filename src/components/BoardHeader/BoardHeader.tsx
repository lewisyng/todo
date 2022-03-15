import styles from './BoardHeader.module.sass';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Button } from '@mui/material';
import ManageTagsModal from '../CustomModal/ManageTagsModal/ManageTagsModal';
import { useState } from 'react';

export const BoardHeader = ({ title }: { title: string }) => {
  const [manageTagsModalOpen, setManageTagsModalOpen] =
    useState<boolean>(false);

  return (
    <div className={styles.boardHeader}>
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
