import styles from './Columns.module.css';
import Column from '../Column/Column';
import EditColumnItemModal from '../CustomModal/EditColumnItemModal/EditColumnItemModal';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';

export const Columns = () => {
    const [selectedColumnItem, setSelectedColumnItem] = useState<any>(null);
    const [editColumnItemModalVisible, setEditColumnItemModalVisible] =
        useState<boolean>(false);

    const currentBoardId = useAppSelector(
        (state) => state.board.currentBoardId
    );

    const columns = useLiveQuery(
        () =>
            database.columns
                .where('boardId')
                .equals(currentBoardId as number)
                .toArray(),
        [currentBoardId!],
        []
    );

    return columns.length > 0 ? (
        <div className={styles.columns}>
            {columns.map((column: any, idx: number) => (
                <Column
                    key={idx}
                    handleColumnItemSelect={(item) => {
                        setSelectedColumnItem(item);
                        setEditColumnItemModalVisible(true);
                    }}
                    boardId={currentBoardId as number}
                    column={column}
                />
            ))}

            {/* modal of the details of the clicked columnItem */}
            {selectedColumnItem && (
                <EditColumnItemModal
                    columnItem={selectedColumnItem}
                    open={editColumnItemModalVisible}
                    onClose={() => setEditColumnItemModalVisible(false)}
                />
            )}
        </div>
    ) : null;
};
