import styles from './EditColumnItemDate.module.css';
import { Item } from 'src/models/Item';
import { Label } from '../ui/Label/Label';

export const EditColumnItemDate = ({ columnItem }: { columnItem: Item }) => {
    return (
        <div className={styles.editColumnItem__dates}>
            <div className={styles.editColumnItem__date}>
                <Label title="Start" bold />
                {columnItem?.startDate?.$d
                    .toString()
                    .split(' ')
                    .slice(1, 4)
                    .join(' ')}
            </div>

            <div className={styles.editColumnItem__date}>
                <Label title="End" bold />
                {columnItem?.endDate?.$d
                    .toString()
                    .split(' ')
                    .slice(1, 4)
                    .join(' ')}
            </div>
        </div>
    );
};

export default EditColumnItemDate;
