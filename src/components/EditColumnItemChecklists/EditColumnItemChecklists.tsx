import styles from './EditColumnItemChecklists.module.css';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';
import { Item } from 'src/models/Item';
import Checklist from '../Checklist/Checklist';
import { Label } from '../ui/Label/Label';

export const EditColumnItemChecklists = ({
    columnItem,
}: {
    columnItem: Item;
}) => {
    const checklists = useLiveQuery(
        () =>
            database.checklists
                .where('itemId')
                .equals(columnItem.id!)
                .toArray(),
        [],
        []
    );

    return (
        <>
            <Label title="Checklists" />

            <div className={styles.columnItemChecklists}>
                {checklists.map((checklist, idx) => (
                    <Checklist key={idx} checklist={checklist} />
                ))}
            </div>
        </>
    );
};

export default EditColumnItemChecklists;
