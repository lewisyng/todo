import { FunctionComponent, useState } from 'react';
import styles from './Column.module.sass';
import ColumnItem from '../ColumnItem/ColumnItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Heading from '../ui/Heading/Heading';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Item } from 'src/models/Column';
import CreateItem from '../CreateItem/CreateItem';
import { database } from 'src/database';
import DeleteColumnModal from '../Modals/DeleteColumnModal';

type Props = {
  column: { id: number; title: string; items: Item[] };
};

const Column: FunctionComponent<Props> = ({ column }) => {
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(column.title);
  const [deleteColumnModalVisible, setDeleteColumnModalVisible] =
    useState<boolean>(false);

  console.log('Column', column);

  const changeTitle = (e: React.FormEvent) => {
    e.preventDefault();

    if (title !== column.title) {
      database.columns
        .where('id')
        .equals(column.id)
        .modify((x) => (x.title = title));
    }

    setEditTitle(false);
  };

  const deleteColumn = () => {
    database.columns.where('id').equals(column.id).delete();
  };

  return (
    <div className={styles.column}>
      <div className={styles.column__header}>
        <div className={styles.columnHeader__title}>
          {editTitle ? (
            <form onSubmit={changeTitle}>
              <input
                type="text"
                value={title.toUpperCase()}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setEditTitle(false)}
                autoFocus
              />
            </form>
          ) : (
            <Heading className={styles.columnHeader__title}>
              {column.title.toUpperCase()}
            </Heading>
          )}
        </div>

        <div>
          <IconButton aria-label="Edit title">
            <EditIcon
              onClick={() => {
                setEditTitle(true);
              }}
            />
          </IconButton>

          <IconButton onClick={() => setDeleteColumnModalVisible(true)}>
            <DeleteIcon />
          </IconButton>
        </div>

        {deleteColumnModalVisible && (
          <DeleteColumnModal
            open
            deleteColumn={deleteColumn}
            handleClose={() => setDeleteColumnModalVisible(false)}
          />
        )}
      </div>

      <div className={styles.column__columnItems}>
        {column.items.map((columnItem) => (
          <ColumnItem key={columnItem.id} columnItem={columnItem} />
        ))}
      </div>

      <CreateItem id={column.id} />
    </div>
  );
};

export default Column;
