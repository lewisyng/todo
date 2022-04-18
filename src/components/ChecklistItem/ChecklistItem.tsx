import styles from './ChecklistItem.module.css';
import { ChecklistItemType } from 'src/models/ChecklistItem';
import Delete from '@mui/icons-material/Delete';
import { database } from 'src/database';
import cn from 'classnames';
import { CheckBox } from '@mui/icons-material';

export const ChecklistItem = ({ item }: { item: ChecklistItemType }) => {
    const deleteItem = () => {
        database.checklistItems.delete(item.id!);
    };

    const markDone = () => {
        database.checklistItems.where('id').equals(item.id!).modify({
            done: true,
        });
    };

    return (
        <div className={styles.checklistItem}>
            <div
                className={cn(
                    styles.checklistItem__title,
                    item.done && styles.checklistItemTitle__done
                )}
            >
                {item.title}
            </div>

            <div className={styles.checklistItem__actions}>
                {!item.done && <CheckBox onClick={markDone} />}
                
                <Delete onClick={deleteItem} />
            </div>
        </div>
    );
};

export default ChecklistItem;
