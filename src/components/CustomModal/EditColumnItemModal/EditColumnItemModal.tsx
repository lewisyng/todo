import styles from './EditColumnItemModal.module.sass';
import CustomModal from '../CustomModal';
import { Button } from '@mui/material';
import { useState } from 'react';
import { database } from 'src/database';

export const EditColumnItemModal = ({
  columnItem,
  open,
  onClose,
}: {
  columnItem: any;
  open: boolean;
  onClose: () => void;
}) => {
  const { title, description } = columnItem;

  const [columnItemDescription, setColumnItemDescription] =
    useState<string>(description);

  const saveDescription = () => {
    // database.columns.where();
  };

  return (
    <CustomModal
      className={styles.editColumnItemModal}
      open={open}
      onClose={onClose}
    >
      <div className={styles.editColumnItemModal__content}>
        <div className={styles.editColumnItemModalContent__title}>{title}</div>

        <div className={styles.editColumnItemModalContent__description}>
          <textarea
            name="modal__description"
            id="modal__description"
            rows={10}
            placeholder="Geben Sie eine Beschreibung ein..."
          >
            {columnItemDescription}
          </textarea>

          <Button variant="contained" color="primary" onClick={saveDescription}>
            Speichern
          </Button>

          <Button variant="text" color="primary">
            Zurücksetzen
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default EditColumnItemModal;
