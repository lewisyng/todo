import { useState } from 'react';
import styles from './ColumnHeader.module.sass';
import { ColumnType } from 'src/models/Column';
import { database } from 'src/database';
import Input from '../ui/Input/Input';
import Heading from '../ui/Heading/Heading';
import { IconButton } from '@mui/material';
import DeleteColumnModal from '../CustomModal/DeleteColumnModal/DeleteColumnModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from 'src/hooks/redux';

export const ColumnHeader = ({ column }: { column: ColumnType }) => {
    const { id: columnId, title: columnTitle } = column;
    const colorScheme = useAppSelector((state) => state.persistedReducer.config.colorScheme);

    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(columnTitle);
    const [deleteColumnModalVisible, setDeleteColumnModalVisible] =
        useState<boolean>(false);

    const changeTitle = async (e: React.FormEvent) => {
        e.preventDefault();

        if (title !== column.title) {
            await database.columns
                .where('id')
                .equals(columnId!)
                .modify((x) => (x.title = title));
        }

        setEditTitle(false);
    };

    const deleteColumn = () => {
        // delete column itself
        database.columns.where('id').equals(columnId!).delete();
        // delete all items within that column
        database.items.where('columnId').equals(columnId!).delete();
    };

    return (
        <div className={styles.columnHeader} data-color-scheme={colorScheme}>
            <div className={styles.columnHeader__title}>
                {editTitle ? (
                    <form onSubmit={changeTitle}>
                        <Input
                            type="text"
                            label="Neuer Titel"
                            value={title.toUpperCase()}
                            onChange={(e: React.FormEvent) =>
                                setTitle((e.target as HTMLInputElement).value)
                            }
                            onBlur={() => setEditTitle(false)}
                            autoFocus
                        />
                    </form>
                ) : (
                    <Heading
                        title={column.title}
                        className={styles.columnHeader__title}
                    >
                        {column.title.toUpperCase()}
                    </Heading>
                )}
            </div>

            <div>
                <IconButton
                    onClick={() => {
                        setEditTitle(true);
                    }}
                    aria-label="Edit title"
                >
                    <EditIcon />
                </IconButton>

                <IconButton onClick={() => setDeleteColumnModalVisible(true)}>
                    <DeleteIcon />
                </IconButton>
            </div>

            {deleteColumnModalVisible && (
                <DeleteColumnModal
                    open={deleteColumnModalVisible}
                    deleteColumn={deleteColumn}
                    handleClose={() => setDeleteColumnModalVisible(false)}
                />
            )}
        </div>
    );
};

export default ColumnHeader;
