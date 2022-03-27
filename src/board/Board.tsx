import styles from './Board.module.sass';
import Column from '../components/Column/Column';
import CreateColumn from 'src/components/CreateColumn/CreateColumn';
import BoardHeader from 'src/components/BoardHeader/BoardHeader';
import { useState } from 'react';
import EditColumnItemModal from 'src/components/CustomModal/EditColumnItemModal/EditColumnItemModal';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';

const Board = ({ board }: { board: any }) => {
    const { id: boardId, title } = board;

    const [selectedColumnItem, setSelectedColumnItem] = useState<any>(null);
    const [editColumnItemModalVisible, setEditColumnItemModalVisible] =
        useState<boolean>(false);

    const columns = useLiveQuery(() =>
        database.columns.where('boardId').equals(boardId).toArray()
    );

    return (
        <div className={styles.board}>
            <BoardHeader title={title} />

            <div className={styles.board__columns}>
                {columns?.map((column: any, idx) => {
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
