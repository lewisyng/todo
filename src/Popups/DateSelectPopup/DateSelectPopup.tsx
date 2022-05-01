import styles from './DateSelectPopup.module.sass';
import PopupWrapper from '../PopupWrapper/PopupWrapper';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { database } from 'src/database';
import ReactDatePicker from 'react-datepicker';

export const DateSelectPopup = ({
    handleClose,
    value,
    label,
    persistDate,
}: {
    handleClose: () => void;
    value: any;
    label: string;
    persistDate: (date: Date | null) => void;
}) => {
    return (
        <PopupWrapper title={label} handleClose={handleClose}>
            <ReactDatePicker selected={value} onChange={persistDate} />
            {/* <LocalizationProvider dateAdapter={DateAdapter}>
                <div className={styles.datePicker}>
                    <MobileDatePicker
                        inputFormat="DD/MM/YYYY"
                        value={value || new Date()}
                        onChange={persistDate}
                        renderInput={(params: any) => <TextField {...params} />}
                    />
                </div>
            </LocalizationProvider> */}
        </PopupWrapper>
    );
};

export default DateSelectPopup;
