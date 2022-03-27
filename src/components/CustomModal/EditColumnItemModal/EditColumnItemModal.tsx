import styles from './EditColumnItemModal.module.sass';
import CustomModal from '../CustomModal';
import EditColumnItemModalMain from './EditColumnItemModalMain/EditColumnItemModalMain';
import EditColumnItemModalSide from './EditColumnItemModalSide/EditColumnItemModalSide';
import { Item } from 'src/models/Item';

export const EditColumnItemModal = ({
    columnItem,
    open,
    onClose,
}: {
    columnItem: Item;
    open: boolean;
    onClose: () => void;
}) => {
    return (
        <CustomModal
            className={styles.editColumnItemModal}
            open={open}
            onClose={onClose}
        >
            <div className={styles.editColumnItemModal__content}>
                <EditColumnItemModalMain columnItem={columnItem} />

                <EditColumnItemModalSide columnItemId={columnItem.id!} />
            </div>
        </CustomModal>
    );
};

export default EditColumnItemModal;
