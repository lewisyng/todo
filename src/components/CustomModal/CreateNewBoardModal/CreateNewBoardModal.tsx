import { FormEvent, useState } from 'react';
import styles from './CreateNewBoardModal.module.sass';
import CustomModal from '../CustomModal';
import Button from 'src/components/ui/Button/Button';
import CustomModalHeader from '../CustomModalParts/CustomModalHeader/CustomModalHeader';
import CustomModalBody from '../CustomModalParts/CustomModalBody/CustomModalBody';
import CustomModalActions from '../CustomModalParts/CustomModalActions/CustomModalActions';
import { database } from 'src/database';
import cn from 'classnames';

export const CreateNewBoardModal = ({
  open,
  handleClose,
  className,
}: {
  open: boolean;
  handleClose: () => void;
  className?: string;
}) => {
  const [name, setName] = useState<string>('');

  const createBoard = (e: FormEvent) => {
    e.preventDefault();

    database.boards.add({
      title: name,
    });
  };

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={cn(className, styles.deleteColumn__modal)}
    >
      <div className={styles.deleteColumnModal__content}>
        <CustomModalHeader>Wie soll das neue Board heißen?</CustomModalHeader>

        <CustomModalBody>
          <form onSubmit={createBoard}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        </CustomModalBody>

        <CustomModalActions>
          <Button onClick={handleClose} variant="tertiary">
            Abbrechen
          </Button>
        </CustomModalActions>
      </div>
    </CustomModal>
  );
};

export default CreateNewBoardModal;
