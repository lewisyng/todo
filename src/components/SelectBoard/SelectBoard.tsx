import styles from './SelectBoard.module.css';
import { Button } from '@mui/material';
import SelectBoardModal from '../CustomModal/SelectBoardModal/SelectBoardModal';
import { useModal } from 'src/hooks/useModal';

export const SelectBoard = () => {
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <div className={styles.selectBoard}>
            <Button
                    onClick={openModal}
                    variant="outlined"
                    sx={{ color: 'white', border: '1px solid white' }}
                >
                    Boards
                </Button>

                <SelectBoardModal open={isModalOpen} handleClose={closeModal} />
        </div>
    );
};

export default SelectBoard;
