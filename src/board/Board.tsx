import { FunctionComponent } from 'react';
import styles from './Board.module.sass';
import Column from '../components/Column/Column';
import CreateColumn from 'src/components/CreateColumn/CreateColumn';
import { database } from 'src/database';
import { useLiveQuery } from 'dexie-react-hooks';

const Board: FunctionComponent = () => {
  const columns = useLiveQuery(() => database.columns.toArray());

  return (
    <div className={styles.board}>
      {columns?.map((column: any) => {
        return <Column column={column} />;
      })}

      <CreateColumn />
    </div>
  );
};

export default Board;
