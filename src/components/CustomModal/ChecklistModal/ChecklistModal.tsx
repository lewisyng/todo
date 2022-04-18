import { TextField } from '@mui/material';
import { useState } from 'react';
import { database } from 'src/database';
import CustomModal from '../CustomModal';
import CustomModalBody from '../CustomModalParts/CustomModalBody/CustomModalBody';

export const ChecklistModal = ({
    columnItemId,
    open,
    handleClose,
}: {
    columnItemId: number;
    open: boolean;
    handleClose: () => void;
}) => {
    const [title, setTitle] = useState('');

    const createChecklist = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            database.checklists.add({
                title,
                description: '',
                items: [],
                itemId: columnItemId,
            });
        } catch (e) {
            console.log(e);
        }

        setTitle('');
        handleClose();
    };

    return (
        <CustomModal
            title="Name your new checklist"
            open={open}
            onClose={handleClose}
        >
            <CustomModalBody>
                <form onSubmit={createChecklist}>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </form>
            </CustomModalBody>
        </CustomModal>
    );
};

export default ChecklistModal;
