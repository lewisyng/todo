import { FunctionComponent } from 'react';
import styles from './Column.module.sass';
import ColumnItem from '../ColumnItem/ColumnItem';
import { ColumnType } from 'src/models/Column';
import CreateItem from '../CreateItem/CreateItem';
import { database } from 'src/database';
import { useLiveQuery } from 'dexie-react-hooks';
import ColumnHeader from '../ColumnHeader/ColumnHeader';

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
  const {id: columnId} = column;

  const items = useLiveQuery(() =>
    database.items.where('columnId').equals(columnId!).toArray()
  );

  console.log('Column', column);

  return (
    <div className={styles.column}>
      <ColumnHeader column={column} />

      <div className={styles.column__columnItems}>
        {items?.map((columnItem) => (
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
