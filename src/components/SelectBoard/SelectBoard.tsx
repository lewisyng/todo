import { useState } from 'react';
import styles from './SelectBoard.module.css';
import { Button } from '@mui/material';
import SelectBoardModal from '../CustomModal/SelectBoardModal/SelectBoardModal';

export const SelectBoard = () => {
    const [selectBoardModalOpen, setSelectBoardModalOpen] = useState(false);

    return (
        <div className={styles.selectBoard}>
            <Button
                onClick={() => setSelectBoardModalOpen(true)}
                variant="outlined"
                sx={{ color: 'white', border: '1px solid white' }}
            >
                Boards
            </Button>

            <SelectBoardModal
                open={selectBoardModalOpen}
                handleClose={() => setSelectBoardModalOpen(false)}
            />
        </div>
    );
};

export default SelectBoard;
