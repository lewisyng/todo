import { useState } from 'react';
import styles from './CreateNewBoard.module.css';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import CreateNewBoardModal from '../CustomModal/CreateNewBoardModal/CreateNewBoardModal';

export const CreateNewBoard = () => {
    const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);

    return (
        <div className={styles.createNewBoard}>
            <Button
                onClick={() => setNewBoardModalOpen(true)}
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{color: "white", border: "1px solid white"}}
            >
                New Board
            </Button>

            <CreateNewBoardModal
                open={newBoardModalOpen}
                handleClose={() => setNewBoardModalOpen(false)}
            />
        </div>
    );
};

export default CreateNewBoard;
