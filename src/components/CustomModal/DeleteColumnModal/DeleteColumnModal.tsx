import { Button } from '@mui/material';
import CustomModal from '../CustomModal';
import CustomModalBody from '../CustomModalParts/CustomModalBody/CustomModalBody';
import styles from './DeleteColumnModal.module.sass';
import CustomModalActions from '../CustomModalParts/CustomModalActions/CustomModalActions';

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
        <CustomModal
            open={open}
            onClose={handleClose}
            className={styles.deleteColumn__modal}
            title="Delete column"
        >
            <div className={styles.deleteColumnModal__content}>
                <CustomModalBody>
                    Deleting a column can't be reverted
                </CustomModalBody>

                <CustomModalActions>
                    <Button variant="outlined" onClick={deleteColumn}>
                        Column löschen
                    </Button>

                    <Button variant="text" onClick={handleClose}>
                        Abbrechen
                    </Button>
                </CustomModalActions>
            </div>
        </CustomModal>
    );
};

export default DeleteColumnModal;
