import styles from './EditColumnItemDescription.module.css';
import { Item } from 'src/models/Item';
import { useState } from 'react';
import { database } from 'src/database';
import { Button } from '@mui/material';
import cn from 'classnames';
import { Textarea } from '../ui/Input/Textarea/Textarea';
import { TextareaWrapper } from '../ui/Input/Textarea/TextareaWrapper';

export const EditColumnItemDescription = ({
    columnItem,
}: {
    columnItem: Item;
}) => {
    const [description, setDescription] = useState(columnItem.description);
    const [descriptionFocused, setDescriptionFocused] =
        useState<boolean>(false);

    const handleDescriptionSubmit = () => {
        database.items
            .where('id')
            .equals(columnItem.id as number)
            .modify({
                description,
            });
    };

    return (
        <TextareaWrapper label="Description">
            <Textarea
                name="description"
                className={cn(
                    styles.editColumnItem__description,
                    descriptionFocused &&
                        styles.editColumnItemDescription__focused
                )}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => {
                    setDescriptionFocused(true);
                }}
                onBlur={() => {
                    setDescriptionFocused(false);
                    handleDescriptionSubmit();
                }}
                placeholder="Add a detailed description ..."
            />

            <Button
                variant="contained"
                onClick={() => handleDescriptionSubmit()}
                color="primary"
                type="submit"
            >
                Speichern
            </Button>
        </TextareaWrapper>
    );
};
