import { useState } from 'react';
import styles from './CreateNewBoardModal.module.sass';
import { database } from 'src/database';
import Input from '../../ui/Input/Input';
import { BasicModal } from '../BasicModal/BasicModal';

export const CreateNewBoardModal = ({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: () => void;
    className?: string;
}) => {
    const [name, setName] = useState<string>('');

    const NewBoardForm = (
        <form className={styles.newBoard__form}>
            <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                autoFocus
            />
        </form>
    );

    const createBoard = () => {
        database.boards.add({
            title: name,
        });

        setName('');
        handleClose();
    };

    return (
        <BasicModal
            open={open}
            onClose={handleClose}
            header="Create Column"
            subheader="Type in a name for your new board."
            body={NewBoardForm}
            mainActionTitle="Create board"
            secondaryActionTitle="Exit"
            mainAction={createBoard}
            secondaryAction={handleClose}
        />
    );
};

export default CreateNewBoardModal;
