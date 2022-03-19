import styles from './EditColumnItemModalMain.module.sass';
import { Button } from '@mui/material';
import { database } from 'src/database';
import { Item } from 'src/models/Item';
import { useState } from 'react';
import cn from 'classnames';
import { Label } from 'src/components/ui/Label/Label';
import { useLiveQuery } from 'dexie-react-hooks';

export const EditColumnItemModalMain = ({
    columnItem,
}: {
    columnItem: Item;
}) => {
    const { title: columnItemTitle, description: columnItemDescription } =
        columnItem;

    const currentItem = useLiveQuery(() => database.items.get(columnItem.id!));
    const tags = useLiveQuery(() => database.tags.toArray());

    const [title, setTitle] = useState(columnItemTitle);
    const [titleFocused, setTitleFocused] = useState<boolean>(false);

    const [description, setDescription] = useState(columnItemDescription);
    const [descriptionFocused, setDescriptionFocused] =
        useState<boolean>(false);

    const handleTitleSubmit = () => {
        database.items
            .where('id')
            .equals(columnItem.id as number)
            .modify({
                title,
            });
    };

    const handleDescriptionSubmit = () => {
        database.items
            .where('id')
            .equals(columnItem.id as number)
            .modify({
                description,
            });
    };

    return (
        <div className={styles.editColumnItemModalContent__main}>
            {/* TITLE */}
            <Label htmlFor="title" title="Titel" />

            <input
                type="text"
                name="title"
                value={title}
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

            {/* TAGS */}
            <Label title="Tags" />
            <div className={styles.editColumnItemModalContent__tags}>
                {currentItem &&
                    currentItem.tags.map((tag) => {
                        const tagRef = tags?.find((t) => t.id === tag);

                        return (
                            <div
                                className={
                                    styles.editColumnItemModalContent__tag
                                }
                                style={{ background: tagRef?.color }}
                            >
                                {tagRef?.title}
                            </div>
                        );
                    })}
            </div>

            {/* DESCRIPTION */}
            <Label htmlFor="description" title="Beschreibung" />

            <textarea
                name="description"
                rows={10}
                className={cn(
                    styles.editColumnItemModalContent__description,
                    descriptionFocused &&
                        styles.editColumnItemModalContentDescription__focused
                )}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => {
                    setDescriptionFocused(true);
                    handleDescriptionSubmit();
                }}
                onBlur={() => setDescriptionFocused(false)}
                placeholder="Detaillierte Beschreibung hinzufügen ..."
            />

            <Button variant="contained" color="primary" type="submit">
                Speichern
            </Button>
        </div>
    );
};

export default EditColumnItemModalMain;
