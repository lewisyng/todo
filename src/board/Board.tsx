import { useState } from 'react';
import styles from './Board.module.scss';
import Column from '../components/Column/Column';
import CreateColumn from 'src/components/CreateColumn/CreateColumn';
import BoardHeader from 'src/components/BoardHeader/BoardHeader';
import EditColumnItemModal from 'src/components/CustomModal/EditColumnItemModal/EditColumnItemModal';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';
import { useAppSelector } from 'src/hooks/redux';

const Board = ({ board }: { board: any }) => {
    const { id: boardId, title } = board;

    const colorScheme = useAppSelector(
        (state) => state.persistedReducer.config.colorScheme
    );

    const [selectedColumnItem, setSelectedColumnItem] = useState<any>(null);
    const [editColumnItemModalVisible, setEditColumnItemModalVisible] =
        useState<boolean>(false);

    const columns = useLiveQuery(() =>
        database.columns.where('boardId').equals(boardId).toArray()
    );

    return (
        <div className={styles.board} style={{backgroundColor: `var(--${colorScheme}-500)`}}>
            <BoardHeader title={title} />

            <div className={styles.board__columns}>
                {columns?.map((column: any, idx: number) => {
                    return (
                        <Column
                            key={idx}
                            handleColumnItemSelect={(item) => {
                                setSelectedColumnItem(item);
                                setEditColumnItemModalVisible(true);
                            }}
                            boardId={boardId}
                            column={column}
                        />
                    );
                })}

                <CreateColumn boardId={boardId} />
            </div>

            {/* modal of the details of the clicked columnItem */}
            {selectedColumnItem && (
                <EditColumnItemModal
                    columnItem={selectedColumnItem}
                    open={editColumnItemModalVisible}
                    onClose={() => setEditColumnItemModalVisible(false)}
                />
            )}
        </div>
    );
};

export default Board;
