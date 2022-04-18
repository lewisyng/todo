import { useState } from 'react';
import styles from './EditColumnItemTitle.module.css';
import cn from 'classnames';
import { database } from 'src/database';
import { Item } from 'src/models/Item';

export const EditColumnItemTitle = ({ columnItem }: { columnItem: Item }) => {
    const { id: columnItemId, title: columnItemTitle } = columnItem;

    const [title, setTitle] = useState(columnItemTitle);
    const [titleFocused, setTitleFocused] = useState(false);

    const handleFocus = () => {
        setTitleFocused(true);
    };

    const handleBlur = () => {
        setTitleFocused(false);
        handleTitleSubmit();
    };

    const handleTitleSubmit = () => {
        database.items.where('id').equals(columnItemId!).modify({
            title,
        });
    };

    return (
        <input
            type="text"
            name="title"
            value={title}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setTitle(e.target.value)}
            className={cn(
                styles.editColumnItem__title,
                titleFocused && styles.editColumnItemTitle__focused
            )}
        />
    );
};
