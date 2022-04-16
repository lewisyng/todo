import { Button } from '@mui/material';
import styles from './CreateTagModal.module.css';
import cn from 'classnames';
import { FormEvent, useState } from 'react';
import { Label } from 'src/components/ui/Label/Label';
import { database } from 'src/database';
import CustomModal from '../CustomModal';
import CustomModalActions from '../CustomModalParts/CustomModalActions/CustomModalActions';

export const CreateTagModal = ({open,handleClose}: {
    open: boolean;
    handleClose: () => void;
}) => {
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#000');

    const addTag = (e: FormEvent) => {
        e.preventDefault();

        database.tags.add({
            title,
            color,
        });

        setTitle('');
        setColor('#000');
    };

    return (
        <CustomModal open={open} onClose={handleClose} title="Create a tag">
            <form onSubmit={addTag}>
                <Label
                    className={cn(styles.manageTagsModal__formField)}
                    htmlFor="title"
                    title="Title"
                >
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Label>

                <Label
                    className={cn(styles.manageTagsModal__formField)}
                    htmlFor="color"
                    title="Select a color"
                >
                    <input
                        type="color"
                        name="color"
                        id="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </Label>

                <CustomModalActions>
                    <Button type="submit" variant="outlined">
                        Create Tag
                    </Button>
                </CustomModalActions>
            </form>
        </CustomModal>
    );
};

export default CreateTagModal;