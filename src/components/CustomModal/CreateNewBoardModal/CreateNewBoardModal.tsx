import { FormEvent, useState } from 'react';
import styles from './CreateNewBoardModal.module.sass';
import CustomModal from '../CustomModal';
import CustomModalBody from '../CustomModalParts/CustomModalBody/CustomModalBody';
import CustomModalActions from '../CustomModalParts/CustomModalActions/CustomModalActions';
import { database } from 'src/database';
import Input from '../../ui/Input/Input';
import { Button } from '@mui/material';

export const CreateNewBoardModal = ({
    open,
    handleClose,
    className,
}: {
    open: boolean;
    handleClose: () => void;
    className?: string;
}) => {
    const [name, setName] = useState<string>('');

    const createBoard = (e: FormEvent) => {
        e.preventDefault();

        database.boards.add({
            title: name,
        });

        setName('');
        handleClose();
    };

    return (
        <CustomModal
            open={open}
            onClose={handleClose}
            title="Name your new board"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <CustomModalBody>
                <form onSubmit={createBoard}>
                    <Input
                        type="text"
                        label="Neues Board"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        autoFocus
                    />
                </form>
            </CustomModalBody>

            <CustomModalActions>
                <Button onClick={handleClose} variant="outlined">
                    Anlegen
                </Button>

                <Button onClick={handleClose} variant="text">
                    Abbrechen
                </Button>
            </CustomModalActions>
        </CustomModal>
    );
};

export default CreateNewBoardModal;
