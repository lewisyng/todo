import { FunctionComponent } from 'react';
import styles from './Column.module.css';
import ColumnItem from '../ColumnItem/ColumnItem';
import { ColumnType } from 'src/models/Column';
import CreateItem from '../CreateItem/CreateItem';
import { database } from 'src/database';
import { useLiveQuery } from 'dexie-react-hooks';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import { useAppSelector } from 'src/hooks/redux';

type Props = {
    boardId: number;
    column: ColumnType;
    handleColumnItemSelect: (item: any) => void;
};

const Column: FunctionComponent<Props> = ({
    boardId,
    column,
    handleColumnItemSelect,
}) => {
    const { id: columnId } = column;

    const colorScheme = useAppSelector(
        (state) => state.persistedReducer.config.colorScheme
    );

    const items = useLiveQuery(() =>
        database.items.where('columnId').equals(columnId!).toArray()
    );

    return (
        <div
            className={styles.column}
            style={{ backgroundColor: `var(--${colorScheme}-200)` }}
        >
            <ColumnHeader column={column} />

            <div className={styles.column__columnItems}>
                {items?.map((columnItem: any) => (
                    <ColumnItem
                        key={columnItem.id}
                        columnItem={columnItem}
                        handleColumnItemSelect={handleColumnItemSelect}
                    />
                ))}
            </div>

            <CreateItem boardId={boardId} columnId={columnId!} />
        </div>
    );
};

export default Column;
