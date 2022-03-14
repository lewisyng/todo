import { Modal } from '@mui/material';
import Button from '../ui/Button/Button';
import styles from './DeleteColumnModal.module.sass';

export const DeleteColumnModal = ({
  open,
  handleClose,
  deleteColumn,
}: {
  open: boolean;
  handleClose: () => void;
  deleteColumn: () => void;
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={styles.deleteColumn__modal}
    >
      <div className={styles.deleteColumnModal__content}>
        <div className={styles.deleteColumnModalContent__header}>
          Text in a modal
        </div>
        <div className={styles.deleteColumnModalContent__body}>
          Das löschen einer Column kann nicht rückgängig gemacht werden.
        </div>
        <div className={styles.deleteColumnModalContent__actions}>
          <Button onClick={deleteColumn}>Column löschen</Button>
          <Button onClick={handleClose} variant="tertiary">Abbrechen</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteColumnModal;
