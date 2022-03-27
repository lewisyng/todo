import styles from './DatePopup.module.sass';
import PopupWrapper from '../PopupWrapper/PopupWrapper';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { database } from 'src/database';

export const DatePopup = ({
    columnItemId,
    handleClose,
}: {
    columnItemId: number;
    handleClose: () => void;
}) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    /**
     * get current start and end date to prefill date fields
     * set date to current date if item hasn't got date set yet
     *  */
    useEffect(() => {
        database.items
            .where('id')
            .equals(columnItemId)
            .first()
            .then((item) => {
                if (item) {
                    const { startDate, endDate } = item;

                    setStartDate(startDate?.$d || new Date());
                    setEndDate(endDate?.$d || new Date());
                }
            });
    }, []);

    /**
     * handle new Dates being selected in datepicker
     */
    const handleStartDateChange = (newValue: Date | null) => {
        setStartDate(newValue);

        database.items.where('id').equals(columnItemId).modify({
            startDate: newValue,
        });
    };

    const handleEndDateChange = (newValue: Date | null) => {
        setEndDate(newValue);

        database.items.where('id').equals(columnItemId).modify({
            endDate: newValue,
        });
    };

    return (
        <PopupWrapper title="Dates" handleClose={handleClose}>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <div className={styles.datePicker}>
                    <MobileDatePicker
                        label="Start date"
                        inputFormat="DD/MM/YYYY"
                        value={startDate}
                        onChange={handleStartDateChange}
                        renderInput={(params: any) => <TextField {...params} />}
                    />
                </div>

                <div className={styles.datePicker}>
                    <MobileDatePicker
                        label="End date"
                        inputFormat="DD/MM/YYYY"
                        value={endDate}
                        onChange={handleEndDateChange}
                        renderInput={(params: any) => <TextField {...params} />}
                    />
                </div>
            </LocalizationProvider>
        </PopupWrapper>
    );
};

export default DatePopup;
