import styles from './EditColumnItemDate.module.css';
import { Item } from 'src/models/Item';
import { Label } from '../ui/Label/Label';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DateSelectPopup from '../../Popups/DateSelectPopup/DateSelectPopup';
import { useCallback, useMemo, useState } from 'react';
import { database } from 'src/database';
import { useLiveQuery } from 'dexie-react-hooks';

export const EditColumnItemDate = ({ columnItem }: { columnItem: Item }) => {
    const [startDatePopupOpen, setStartDatePopupOpen] = useState(false);
    const [endDatePopupOpen, setEndDatePopupOpen] = useState(false);

    const { startDate, endDate } = columnItem;

    const persistStartDate = useCallback((date) => {
        database.items.where('id').equals(columnItem.id!).modify({
            startDate: date,
        });
    }, []);

    const persistEndDate = useCallback((date) => {
        database.items.where('id').equals(columnItem.id!).modify({
            endDate: date,
        });
    }, []);

    return (
        <div className={styles.editColumnItem__dates}>
            <div className={styles.editColumnItem__date}>
                <Label
                    className={styles.editColumnItemDate__label}
                    title="Start"
                    bold
                />

                <p>
                    {columnItem?.startDate?.$d
                        .toString()
                        .split(' ')
                        .slice(1, 4)
                        .join(' ')}
                </p>

                {!columnItem.startDate && (
                    <Button
                        className={styles.editColumnItemDate__button}
                        startIcon={<AddIcon />}
                        variant="outlined"
                        size="small"
                        onClick={() => setStartDatePopupOpen(true)}
                    >
                        Add start date
                    </Button>
                )}

                {startDatePopupOpen && (
                    <DateSelectPopup
                        label="Select a start date"
                        value={startDate}
                        handleClose={() => setStartDatePopupOpen(false)}
                        persistDate={persistStartDate}
                    />
                )}
            </div>

            <div className={styles.editColumnItem__date}>
                <Label
                    className={styles.editColumnItemDate__label}
                    title="End"
                    bold
                />

                <p>
                    {columnItem?.endDate?.$d
                        .toString()
                        .split(' ')
                        .slice(1, 4)
                        .join(' ')}
                </p>

                {!columnItem.endDate && (
                    <Button
                        className={styles.editColumnItemDate__button}
                        startIcon={<AddIcon />}
                        variant="outlined"
                        size="small"
                        onClick={() => setEndDatePopupOpen(true)}
                    >
                        Add end date
                    </Button>
                )}

                {endDatePopupOpen && (
                    <DateSelectPopup
                        value={endDate}
                        label="Select an end date"
                        persistDate={persistEndDate}
                        handleClose={() => setEndDatePopupOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default EditColumnItemDate;
