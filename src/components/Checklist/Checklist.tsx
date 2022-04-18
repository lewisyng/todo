import { useState } from 'react';
import styles from './Checklist.module.css';
import { CheckListType } from '../../models/Checklist';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ChecklistItem from '../ChecklistItem/ChecklistItem';
import { Button, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { database } from 'src/database';
import DeleteIcon from '@mui/icons-material/Delete';
import { Label } from '../ui/Label/Label';

export const Checklist = ({ checklist }: { checklist: CheckListType }) => {
    const [showNewChecklistItemInput, setShowNewChecklistItemInput] =
        useState(false);
    const [newListItem, setNewListItem] = useState('');

    const createNewListItem = (
        e: React.FormEvent,
        checklist: CheckListType
    ) => {
        e.preventDefault();

        if (newListItem !== '') {
            database.checklists
                .where('id')
                .equals(checklist.id!)
                .modify({
                    items: [
                        ...checklist.items,
                        {
                            title: newListItem,
                            description: '',
                            done: false,
                        },
                    ],
                });
        }

        setNewListItem('');
        setShowNewChecklistItemInput(false);
    };

    return (
        <div className={styles.checklist}>
            <div className={styles.checklist__header}>
                <Label
                    title={checklist.title}
                    className={styles.checklistHeader__title}
                    bold
                />

                <DeleteIcon sx={{ marginLeft: 'auto' }} />
            </div>

            <div className={styles.checklist__items}>
                {checklist.items.map((item, idx) => (
                    <ChecklistItem key={idx} item={item} />
                ))}
            </div>

            {showNewChecklistItemInput && (
                <form onSubmit={(e) => createNewListItem(e, checklist)}>
                    <TextField
                        value={newListItem}
                        onChange={(e) => setNewListItem(e.target.value)}
                    />
                </form>
            )}

            <div className={styles.checklist__newItem}>
                <Button
                    onClick={() => setShowNewChecklistItemInput(true)}
                    variant="outlined"
                >
                    Add
                </Button>
            </div>
        </div>
    );
};

export default Checklist;
