import styles from './EditColumnItemDate.module.css';
import { Item } from 'src/models/Item';
import { Label } from '../ui/Label/Label';
import { useCallback } from 'react';
import { database } from 'src/database';
import ReactDatePicker from 'react-datepicker';

export const EditColumnItemDate = ({ columnItem }: { columnItem: Item }) => {
    const { startDate, endDate } = columnItem;

    const persistStartDate = useCallback(
        (date) => {
            database.items.where('id').equals(columnItem.id!).modify({
                startDate: date,
            });
        },
        [columnItem.id]
    );

    const persistEndDate = useCallback(
        (date) => {
            database.items.where('id').equals(columnItem.id!).modify({
                endDate: date,
            });
        },
        [columnItem.id]
    );

    return (
        <div className={styles.editColumnItem__dates}>
            <div className={styles.editColumnItem__date}>
                <Label
                    className={styles.editColumnItemDate__label}
                    title="Start"
                    bold
                />

                <ReactDatePicker
                    selected={startDate}
                    onChange={persistStartDate}
                    isClearable
                />
            </div>

            <div className={styles.editColumnItem__date}>
                <Label
                    className={styles.editColumnItemDate__label}
                    title="End"
                    bold
                />

                <ReactDatePicker
                    selected={endDate}
                    onChange={persistEndDate}
                    isClearable
                />
            </div>
        </div>
    );
};

export default EditColumnItemDate;
