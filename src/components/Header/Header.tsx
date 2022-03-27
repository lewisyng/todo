import { FunctionComponent, useState } from 'react';
import styles from './Header.module.sass';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import CreateNewBoardModal from '../CustomModal/CreateNewBoardModal/CreateNewBoardModal';

const Header: FunctionComponent = () => {
  const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);
  return (
    <div className={styles.header}>
      <div className={styles.header__actions}>
        <CreateNewBoardModal
          open={newBoardModalOpen}
          handleClose={() => setNewBoardModalOpen(false)}
        />

        <Button
          onClick={() => setNewBoardModalOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Neues Board
        </Button>
      </div>
    </div>
  );
};

export default Header;
