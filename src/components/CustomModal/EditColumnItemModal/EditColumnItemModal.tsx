import styles from './EditColumnItemModal.module.sass';
import CustomModal from '../CustomModal';
import EditColumnItemModalMain from './EditColumnItemModalMain/EditColumnItemModalMain';
import EditColumnItemModalSide from './EditColumnItemModalSide/EditColumnItemModalSide';
import { Item } from 'src/models/Item';
import { database } from 'src/database';
import { useLiveQuery } from 'dexie-react-hooks';

export const EditColumnItemModal = ({
    columnItem,
    open,
    onClose,
}: {
    columnItem: Item;
    open: boolean;
    onClose: () => void;
}) => {
    const liveColumnItem = useLiveQuery(() =>
        database.items
            .where('id')
            .equals(columnItem.id as number)
            .first()
    );

    return (
        <CustomModal
            className={styles.editColumnItemModal}
            open={open}
            onClose={onClose}
        >
            <div className={styles.editColumnItemModal__content}>
                <EditColumnItemModalMain
                    columnItem={liveColumnItem || columnItem}
                />

                <EditColumnItemModalSide columnItemId={columnItem.id!} />
            </div>
        </CustomModal>
    );
};

export default EditColumnItemModal;
