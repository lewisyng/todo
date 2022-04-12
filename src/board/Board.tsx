import { useState, useEffect } from 'react';
import styles from './Board.module.scss';
import Column from '../components/Column/Column';
import CreateColumn from 'src/components/CreateColumn/CreateColumn';
import BoardHeader from 'src/components/BoardHeader/BoardHeader';
import EditColumnItemModal from 'src/components/CustomModal/EditColumnItemModal/EditColumnItemModal';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';
import { useAppSelector } from 'src/hooks/redux';
import { Board as BoardModel } from 'src/models/Board';

const Board = ({ boardId }: { boardId: any }) => {
    const [board, setBoard] = useState<BoardModel | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const board = (await database.boards
                .where('id')
                .equals(boardId)
                .first()) as BoardModel;

            if (board) {
                setBoard(board);
            }
        };

        fetchData();
    }, [boardId]);

    const colorScheme = useAppSelector(
        (state) => state.persistedReducer.config.colorScheme
    );

    const [selectedColumnItem, setSelectedColumnItem] = useState<any>(null);
    const [editColumnItemModalVisible, setEditColumnItemModalVisible] =
        useState<boolean>(false);

    const columns = useLiveQuery(
        () => database.columns.where('boardId').equals(boardId).toArray(),
        [boardId],
        []
    );

    if (board) {
        return (
            <div className={styles.board}>
                <BoardHeader title={board.title} />

                <div className={styles.board__columns}>
                    {columns?.map((column: any, idx: number) => {
                        console.log('column', column);
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
    } else {
        return <div>An error occured</div>;
    }
};

export default Board;
