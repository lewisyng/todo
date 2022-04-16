import styles from './EditTagModal.module.css';
import { Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { database } from 'src/database';
import CustomModal from '../CustomModal';
import CustomModalActions from '../CustomModalParts/CustomModalActions/CustomModalActions';
import CustomModalBody from '../CustomModalParts/CustomModalBody/CustomModalBody';
import cn from 'classnames';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export const EditTagModal = ({
    id,
    open,
    handleClose,
}: {
    id: number;
    open: boolean;
    handleClose: () => void;
}) => {
    const [tag, setTag] = useState<any>(null);
    const [title, setTitle] = useState<null | string>(null);

    useEffect(() => {
        const fetchTag = async () => {
            const tag = await database.tags.where('id').equals(id).first();

            if (tag) {
                setTag(tag);
                setTitle(tag.title);
            }
        };

        fetchTag();
    }, []);

    const deleteTag = async () => {
        try {
            database.tags.delete(id);
        } catch (e) {
            console.error('Error', e);
        }

        handleClose();
    };

    const [titleFocused, setTitleFocused] = useState<boolean>(false);
    const handleTitleSubmit = () => {
        database.tags
            .where('id')
            .equals(id as number)
            .modify({
                title,
            });
    };

    if (tag) {
        return (
            <CustomModal
                open={open}
                onClose={handleClose}
                title="Edit your tag"
            >
                <CustomModalBody>
                    <input
                        type="text"
                        name="title"
                        value={title || ''}
                        onFocus={() => setTitleFocused(true)}
                        onBlur={() => {
                            setTitleFocused(false);
                            handleTitleSubmit();
                        }}
                        onChange={(e) => setTitle(e.target.value)}
                        className={cn(
                            styles.editColumnItemModalContent__title,
                            titleFocused &&
                                styles.editColumnItemModalContentTitle__focused
                        )}
                    />
                    {/* todo color icon black and display flex on container */}
                    {titleFocused && (
                        <IconButton>
                            <CheckBoxIcon />
                        </IconButton>
                    )}
                </CustomModalBody>
            </CustomModal>
        );
    }

    return null;
};

export default EditTagModal;
